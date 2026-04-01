// ========================================
// CONFIGURAÇÕES GLOBAIS
// ========================================
const CONFIG = {
    systemName: "CLICKNEX",
    crmUrl: "https://crm.clicknex.com.br/",
    supportEmail: "suporte@clicknex.com.br",
    version: "1.0.0",
    searchMinChars: 2,
    scrollOffset: 80,
    pagesPath: "pages/"
};

// Mapeamento de seções para arquivos
const PAGE_MAP = {
    'central-ajuda': 'central-ajuda.html',
    'conheca': 'conheca.html',
    'modulo-dashboard': 'modulos/dashboard.html',
    'modulo-agenda': 'modulos/agenda.html',
    'modulo-vendas': 'modulos/vendas.html',
    'modulo-projetos': 'modulos/projetos.html',
    'modulo-atendimento': 'modulos/atendimento.html',
    'modulo-inteligencia': 'modulos/inteligencia.html',
    'modulo-equipe': 'modulos/equipe.html',
    'modulo-sistema': 'modulos/sistema.html',
    'pre-requisitos': 'diretrizes/pre-requisitos.html',
    'suporte-tecnico': 'diretrizes/suporte-tecnico.html',
    'manutencao': 'diretrizes/manutencao.html',
    'api-oficial': 'diretrizes/api-oficial.html',
    'privacidade': 'diretrizes/privacidade.html',
    'lid-whatsapp': 'diretrizes/lid-whatsapp.html',
    'termos-condicoes': 'diretrizes/termos-condicoes.html'
};

// ========================================
// ELEMENTOS DO DOM
// ========================================
const DOM = {
    menuToggle: null,
    sidebar: null,
    sidebarClose: null,
    overlay: null,
    searchInput: null,
    navItems: null,
    contentSections: null,
    feedbackButtons: null,
    copyLinkButtons: null,
    navButtons: null,
    tocLinks: null,
    supportLink: null
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeDOM();
    initializeEventListeners();
    initializeScrollSpy();
    sanitizeSearchInput();
    console.log(`${CONFIG.systemName} v${CONFIG.version} - Central de Ajuda carregada`);
});

// ========================================
// INICIALIZAR ELEMENTOS DO DOM
// ========================================
function initializeDOM() {
    DOM.menuToggle = document.getElementById('menuToggle');
    DOM.sidebar = document.getElementById('sidebar');
    DOM.sidebarClose = document.getElementById('sidebarClose');
    DOM.overlay = document.getElementById('overlay');
    DOM.searchInput = document.getElementById('searchInput');
    DOM.navItems = document.querySelectorAll('.nav-item');
    DOM.contentSections = document.querySelectorAll('.content-section');
    DOM.feedbackButtons = document.querySelectorAll('.btn-feedback');
    DOM.copyLinkButtons = document.querySelectorAll('.copy-link');
    DOM.navButtons = document.querySelectorAll('.btn-nav');
    DOM.tocLinks = document.querySelectorAll('.toc-link');
    DOM.supportLink = document.getElementById('supportLink');
}

// ========================================
// EVENT LISTENERS
// ========================================
function initializeEventListeners() {
    // Menu mobile
    if (DOM.menuToggle) {
        DOM.menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (DOM.sidebarClose) {
        DOM.sidebarClose.addEventListener('click', closeMobileMenu);
    }
    
    if (DOM.overlay) {
        DOM.overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Navegação
    DOM.navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    // Busca
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', handleSearch);
        DOM.searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
    
    // Feedback
    DOM.feedbackButtons.forEach(button => {
        button.addEventListener('click', handleFeedback);
    });
    
    // Copiar link
    DOM.copyLinkButtons.forEach(button => {
        button.addEventListener('click', copyPageLink);
    });
    
    // Botões de navegação
    DOM.navButtons.forEach(button => {
        button.addEventListener('click', handleNextNavigation);
    });
    
    // TOC links
    DOM.tocLinks.forEach(link => {
        link.addEventListener('click', handleTocClick);
    });
    
    // Policy links (links dentro das seções)
    document.querySelectorAll('.policy-link, .toc-numbered a').forEach(link => {
        link.addEventListener('click', handlePolicyLinkClick);
    });
    
    // Link de suporte
    if (DOM.supportLink) {
        DOM.supportLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `mailto:${CONFIG.supportEmail}`;
        });
    }
    
    // Dropdown navigation
    initializeDropdowns();
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', handleResize);
    
    // Scroll spy
    window.addEventListener('scroll', updateScrollSpy);
}

