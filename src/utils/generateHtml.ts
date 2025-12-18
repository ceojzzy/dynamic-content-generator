import { ScholarshipData } from '@/types/scholarship';

export function generateHtml(data: ScholarshipData): string {
  const coverageListHtml = data.coverage.items
    .map(item => `
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span><strong>${item.title}</strong> - ${item.description}</span>
                        </li>`)
    .join('\n');

  const studyAreasHtml = data.studyAreas
    .map(area => `
                        <div class="study-area-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                            </svg>
                            <span>${area}</span>
                        </div>`)
    .join('\n');

  const requiredDocumentsHtml = data.requiredDocuments
    .map(doc => `
                        <div class="study-area-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                            </svg>
                            <span>${doc}</span>
                        </div>`)
    .join('\n');

  const eligibilityHtml = data.eligibility
    .map(criteria => `
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"/>
                                <path d="m12 5 7 7-7 7"/>
                            </svg>
                            <span>${criteria}</span>
                        </li>`)
    .join('\n');

  const timelineHtml = data.timeline
    .map(item => `
                            <tr>
                                <td>${item.stage}</td>
                                <td>${item.date}</td>
                            </tr>`)
    .join('\n');

  const processHtml = data.applicationProcess
    .map((step, index) => `
                        <li class="numbered-step">
                            <span class="step-number">${index + 1}</span>
                            <span class="step-content">${step}</span>
                        </li>`)
    .join('\n');

  const tipsHtml = data.tips
    .map(tip => `
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span>${tip}</span>
                            </li>`)
    .join('\n');

  const advantagesHtml = data.advantages
    .map(adv => `
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span><strong>${adv.title}</strong> - ${adv.description}</span>
                        </li>`)
    .join('\n');

  const faqHtml = data.faq
    .map(item => `
                        <div class="faq-item">
                            <button class="faq-question" onclick="toggleFaq(this)">
                                <span>${item.question}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                            <div class="faq-answer">
                                ${item.answer}
                            </div>
                        </div>`)
    .join('\n');

  const aboutParagraphsHtml = data.about.paragraphs
    .map(p => `                    <p>${p}</p>`)
    .join('\n');

  const finalConsiderationsHtml = data.finalConsiderations
    .map(p => `                    <p>${p}</p>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO -->
    <title>${data.seo.title}</title>
    <meta name="description" content="${data.seo.description}">
    <meta name="keywords" content="${data.seo.keywords}">
    <link rel="canonical" href="${data.seo.canonicalUrl}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${data.seo.ogTitle}">
    <meta property="og:description" content="${data.seo.ogDescription}">
    <meta property="og:image" content="${data.seo.ogImage}">
    <meta property="og:url" content="${data.seo.ogUrl}">
    <meta property="og:site_name" content="AngoScholar">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.seo.twitterTitle}">
    <meta name="twitter:description" content="${data.seo.twitterDescription}">
    <meta name="twitter:image" content="${data.seo.twitterImage}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Shared Styles -->
    <link rel="stylesheet" href="/styles/main.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-inner">
                <a href="/" class="logo">
                    <img src="/images/logo-angoscolar.webp" alt="AngoScholar - Bolsas de Estudo para Angolanos" class="logo-img">
                </a>
                
                <nav class="nav">
                    <a href="/" class="nav-link" data-translate="nav.home">Início</a>
                    <a href="/bolsas.html" class="nav-link active" data-translate="nav.scholarships">Bolsas</a>
                    <a href="/paises.html" class="nav-link" data-translate="nav.countries">Países</a>
                    <a href="/blog.html" class="nav-link" data-translate="nav.blog">Blog</a>
                    <a href="/guias.html" class="nav-link" data-translate="nav.guides">Guias</a>
                    <a href="/faq.html" class="nav-link" data-translate="nav.faq">FAQ</a>
                </nav>
                
                <div class="header-actions">
                    <div class="lang-switcher">
                        <button class="lang-btn" onclick="toggleLangMenu()" aria-label="Change language">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m5 8 6 6"/>
                                <path d="m4 14 6-6 2-3"/>
                                <path d="M2 5h12"/>
                                <path d="M7 2h1"/>
                                <path d="m22 22-5-10-5 10"/>
                                <path d="M14 18h6"/>
                            </svg>
                            <span class="lang-badge" id="currentLang">PT</span>
                        </button>
                        <div class="lang-dropdown" id="langDropdown">
                            <button class="lang-option" onclick="setLanguage('pt')">
                                <img src="/flags/pt.svg" alt="Português" class="lang-flag">
                                Português
                            </button>
                            <button class="lang-option" onclick="setLanguage('en')">
                                <img src="/flags/gb.svg" alt="English" class="lang-flag">
                                English
                            </button>
                        </div>
                    </div>
                    <a href="/auth.html" class="btn btn-outline btn-sm" data-translate="login">Entrar</a>
                </div>
                
                <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12"/>
                        <line x1="4" x2="20" y1="6" y2="6"/>
                        <line x1="4" x2="20" y1="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <nav class="mobile-nav" id="mobileNav">
                <a href="/" class="mobile-nav-link" data-translate="nav.home">Início</a>
                <a href="/bolsas.html" class="mobile-nav-link" data-translate="nav.scholarships">Bolsas</a>
                <a href="/paises.html" class="mobile-nav-link" data-translate="nav.countries">Países</a>
                <a href="/blog.html" class="mobile-nav-link" data-translate="nav.blog">Blog</a>
                <a href="/guias.html" class="mobile-nav-link" data-translate="nav.guides">Guias</a>
                <a href="/faq.html" class="mobile-nav-link" data-translate="nav.faq">FAQ</a>
                <div style="padding: 1rem; border-top: 1px solid hsl(var(--border)); margin-top: 1rem;">
                    <a href="/auth.html" class="btn btn-outline" style="width: 100%;" data-translate="login">Entrar</a>
                </div>
            </nav>
        </div>
    </header>

    <!-- Hero -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-badge">
                    <img src="${data.quickInfo.countryFlag}" alt="${data.quickInfo.country}" style="width: 20px; height: 15px; border-radius: 2px;">
                    <span>${data.hero.badge}</span>
                </div>
                <h1>${data.hero.title}</h1>
                <p>${data.hero.description}</p>
            </div>
        </div>
    </section>

    <!-- Main Content -->
    <main class="main-content">
        <div class="container">
            <div class="content-grid">
                <!-- Article -->
                <article class="article">
                    <img 
                        src="${data.hero.thumbnailUrl}" 
                        alt="${data.hero.thumbnailAlt}" 
                        class="article-thumbnail"
                    >
                    
                    <!-- Sobre a Bolsa -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 16v-4"/>
                            <path d="M12 8h.01"/>
                        </svg>
                        <span data-translate="section.about">Sobre a Bolsa</span>
                    </h2>
                    
                    <!-- Quick Info -->
                    <div class="sidebar-card" style="margin-bottom: 2rem;">
                        <div class="quick-info" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                            <div class="info-item">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <div class="info-label" data-translate="info.country">País</div>
                                    <div class="info-value">${data.quickInfo.country}</div>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <div class="info-label" data-translate="info.level">Nível</div>
                                    <div class="info-value">${data.quickInfo.level}</div>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2"/>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <div class="info-label" data-translate="info.deadline">Prazo</div>
                                    <div class="info-value">${data.quickInfo.deadline}</div>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <div class="info-label" data-translate="info.funding">Financiamento</div>
                                    <div class="info-value">${data.quickInfo.funding}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
${aboutParagraphsHtml}

                    <!-- Instituição Anfitriã -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                            <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
                            <path d="M10 6h4"/>
                            <path d="M10 10h4"/>
                            <path d="M10 14h4"/>
                            <path d="M10 18h4"/>
                        </svg>
                        <span data-translate="section.host">Instituição Anfitriã</span>
                    </h2>
                    <p>${data.hostInstitution.description}</p>

                    <!-- Países Elegíveis -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                            <path d="M2 12h20"/>
                        </svg>
                        <span data-translate="section.countries">Países Elegíveis</span>
                    </h2>
                    <p>${data.eligibleCountries.description}</p>
                    
                    <!-- O Que a Bolsa Cobre -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        O Que a Bolsa Cobre
                    </h2>
                    <ul class="coverage-list">
${coverageListHtml}
                    </ul>

                    <!-- Áreas e Cursos de Estudos -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                        </svg>
                        Áreas e Cursos de Estudos
                    </h2>
                    <div class="study-areas">
${studyAreasHtml}
                    </div>

                    <!-- Critérios de Elegibilidade -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        Critérios de Elegibilidade
                    </h2>
                    <ul class="requirements-list">
${eligibilityHtml}
                    </ul>

                    <!-- Documentos Necessários -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                        </svg>
                        Documentos Necessários
                    </h2>
                    <div class="study-areas">
${requiredDocumentsHtml}
                    </div>

                    <!-- Cronograma Completo -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        Cronograma Completo
                    </h2>
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th>Etapa</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
${timelineHtml}
                        </tbody>
                    </table>

                    <!-- Processo de Candidatura -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" x2="8" y1="13" y2="13"/>
                            <line x1="16" x2="8" y1="17" y2="17"/>
                            <line x1="10" x2="8" y1="9" y2="9"/>
                        </svg>
                        Processo de Candidatura
                    </h2>
                    <ol class="numbered-steps">
${processHtml}
                    </ol>

                    <!-- Dicas Tip Box -->
                    <div class="tip-box">
                        <div class="tip-box-header">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                                <path d="M9 18h6"/>
                                <path d="M10 22h4"/>
                            </svg>
                            Dicas para uma Candidatura Forte
                        </div>
                        <ul class="tip-list">
${tipsHtml}
                        </ul>
                    </div>

                    <!-- Vantagens do Programa -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        Vantagens do Programa
                    </h2>
                    <ul class="coverage-list">
${advantagesHtml}
                    </ul>

                    <!-- FAQ -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <path d="M12 17h.01"/>
                        </svg>
                        Perguntas Frequentes
                    </h2>
                    <div class="faq-list">
${faqHtml}
                    </div>

                    <!-- Considerações Finais -->
                    <h2 class="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                            <path d="m9 12 2 2 4-4"/>
                        </svg>
                        Considerações Finais
                    </h2>
${finalConsiderationsHtml}

                    <!-- CTA Box -->
                    <div class="cta-box">
                        <h3>${data.cta.title}</h3>
                        <p>${data.cta.description}</p>
                        <div class="cta-buttons">
                            <a href="${data.cta.applyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15 3 21 3 21 9"/>
                                    <line x1="10" x2="21" y1="14" y2="3"/>
                                </svg>
                                ${data.cta.applyText}
                            </a>
                            <a href="${data.cta.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                                </svg>
                                ${data.cta.whatsappText}
                            </a>
                        </div>
                        <a href="/bolsas.html" style="display: inline-block; margin-top: 1rem; color: hsl(var(--muted-foreground)); font-weight: 500;">Ver Outras Bolsas</a>
                    </div>
                </article>

                <!-- Sidebar -->
                <aside class="sidebar">
                    <!-- Related Scholarships -->
                    <div class="sidebar-card">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                            </svg>
                            Bolsas Relacionadas
                        </h3>
                        <div class="related-list">
                            <a href="/bolsas/commonwealth.html" class="related-item">
                                <img src="/images/og-commonwealth.jpg" alt="Commonwealth" class="related-thumb">
                                <div class="related-info">
                                    <div class="related-title">Commonwealth Scholarship</div>
                                    <div class="related-country">Reino Unido</div>
                                </div>
                            </a>
                            <a href="/bolsas/gates-cambridge.html" class="related-item">
                                <img src="/images/og-gates.jpg" alt="Gates Cambridge" class="related-thumb">
                                <div class="related-info">
                                    <div class="related-title">Gates Cambridge</div>
                                    <div class="related-country">Reino Unido</div>
                                </div>
                            </a>
                            <a href="/bolsas/fulbright.html" class="related-item">
                                <img src="/images/og-fulbright.jpg" alt="Fulbright" class="related-thumb">
                                <div class="related-info">
                                    <div class="related-title">Fulbright</div>
                                    <div class="related-country">Estados Unidos</div>
                                </div>
                            </a>
                            <a href="/bolsas/erasmus-mundus.html" class="related-item">
                                <img src="/images/og-erasmus.jpg" alt="Erasmus Mundus" class="related-thumb">
                                <div class="related-info">
                                    <div class="related-title">Erasmus Mundus</div>
                                    <div class="related-country">Europa</div>
                                </div>
                            </a>
                        </div>
                    </div>
                    
                    <!-- CTA Button -->
                    <a href="${data.cta.applyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" x2="21" y1="14" y2="3"/>
                        </svg>
                        ${data.cta.applyText}
                    </a>
                </aside>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-main">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="/" class="footer-logo">
                            <div class="footer-logo-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                </svg>
                            </div>
                            <span class="footer-logo-text">Ango<span>Scholar</span></span>
                        </a>
                        <p class="footer-desc">A maior plataforma de bolsas de estudo para estudantes angolanos. Realizamos sonhos académicos.</p>
                        <div class="footer-contact">
                            <div class="footer-contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                </svg>
                                info@angoscholar.com
                            </div>
                            <div class="footer-contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                Luanda, Angola
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Bolsas</h4>
                        <ul class="footer-links">
                            <li><a href="/bolsas/chevening.html">Chevening</a></li>
                            <li><a href="/bolsas/commonwealth.html">Commonwealth</a></li>
                            <li><a href="/bolsas/fulbright.html">Fulbright</a></li>
                            <li><a href="/bolsas/erasmus-mundus.html">Erasmus Mundus</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Destinos</h4>
                        <ul class="footer-links">
                            <li><a href="/paises.html?country=gb">Reino Unido</a></li>
                            <li><a href="/paises.html?country=us">Estados Unidos</a></li>
                            <li><a href="/paises.html?country=de">Alemanha</a></li>
                            <li><a href="/paises.html?country=pt">Portugal</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Recursos</h4>
                        <ul class="footer-links">
                            <li><a href="/blog.html">Blog</a></li>
                            <li><a href="/guias.html">Guias</a></li>
                            <li><a href="/dicas.html">Dicas</a></li>
                            <li><a href="/faq.html">FAQ</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Empresa</h4>
                        <ul class="footer-links">
                            <li><a href="/sobre.html">Sobre Nós</a></li>
                            <li><a href="/contacto.html">Contacto</a></li>
                            <li><a href="/privacidade.html">Privacidade</a></li>
                            <li><a href="/termos.html">Termos</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="container">
                <div class="footer-bottom-inner">
                    <p class="footer-copyright">© 2024 AngoScholar. Todos os direitos reservados.</p>
                    <div class="footer-social">
                        <a href="https://facebook.com/angoscholar" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                            </svg>
                        </a>
                        <a href="https://instagram.com/angoscholar" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                            </svg>
                        </a>
                        <a href="https://linkedin.com/company/angoscholar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                <rect width="4" height="12" x="2" y="9"/>
                                <circle cx="4" cy="4" r="2"/>
                            </svg>
                        </a>
                        <a href="https://twitter.com/angoscholar" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // Mobile menu toggle
        function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.classList.toggle('open');
        }
        
        // FAQ toggle
        function toggleFaq(button) {
            const faqItem = button.closest('.faq-item');
            faqItem.classList.toggle('open');
        }

        // Language switcher
        function toggleLangMenu() {
            const dropdown = document.getElementById('langDropdown');
            dropdown.classList.toggle('open');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const langSwitcher = document.querySelector('.lang-switcher');
            if (langSwitcher && !langSwitcher.contains(e.target)) {
                document.getElementById('langDropdown').classList.remove('open');
            }
        });
    </script>
</body>
</html>`;
}