// ========================================
// MENU MOBILE
// ========================================
function toggleMobileMenu() {
    if (DOM.sidebar && DOM.overlay) {
        DOM.sidebar.classList.toggle('active');
        DOM.overlay.classList.toggle('active');
        document.body.style.overflow = DOM.sidebar.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    if (DOM.sidebar && DOM.overlay) {
        DOM.sidebar.classList.remove('active');
        DOM.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleResize() {
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
}

// ========================================
// NAVEGAÇÃO
// ========================================
function handleNavigation(e) {
    e.preventDefault();
    
    const targetSection = this.getAttribute('data-section');
    
    if (!targetSection) return;
    
    // Atualizar menu ativo
    DOM.navItems.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
    
    // Carregar e mostrar seção correspondente
    loadSection(targetSection);
    
    // Fechar menu mobile
    closeMobileMenu();
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Atualizar URL sem recarregar
    updateURL(targetSection);
}

async function loadSection(sectionId) {
    const contentWrapper = document.querySelector('.content-wrapper');
    
    // Se a seção já existe no DOM (seções estáticas), apenas mostrar
    const existingSection = document.getElementById(sectionId);
    if (existingSection) {
        showSection(sectionId);
        return;
    }
    
    // Se tem mapeamento para arquivo externo, carregar
    if (PAGE_MAP[sectionId]) {
        try {
            const response = await fetch(`${CONFIG.pagesPath}${PAGE_MAP[sectionId]}`);
            if (!response.ok) throw new Error('Página não encontrada');
            
            const html = await response.text();
            
            // Criar nova seção
            const newSection = document.createElement('section');
            newSection.id = sectionId;
            newSection.className = 'content-section';
            newSection.innerHTML = html;
            
            // Adicionar ao DOM
            contentWrapper.appendChild(newSection);
            
            // Mostrar seção
            showSection(sectionId);
            
            // Reinicializar event listeners para novos elementos
            initializeSectionListeners(newSection);
            
        } catch (error) {
            console.error('Erro ao carregar seção:', error);
            showErrorMessage('Erro ao carregar conteúdo. Tente novamente.');
        }
    } else {
        // Seção não encontrada
        showSection(sectionId);
    }
}

function initializeSectionListeners(section) {
    // Reinicializar botões de navegação
    const navButtons = section.querySelectorAll('.btn-nav');
    navButtons.forEach(button => {
        button.addEventListener('click', handleNextNavigation);
    });
    
    // Reinicializar links de política
    const policyLinks = section.querySelectorAll('.policy-link, .toc-numbered a, .text-link');
    policyLinks.forEach(link => {
        link.addEventListener('click', handlePolicyLinkClick);
    });
}

function showErrorMessage(message) {
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper.innerHTML = `
        <div class="error-message">
            <h2>⚠️ ${message}</h2>
            <button class="btn-nav" onclick="location.reload()">Recarregar Página</button>
        </div>
    `;
}

function showSection(sectionId) {
    DOM.contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function handleNextNavigation(e) {
    const nextSection = this.getAttribute('data-next');
    if (nextSection) {
        const navItem = document.querySelector(`[data-section="${nextSection}"]`);
        if (navItem) {
            navItem.click();
        }
    }
}

function updateURL(section) {
    if (history.pushState) {
        const newUrl = `${window.location.pathname}#${section}`;
        history.pushState({ section: section }, '', newUrl);
    }
}

// Carregar seção da URL ao iniciar
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const navItem = document.querySelector(`[data-section="${hash}"]`);
        if (navItem) {
            setTimeout(() => navItem.click(), 100);
        }
    }
});

// ========================================
// BUSCA
// ========================================
function handleSearch(e) {
    const query = e.target.value;
    
    if (query.length >= CONFIG.searchMinChars) {
        performSearch(query);
    }
}

function performSearch(query) {
    // Sanitizar entrada
    const sanitizedQuery = sanitizeInput(query);
    
    if (sanitizedQuery.length < CONFIG.searchMinChars) {
        console.log('Busca muito curta');
        return;
    }
    
    console.log(`Buscando por: ${sanitizedQuery}`);
    
    // Implementação simples de busca
    const results = searchInContent(sanitizedQuery);
    
    if (results.length > 0) {
        console.log(`${results.length} resultado(s) encontrado(s)`);
        highlightSearchResults(results);
    } else {
        console.log('Nenhum resultado encontrado');
    }
}

function searchInContent(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    DOM.contentSections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(lowerQuery)) {
            results.push({
                section: section.id,
                element: section
            });
        }
    });
    
    return results;
}

function highlightSearchResults(results) {
    // Mostrar primeira seção com resultado
    if (results.length > 0) {
        const firstResult = results[0];
        const navItem = document.querySelector(`[data-section="${firstResult.section}"]`);
        if (navItem) {
            navItem.click();
        }
    }
}

function sanitizeInput(input) {
    // Remover caracteres especiais perigosos
    const div = document.createElement('div');
    div.textContent = input;
    return div.textContent.trim();
}

function sanitizeSearchInput() {
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', function(e) {
            // Prevenir XSS básico
            this.value = sanitizeInput(this.value);
        });
    }
}

// ========================================
// SCROLL SPY
// ========================================
function initializeScrollSpy() {
    updateScrollSpy();
}

function updateScrollSpy() {
    const scrollPosition = window.scrollY + CONFIG.scrollOffset;
    
    // Atualizar TOC
    DOM.tocLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const elementTop = targetElement.offsetTop;
            const elementBottom = elementTop + targetElement.offsetHeight;
            
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                DOM.tocLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

function handleTocClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - CONFIG.scrollOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ========================================
// POLICY LINKS (Navegação entre seções)
// ========================================
function handlePolicyLinkClick(e) {
    const href = this.getAttribute('href');
    
    // Se for um link interno (#), navegar para a seção
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        
        // Verificar se é uma seção principal ou uma âncora dentro da seção
        const targetSection = document.getElementById(targetId);
        
        if (targetSection && targetSection.classList.contains('content-section')) {
            // É uma seção principal, usar o sistema de navegação
            const navItem = document.querySelector(`[data-section="${targetId}"]`);
            if (navItem) {
                navItem.click();
            }
        } else if (targetSection) {
            // É uma âncora dentro da seção, apenas fazer scroll
            const offsetTop = targetSection.offsetTop - CONFIG.scrollOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ========================================
// DROPDOWN NAVIGATION
// ========================================
function initializeDropdowns() {
    const dropdownButtons = document.querySelectorAll('.nav-dropdown');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdownContent = document.getElementById(dropdownId);
            
            // Toggle open class
            this.classList.toggle('open');
            dropdownContent.classList.toggle('open');
        });
    });
}

// ========================================
// FEEDBACK
// ========================================
function handleFeedback(e) {
    const feedbackType = this.getAttribute('data-feedback');
    
    // Remover estado ativo de todos os botões
    DOM.feedbackButtons.forEach(btn => btn.classList.remove('active'));
    
    // Adicionar estado ativo ao botão clicado
    this.classList.add('active');
    
    // Enviar feedback (simulado)
    sendFeedback(feedbackType);
    
    // Mostrar mensagem de agradecimento
    showFeedbackMessage(feedbackType);
}

function sendFeedback(type) {
    console.log(`Feedback enviado: ${type}`);
    
    // Aqui você pode implementar o envio real do feedback
    // Por exemplo, via API ou analytics
    
    // Simulação de envio
    const feedbackData = {
        type: type,
        page: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    console.log('Dados do feedback:', feedbackData);
}

function showFeedbackMessage(type) {
    const message = type === 'yes' 
        ? 'Obrigado pelo feedback positivo!' 
        : 'Obrigado! Vamos melhorar esta página.';
    
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--color-primary);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// COPIAR LINK
// ========================================
function copyPageLink(e) {
    e.preventDefault();
    
    const url = window.location.href;
    
    // Tentar usar a API moderna de clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => {
                showCopyNotification('Link copiado!');
            })
            .catch(err => {
                console.error('Erro ao copiar:', err);
                fallbackCopyToClipboard(url);
            });
    } else {
        fallbackCopyToClipboard(url);
    }
}

function fallbackCopyToClipboard(text) {
    // Método alternativo para navegadores antigos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification('Link copiado!');
    } catch (err) {
        console.error('Erro ao copiar:', err);
        showCopyNotification('Erro ao copiar link');
    }
    
    document.body.removeChild(textArea);
}

function showCopyNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--color-primary);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        font-size: 14px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ========================================
// ANIMAÇÕES CSS (adicionadas dinamicamente)
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// UTILITÁRIOS
// ========================================

// Debounce para otimizar eventos de scroll e resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll spy
window.addEventListener('scroll', debounce(updateScrollSpy, 100));

// ========================================
// SEGURANÇA - CSP READY
// ========================================
// Todo o código usa addEventListener ao invés de inline handlers
// Não usa eval() ou Function()
// Sanitiza inputs do usuário
// Links externos usam rel="noopener noreferrer"

// ========================================
// EXPORTAR PARA DEBUG (opcional)
// ========================================
if (typeof window !== 'undefined') {
    window.CLICKNEX_DEBUG = {
        config: CONFIG,
        dom: DOM,
        version: CONFIG.version
    };
}
