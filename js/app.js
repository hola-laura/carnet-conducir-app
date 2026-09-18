// ============================================
// Carnet B - App Logic
// Simplified, Clean Design inspired by Open
// ============================================

let questionsData = [];
let currentTest = [];
let currentQuestionIndex = 0;
let testMode = 'practice';
let correctAnswers = 0;
let wrongAnswers = 0;
let userStats = {
    totalAnswered: 0,
    totalCorrect: 0,
    questionHistory: {},
    userProfile: null // { examDate, dailyMinutes }
};

let currentLang = 'es';

const FEEDBACK_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwTrNXvQdzm2I-WFr_v4aojYbk_dLbxTVfov05Vg1q5w7wgdgmn0IKGR5YhELUVu74/exec';
const FEEDBACK_TYPE_LABEL = {
    wrong_question: 'La pregunta está mal formulada',
    wrong_answer: 'La respuesta correcta es otra',
    wrong_explanation: 'La explicación es incorrecta',
    photo_evidence: 'Foto',
    suggestion: 'Sugerencia'
};

const I18N = {
    es: {
        changeLanguage: 'Cambiar idioma',
        changeTheme: 'Cambiar tema',
        homeSubtitle: 'Prácticas para el carné B',
        docTitle: 'Drivo Test — Test del carnet B (España)',
        docDescription: 'Tests gratis para el carnet B: preguntas tipo examen DGT, modo práctica y glosario visual. No afiliada a la DGT.',
        landingLead: 'Tests gratis para el carnet B y el permiso de conducir en España.',
        setupTitle: 'Personaliza tu preparación',
        setupSubtitle: 'Opcional - puedes configurarlo después',
        examDate: 'Fecha de examen',
        dailyTime: 'Tiempo diario de estudio',
        min10: '10 minutos',
        min20: '20 minutos',
        min30: '30 minutos',
        later: 'Más tarde',
        save: 'Guardar',
        sessionTitle: 'Tu sesión de hoy',
        startAdaptive: 'Empezar sesión adaptativa',
        sessionTime: '~{n} minutos',
        pendingErrors: '{n} errores pendientes de repasar',
        doubtedQs: '{n} preguntas dudadas',
        mixNew: 'Mezcla de repaso y preguntas nuevas',
        statQuestions: 'Preguntas',
        statDone: 'Hechas',
        statReview: 'A repasar',
        statAccuracy: 'Acierto',
        noReview: 'Aún no hay preguntas para repasar',
        streakUnit: 'días',
        streakUnitOne: 'día',
        levelN: 'Nivel {n}',
        examOfficial: 'Examen oficial',
        examMeta: '30 preguntas · Máx 3 fallos',
        practiceMode: 'Modo práctica',
        practiceMeta: 'Feedback al instante',
        library: 'Biblioteca',
        libraryMeta: 'Explora todas las preguntas',
        glossary: 'Glosario visual',
        glossaryMeta: 'Palabras de la vía, con fotos DGT',
        disclaimer: 'Esta app no está afiliada ni respaldada por la DGT',
        exit: 'Salir',
        errors: 'Fallos: {n}/3',
        questionN: 'Pregunta {n}',
        needsReview: 'Necesitas repasarlo',
        somethingWrong: 'Hay algo mal?',
        doubt: 'Tengo dudas',
        markedReview: 'Marcada para repasar',
        next: 'Siguiente →',
        correct: '¡Correcto!',
        incorrect: 'Incorrecto',
        correctLead: 'Has seleccionado la respuesta correcta.',
        wrongLead: 'La respuesta correcta es:',
        passed: '¡Aprobado!',
        failed: 'No Aprobado',
        passedSub: 'Has superado el examen',
        failedSub: 'Sigue practicando',
        correctLabel: 'Correctas',
        wrongLabel: 'Incorrectas',
        scoreLabel: 'Puntuación',
        retryExam: 'Repetir Examen',
        goHome: 'Volver al Inicio',
        backHome: 'Inicio',
        libraryTitle: 'Biblioteca de Preguntas',
        category: 'Categoría',
        catAll: 'Todas',
        catSignals: 'Señales',
        catPriority: 'Prioridad',
        catSpeed: 'Velocidad',
        catSafety: 'Seguridad',
        catSafetyRoad: 'Seguridad Vial',
        catDistances: 'Distancias',
        catParking: 'Estacionamiento',
        catLights: 'Alumbrado',
        catRoads: 'Vías',
        catVulnerable: 'Usuarios Vulnerables',
        catDocs: 'Documentación',
        catGeneral: 'General',
        glossarySubtitle: 'Palabras de la vía. Texto y fotos oficiales de la DGT.',
        glossaryCredit: 'Fuente: DGT. Diccionario en Lectura Fácil. Permiso B.',
        fbWrongQuestion: 'La pregunta está mal formulada',
        fbWrongAnswer: 'La respuesta correcta es otra',
        fbWrongExplanation: 'La explicación es incorrecta',
        fbPhoto: 'Adjuntar evidencia (foto)',
        fbSuggestion: 'Sugerencia general',
        cancel: 'Cancelar',
        loading: 'Cargando',
        autoTranslated: 'Traducción automática',
        photoTitle: 'Adjuntar Evidencia',
        photoSubtitle: 'Captura de pantalla del manual DGT, etc.',
        choosePhoto: '📷 Seleccionar Foto',
        send: 'Enviar',
        photoLimit: 'Límite: 5MB por foto',
        searchPlaceholder: 'Buscar',
        libraryEmpty: 'No se encontraron preguntas',
        seeMore: 'Ver más',
        showExplanation: '💡 Ver Explicación Detallada',
        hideExplanation: '🔼 Ocultar Explicación',
        whyCorrect: '¿Por qué es correcta?',
        toastProfile: '✓ Perfil guardado correctamente',
        toastReport: '✓ Reporte enviado. Gracias por ayudarnos a mejorar.',
        toastSuggestion: '✓ Sugerencia enviada. ¡Gracias!',
        toastPhotoBig: '⚠️ La foto es demasiado grande (máx 5MB)',
        toastPhotoType: '⚠️ Solo se permiten imágenes',
        toastPhotoSent: '✓ Foto enviada. ¡Gracias!',
        confirmExit: '¿Seguro que quieres salir del test? Perderás tu progreso.'
    },
    en: {
        changeLanguage: 'Change language',
        changeTheme: 'Change theme',
        homeSubtitle: 'Practice for licence B',
        docTitle: 'Drivo Test — Spain driving licence B tests',
        docDescription: 'Free practice tests for Spain’s licence B: DGT-style questions, practice mode and a visual glossary. Not affiliated with the DGT.',
        landingLead: 'Free practice tests for Spain’s licence B driving exam.',
        setupTitle: 'Personalise your prep',
        setupSubtitle: 'Optional — you can do this later',
        examDate: 'Exam date',
        dailyTime: 'Daily study time',
        min10: '10 minutes',
        min20: '20 minutes',
        min30: '30 minutes',
        later: 'Later',
        save: 'Save',
        sessionTitle: "Today's session",
        startAdaptive: 'Start adaptive session',
        sessionTime: '~{n} minutes',
        pendingErrors: '{n} mistakes to review',
        doubtedQs: '{n} unsure questions',
        mixNew: 'Mix of review and new questions',
        statQuestions: 'Questions',
        statDone: 'Done',
        statReview: 'To review',
        statAccuracy: 'Accuracy',
        noReview: 'No questions to review yet',
        streakUnit: 'days',
        streakUnitOne: 'day',
        levelN: 'Level {n}',
        examOfficial: 'Official exam',
        examMeta: '30 questions · Max 3 mistakes',
        practiceMode: 'Practice mode',
        practiceMeta: 'Instant feedback',
        library: 'Library',
        libraryMeta: 'Browse all questions',
        glossary: 'Visual glossary',
        glossaryMeta: 'Road words, with DGT photos',
        disclaimer: 'This app is not affiliated with or endorsed by the DGT',
        exit: 'Exit',
        errors: 'Mistakes: {n}/3',
        questionN: 'Question {n}',
        needsReview: 'Needs review',
        somethingWrong: 'Something wrong?',
        doubt: 'Unsure',
        markedReview: 'Marked for review',
        next: 'Next →',
        correct: 'Correct!',
        incorrect: 'Incorrect',
        correctLead: 'You chose the right answer.',
        wrongLead: 'The correct answer is:',
        passed: 'Passed!',
        failed: 'Not passed',
        passedSub: 'You passed the exam',
        failedSub: 'Keep practising',
        correctLabel: 'Correct',
        wrongLabel: 'Incorrect',
        scoreLabel: 'Score',
        retryExam: 'Retry exam',
        goHome: 'Back home',
        backHome: 'Home',
        libraryTitle: 'Question library',
        category: 'Category',
        catAll: 'All',
        catSignals: 'Signs',
        catPriority: 'Priority',
        catSpeed: 'Speed',
        catSafety: 'Safety',
        catSafetyRoad: 'Road safety',
        catDistances: 'Distances',
        catParking: 'Parking',
        catLights: 'Lights',
        catRoads: 'Roads',
        catVulnerable: 'Vulnerable users',
        catDocs: 'Documents',
        catGeneral: 'General',
        glossarySubtitle: 'Road words. Official DGT text and photos.',
        glossaryCredit: 'Source: DGT. Easy-read dictionary. Licence B.',
        fbWrongQuestion: 'The question is poorly worded',
        fbWrongAnswer: 'The right answer is a different one',
        fbWrongExplanation: 'The explanation is wrong',
        fbPhoto: 'Attach evidence (photo)',
        fbSuggestion: 'General suggestion',
        cancel: 'Cancel',
        loading: 'Loading',
        autoTranslated: 'Automatic translation',
        photoTitle: 'Attach evidence',
        photoSubtitle: 'Screenshot from the DGT manual, etc.',
        choosePhoto: '📷 Choose photo',
        send: 'Send',
        photoLimit: 'Limit: 5MB per photo',
        searchPlaceholder: 'Search',
        libraryEmpty: 'No questions found',
        seeMore: 'See more',
        showExplanation: '💡 See detailed explanation',
        hideExplanation: '🔼 Hide explanation',
        whyCorrect: 'Why is this correct?',
        toastProfile: '✓ Profile saved',
        toastReport: '✓ Report sent. Thanks for helping us improve.',
        toastSuggestion: '✓ Suggestion sent. Thank you!',
        toastPhotoBig: '⚠️ Photo is too large (max 5MB)',
        toastPhotoType: '⚠️ Images only',
        toastPhotoSent: '✓ Photo sent. Thank you!',
        confirmExit: 'Leave the test? Your progress will be lost.'
    }
};

function t(key, vars) {
    const table = I18N[currentLang] || I18N.es;
    let s = table[key] || I18N.es[key] || key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
    return s;
}

function displayCategory(name) {
    const map = {
        'Señales': 'catSignals',
        'Prioridad': 'catPriority',
        'Velocidad': 'catSpeed',
        'Seguridad': 'catSafety',
        'Seguridad Vial': 'catSafetyRoad',
        'Distancias': 'catDistances',
        'Estacionamiento': 'catParking',
        'Alumbrado': 'catLights',
        'Vías': 'catRoads',
        'Usuarios Vulnerables': 'catVulnerable',
        'Documentación': 'catDocs',
        'General': 'catGeneral'
    };
    return map[name] ? t(map[name]) : name;
}

function applyI18n() {
    document.documentElement.lang = currentLang;
    document.body.classList.toggle('lang-en', currentLang === 'en');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
        el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
    });
    const credit = document.querySelector('.glossary-credit');
    if (credit) credit.textContent = t('glossaryCredit');
    const langBtn = document.getElementById('langButton');
    if (langBtn) langBtn.setAttribute('aria-pressed', currentLang === 'en' ? 'true' : 'false');
    document.title = t('docTitle');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('docDescription'));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t('docTitle'));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t('docDescription'));
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', t('docTitle'));
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', t('docDescription'));
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', currentLang === 'en' ? 'en_GB' : 'es_ES');
}

function toggleLang() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', currentLang);
    applyI18n();
    updateHomeStats();
}

function loadLang() {
    if (localStorage.getItem('lang') === 'en') currentLang = 'en';
    applyI18n();
}

const liveTranslateCache = new Map();
let questionLoadToken = 0;

async function translateText(text) {
    if (currentLang !== 'en' || !text) return text;
    if (liveTranslateCache.has(text)) return liveTranslateCache.get(text);
    try {
        const out = await fetchTranslation(text);
        liveTranslateCache.set(text, out);
        return out;
    } catch (error) {
        return text;
    }
}

async function fetchTranslation(text) {
    const pieces = [];
    for (let i = 0; i < text.length; i += 700) pieces.push(text.slice(i, i + 700));
    const parts = [];
    for (const piece of pieces) parts.push(await fetchTranslationChunk(piece));
    return parts.join('');
}

async function fetchTranslationChunk(text) {
    try {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=' + encodeURIComponent(text);
        const data = await fetchJson(url);
        const out = (data[0] || []).map((part) => part[0]).join('');
        if (out) return out;
    } catch (error) {}
    const url = 'https://api.mymemory.translated.net/get?langpair=es|en&q=' + encodeURIComponent(text);
    const data = await fetchJson(url);
    const out = data && data.responseData && data.responseData.translatedText;
    if (!out) throw new Error('translate');
    return out;
}

async function fetchJson(url) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error('bad');
        return await res.json();
    } finally {
        clearTimeout(timer);
    }
}

function syncThemeButton() {
    const btn = document.getElementById('themeButton');
    if (btn) btn.setAttribute('aria-pressed', document.body.classList.contains('light-mode') ? 'true' : 'false');
}

function isNativeApp() {
    return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
}

function syncNativeChrome() {
    if (!isNativeApp()) return;
    document.documentElement.classList.add('native-app');
    const Bar = window.Capacitor.Plugins && window.Capacitor.Plugins.StatusBar;
    if (!Bar) return;
    const light = document.body.classList.contains('light-mode');
    Bar.setOverlaysWebView({ overlay: false });
    Bar.setBackgroundColor({ color: light ? '#edf4ff' : '#011434' });
    Bar.setStyle({ style: light ? 'DARK' : 'LIGHT' });
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    syncThemeButton();
    syncNativeChrome();
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    syncThemeButton();
    syncNativeChrome();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    try {
        if (isNativeApp()) document.documentElement.classList.add('native-app');
        loadUserStats();
        loadTheme();
        loadLang();
        initializeEventListeners();
        await loadQuestions();
        updateHomeStats();
    } catch (error) {
        console.error(error);
        updateHomeStats();
    }
});

// ============================================
// EVENT LISTENERS INITIALIZATION
// ============================================

function initializeEventListeners() {
    const enterAppBtn = document.getElementById('enterAppBtn');
    if (enterAppBtn) {
        enterAppBtn.addEventListener('click', () => showView('homeView'));
    }

    const langButton = document.getElementById('langButton');
    if (langButton) {
        langButton.addEventListener('click', toggleLang);
    }

    // Theme toggle
    const themeButton = document.getElementById('themeButton');
    if (themeButton) {
        themeButton.addEventListener('click', toggleTheme);
    }
    
    // Setup buttons
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            saveUserProfile();
            showToast(t('toastProfile'));
        });
    }
    
    const skipSetupBtn = document.getElementById('skipSetupBtn');
    if (skipSetupBtn) {
        skipSetupBtn.addEventListener('click', skipSetup);
    }
    
    // Daily session button
    const startDailyBtn = document.getElementById('startDailyBtn');
    if (startDailyBtn) {
        startDailyBtn.addEventListener('click', startDailySession);
    }
    
    // Mode buttons
    const examModeBtn = document.getElementById('examModeBtn');
    if (examModeBtn) {
        examModeBtn.addEventListener('click', () => startMode('exam'));
    }

    const practiceModeBtn = document.getElementById('practiceModeBtn');
    if (practiceModeBtn) {
        practiceModeBtn.addEventListener('click', () => startMode('practice'));
    }
    
    const reviewStatBtn = document.getElementById('reviewStatBtn');
    if (reviewStatBtn) {
        reviewStatBtn.addEventListener('click', startReviewSession);
    }
    
    const libraryBtn = document.getElementById('libraryBtn');
    if (libraryBtn) {
        libraryBtn.addEventListener('click', showLibrary);
    }
    
    const glossaryBtn = document.getElementById('glossaryBtn');
    if (glossaryBtn) {
        glossaryBtn.addEventListener('click', showGlossary);
    }
    
    // Test view buttons
    const exitTestBtn = document.getElementById('exitTestBtn');
    if (exitTestBtn) {
        exitTestBtn.addEventListener('click', exitTest);
    }
    
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.addEventListener('click', nextQuestion);
    }
    
    const doubtButton = document.getElementById('doubtButton');
    if (doubtButton) {
        doubtButton.addEventListener('click', markAsDoubt);
    }
    
    // Results buttons
    const resetTestBtn = document.getElementById('resetTestBtn');
    if (resetTestBtn) {
        resetTestBtn.addEventListener('click', resetTest);
    }
    
    const goHomeBtn = document.getElementById('goHomeBtn');
    if (goHomeBtn) {
        goHomeBtn.addEventListener('click', goHome);
    }
    
    // Library buttons
    const libraryBackBtn = document.getElementById('libraryBackBtn');
    if (libraryBackBtn) {
        libraryBackBtn.addEventListener('click', goHome);
    }
    
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterQuestions);
    }
    const librarySearch = document.getElementById('librarySearch');
    if (librarySearch) {
        librarySearch.addEventListener('input', filterQuestions);
    }
    
    // Glossary button
    const glossaryBackBtn = document.getElementById('glossaryBackBtn');
    if (glossaryBackBtn) {
        glossaryBackBtn.addEventListener('click', goHome);
    }

    document.getElementById('questionReportBtn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFeedbackMenu();
    });

    document.querySelectorAll('.feedback-menu-item').forEach(item => {
        item.addEventListener('click', () => handleFeedbackAction(item.dataset.action));
    });

    document.getElementById('selectPhotoBtn')?.addEventListener('click', selectPhoto);
    document.getElementById('cancelPhotoBtn')?.addEventListener('click', closePhotoModal);
    document.getElementById('submitPhotoBtn')?.addEventListener('click', submitPhoto);
    document.getElementById('photoInput')?.addEventListener('change', handlePhotoSelect);

    document.addEventListener('click', (e) => {
        const menu = document.getElementById('feedbackMenu');
        if (!menu || menu.classList.contains('hidden')) return;
        if (e.target.closest('.feedback-menu') || e.target.closest('.menu-button') || e.target.closest('.library-report')) return;
        closeFeedbackMenu();
    });

    document.getElementById('photoModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'photoModal') closePhotoModal();
    });
}

// ============================================
// DATA LOADING
// ============================================

function questionsFileUrl() {
    const path = location.pathname;
    const dir = /\/$/.test(path) || path.endsWith('.html')
        ? path.replace(/[^/]*$/, '')
        : path + '/';
    return dir + 'data/questions.json';
}

function applyQuestions(data) {
    const processed = processQuestions(data && data.questions);
    if (!processed.length) return false;
    questionsData = processed;
    try {
        localStorage.setItem('carnetBQuestionCount', String(processed.length));
    } catch (error) {}
    return true;
}

async function loadQuestions() {
    if (typeof QUESTIONS_DATA !== 'undefined') {
        applyQuestions(QUESTIONS_DATA);
        if (location.protocol === 'file:') {
            await saveQuestions(QUESTIONS_DATA);
            return;
        }
    } else {
        const saved = await readSavedQuestions();
        if (saved) applyQuestions(saved);
    }

    if (location.protocol === 'file:') return;

    try {
        const response = await fetch(questionsFileUrl());
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        const incoming = data && data.questions ? data.questions.length : 0;
        if (incoming > questionsData.length && applyQuestions(data)) {
            await saveQuestions(data);
        }
    } catch (error) {
        console.error('❌ Error cargando preguntas:', error);
    }
}

function saveQuestions(data) {
    return new Promise(resolve => {
        try {
            const req = indexedDB.open('carnet-b', 1);
            req.onupgradeneeded = () => {
                req.result.createObjectStore('data');
            };
            req.onsuccess = () => {
                const tx = req.result.transaction('data', 'readwrite');
                tx.objectStore('data').put(data, 'questions');
                tx.oncomplete = () => resolve();
                tx.onerror = () => resolve();
            };
            req.onerror = () => resolve();
        } catch (error) {
            resolve();
        }
    });
}

function readSavedQuestions() {
    return new Promise(resolve => {
        try {
            const req = indexedDB.open('carnet-b', 1);
            req.onupgradeneeded = () => {
                req.result.createObjectStore('data');
            };
            req.onsuccess = () => {
                const tx = req.result.transaction('data', 'readonly');
                const get = tx.objectStore('data').get('questions');
                get.onsuccess = () => resolve(get.result || null);
                get.onerror = () => resolve(null);
            };
            req.onerror = () => resolve(null);
        } catch (error) {
            resolve(null);
        }
    });
}

function questionImagePath(image) {
    if (!image) return '';
    const value = String(image).trim();
    if (value.startsWith('assets/')) return value;
    if (/^[\w.-]+\.(jpe?g|png|gif|webp)$/i.test(value)) {
        return 'assets/questions/' + value;
    }
    return '';
}

function processQuestions(questions) {
    if (!Array.isArray(questions)) return [];
    const out = [];
    questions.forEach((q, index) => {
        try {
            if (!q?.question?.es || !Array.isArray(q.answers)) return;
            out.push({
                id: q.id,
                question: q.question.es,
                questionEN: q.question.en,
                answers: q.answers.map(a => a.es),
                correctIndex: q.correctIndex,
                category: categorizeQuestion(q),
                source: q.source,
                explanation: q.explanation || '',
                image: questionImagePath(q.image)
            });
        } catch (error) {}
    });
    return out;
}

// ============================================
// METRICS CALCULATION
// ============================================

function categorizeQuestion(q) {
    const text = q.question.es.toLowerCase();
    
    if (text.includes('señal') || text.includes('marca vial')) return 'Señales';
    if (text.includes('velocidad') || text.includes('kilómetro')) return 'Velocidad';
    if (text.includes('adelant') || text.includes('prioridad')) return 'Prioridad';
    if (text.includes('alcohol') || text.includes('droga') || text.includes('cannabis')) return 'Seguridad Vial';
    if (text.includes('distancia') || text.includes('separa')) return 'Distancias';
    if (text.includes('estacion') || text.includes('parar')) return 'Estacionamiento';
    if (text.includes('luz') || text.includes('alumbrado')) return 'Alumbrado';
    if (text.includes('túnel') || text.includes('autopista')) return 'Vías';
    if (text.includes('peatón') || text.includes('ciclista')) return 'Usuarios Vulnerables';
    if (text.includes('documento') || text.includes('permiso')) return 'Documentación';
    
    return 'General';
}

// ============================================
// NAVIGATION
// ============================================

function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
    window.scrollTo(0, 0);
}

async function runWithLoader(task) {
    const loader = document.getElementById('screenLoader');
    const timer = setTimeout(() => loader.classList.remove('hidden'), 180);
    try {
        return await task();
    } finally {
        clearTimeout(timer);
        loader.classList.add('hidden');
    }
}

function goHome() {
    showView('homeView');
    updateHomeStats();
}

// ============================================
// USER PROFILE SETUP
// ============================================

function saveUserProfile() {
    const examDate = document.getElementById('examDate').value;
    const dailyMinutes = parseInt(document.getElementById('dailyMinutes').value);
    
    // Ahora es opcional - guardar incluso sin fecha
    userStats.userProfile = {
        examDate: examDate || null,
        dailyMinutes: dailyMinutes,
        createdAt: Date.now()
    };
    
    saveUserStats();
    updateHomeStats();
}

// Saltar configuración inicial
function skipSetup() {
    // Guardar perfil vacío para indicar que el usuario ya vio el setup
    userStats.userProfile = {
        examDate: null,
        dailyMinutes: 10, // valor por defecto
        createdAt: Date.now(),
        skipped: true
    };
    
    saveUserStats();
    updateHomeStats();
}

// ============================================
// ADAPTIVE LEARNING SYSTEM
// ============================================

function startDailySession() {
    testMode = 'daily';
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    
    const minutes = userStats.userProfile?.dailyMinutes || 10;
    const questionCount = Math.round(minutes * 1.2); // ~1.2 preguntas por minuto
    
    currentTest = selectSmartQuestions(questionCount);
    
    showView('testView');
    loadQuestion();
}

function selectSmartQuestions(count) {
    const now = Date.now();
    const selected = [];
    
    // 1. PRIORIDAD: Errores pendientes de revisar (40%)
    const pendingReviews = getPendingReviewQuestions();
    const reviewCount = Math.min(pendingReviews.length, Math.floor(count * 0.4));
    selected.push(...shuffleArray(pendingReviews).slice(0, reviewCount));
    
    // 2. Preguntas con dudas (20%)
    const doubtedQuestions = getDoubtedQuestions();
    const doubtCount = Math.min(doubtedQuestions.length, Math.floor(count * 0.2));
    selected.push(...shuffleArray(doubtedQuestions).slice(0, doubtCount));
    
    // 3. Preguntas nuevas de categorías débiles (30%)
    const weakCategories = getWeakCategories();
    const newFromWeakCount = Math.floor(count * 0.3);
    const newFromWeak = getNewQuestionsFromCategories(weakCategories, newFromWeakCount);
    selected.push(...newFromWeak);
    
    // 4. Repaso de dominadas (10%)
    const masteredCount = Math.floor(count * 0.1);
    const masteredQuestions = getMasteredQuestions();
    selected.push(...shuffleArray(masteredQuestions).slice(0, masteredCount));
    
    // 5. Rellenar con preguntas aleatorias si falta
    while (selected.length < count && selected.length < questionsData.length) {
        const random = questionsData[Math.floor(Math.random() * questionsData.length)];
        if (!selected.find(q => q.id === random.id)) {
            selected.push(random);
        }
    }
    
    return selected.slice(0, count);
}

function getPendingReviewQuestions() {
    const now = Date.now();
    const pending = [];
    
    questionsData.forEach(q => {
        const history = userStats.questionHistory[q.id];
        if (history && history.wrong > 0) {
            // Si tiene errores, verificar si debe revisarse
            if (shouldReviewQuestion(q.id, now)) {
                pending.push(q);
            }
        }
    });
    
    return pending;
}

function getDoubtedQuestions() {
    const doubted = [];
    
    questionsData.forEach(q => {
        const history = userStats.questionHistory[q.id];
        if (history && history.doubts > 0) {
            // Si dudó recientemente (últimos 7 días), incluir
            const daysSinceDoubt = (Date.now() - (history.lastDoubt || 0)) / (1000 * 60 * 60 * 24);
            if (daysSinceDoubt < 7) {
                doubted.push(q);
            }
        }
    });
    
    return doubted;
}

function getWeakCategories() {
    const categoryStats = {};
    
    questionsData.forEach(q => {
        if (!categoryStats[q.category]) {
            categoryStats[q.category] = { total: 0, correct: 0, answered: 0 };
        }
        categoryStats[q.category].total++;
        
        const history = userStats.questionHistory[q.id];
        if (history) {
            categoryStats[q.category].answered++;
            categoryStats[q.category].correct += history.correct;
        }
    });
    
    // Categorías con < 70% de aciertos o < 5 preguntas respondidas
    const weak = [];
    Object.keys(categoryStats).forEach(cat => {
        const stats = categoryStats[cat];
        const accuracy = stats.answered > 0 ? (stats.correct / stats.answered) : 0;
        if (stats.answered < 5 || accuracy < 0.7) {
            weak.push(cat);
        }
    });
    
    return weak;
}

function getNewQuestionsFromCategories(categories, count) {
    const newQuestions = questionsData.filter(q => {
        const history = userStats.questionHistory[q.id];
        return categories.includes(q.category) && (!history || (history.correct + history.wrong) === 0);
    });
    
    return shuffleArray(newQuestions).slice(0, count);
}

function getMasteredQuestions() {
    const mastered = [];
    
    questionsData.forEach(q => {
        const history = userStats.questionHistory[q.id];
        if (history) {
            const total = history.correct + history.wrong;
            const accuracy = total > 0 ? (history.correct / total) : 0;
            // Dominada: >= 3 intentos con >= 80% aciertos
            if (total >= 3 && accuracy >= 0.8) {
                mastered.push(q);
            }
        }
    });
    
    return mastered;
}

function getReviewQuestions() {
    return questionsData.filter(q => needsReview(q.id));
}

async function startReviewSession() {
    const ready = await runWithLoader(async () => {
        if (!(await ensureQuestions())) return false;
        const review = getReviewQuestions();
        if (!review.length) return 'empty';
        testMode = 'review';
        currentQuestionIndex = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        currentTest = shuffleArray(review);
        return true;
    });
    if (ready === 'empty') {
        showToast(t('noReview'));
        return;
    }
    if (!ready) return;
    showView('testView');
    loadQuestion();
}

function needsReview(questionId) {
    const history = userStats.questionHistory[questionId];
    if (!history) return false;
    return (history.wrong || 0) > 0 || (history.doubts || 0) > 0;
}

function updateReviewChip(questionId) {
    const chip = document.getElementById('reviewChip');
    if (!chip) return;
    chip.classList.toggle('hidden', !needsReview(questionId));
}

function shouldReviewQuestion(questionId, now) {
    const history = userStats.questionHistory[questionId];
    if (!history || !history.lastAnswered) return true;
    
    const daysSince = (now - history.lastAnswered) / (1000 * 60 * 60 * 24);
    const wrongCount = history.wrong || 0;
    
    // Repetición espaciada: más errores = revisar más frecuentemente
    if (wrongCount >= 3 && daysSince >= 1) return true;
    if (wrongCount === 2 && daysSince >= 3) return true;
    if (wrongCount === 1 && daysSince >= 7) return true;
    
    return false;
}

// ============================================
// DOUBT MARKING
// ============================================

function markAsDoubt() {
    const question = currentTest[currentQuestionIndex];
    
    if (!userStats.questionHistory[question.id]) {
        userStats.questionHistory[question.id] = { correct: 0, wrong: 0, doubts: 0 };
    }
    
    userStats.questionHistory[question.id].doubts = (userStats.questionHistory[question.id].doubts || 0) + 1;
    userStats.questionHistory[question.id].lastDoubt = Date.now();
    
    saveUserStats();
    
    // Feedback visual
    const btn = document.getElementById('doubtButton');
    btn.textContent = t('markedReview');
    btn.classList.add('is-marked');
    btn.disabled = true;
    updateReviewChip(question.id);
}

// ============================================
// TEST MODE
// ============================================

async function ensureQuestions() {
    if (questionsData.length) return true;
    await loadQuestions();
    updateHomeStats();
    return questionsData.length > 0;
}

async function startMode(mode) {
    const ready = await runWithLoader(async () => {
        if (!(await ensureQuestions())) return false;
        testMode = mode;
        currentQuestionIndex = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        currentTest = mode === 'exam' ? getRandomQuestions(30) : shuffleArray([...questionsData]);
        return true;
    });
    if (!ready) return;
    showView('testView');
    loadQuestion();
}

function getRandomQuestions(count) {
    const shuffled = shuffleArray([...questionsData]);
    return shuffled.slice(0, count);
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ============================================
// QUESTION DISPLAY
// ============================================

function loadQuestion() {
    if (currentQuestionIndex >= currentTest.length) {
        showResults();
        return;
    }
    
    const question = currentTest[currentQuestionIndex];
    const token = ++questionLoadToken;
    
    // Update header
    if (testMode === 'exam') {
        document.getElementById('questionCounter').textContent = 
            `${currentQuestionIndex + 1}/30`;
        document.getElementById('errorsCounter').textContent = 
            t('errors', { n: wrongAnswers });
        document.getElementById('errorsCounter').style.display = 'inline';
    } else if (testMode === 'daily' || testMode === 'review') {
        document.getElementById('questionCounter').textContent = 
            `${currentQuestionIndex + 1}/${currentTest.length}`;
        document.getElementById('errorsCounter').style.display = 'none';
    } else {
        document.getElementById('questionCounter').textContent = 
            t('questionN', { n: currentQuestionIndex + 1 });
        document.getElementById('errorsCounter').style.display = 'none';
    }
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentTest.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    // Update question
    document.getElementById('questionCategory').textContent = displayCategory(question.category);
    updateReviewChip(question.id);
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionText').classList.toggle('is-translating', currentLang === 'en');
    const note = document.getElementById('questionTranslatedNote');
    note.classList.add('hidden');
    
    const imageContainer = document.getElementById('questionImage');
    const illustrationHTML = getQuestionIllustration(question);
    imageContainer.innerHTML = illustrationHTML;
    imageContainer.style.display = illustrationHTML ? 'block' : 'none';
    
    // Load answers
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
    
    document.getElementById('nextButton').classList.add('hidden');
    document.getElementById('doubtButton').classList.add('hidden');
    document.getElementById('explanationCard').classList.add('hidden');

    if (currentLang === 'en') fillQuestionInEnglish(question, token);
}

async function fillQuestionInEnglish(question, token) {
    const pieces = [question.question, ...question.answers];
    const out = await Promise.all(pieces.map(translateText));
    if (token !== questionLoadToken) return;
    document.getElementById('questionText').textContent = out[0];
    document.getElementById('questionText').classList.remove('is-translating');
    if (out[0] !== question.question) {
        document.getElementById('questionTranslatedNote').classList.remove('hidden');
    }
    document.querySelectorAll('#answersContainer .answer-button').forEach((btn, i) => {
        if (out[i + 1]) btn.textContent = out[i + 1];
    });
}

// ============================================
// ANSWER HANDLING
// ============================================

function selectAnswer(selectedIndex) {
    const question = currentTest[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-button');
    
    buttons.forEach(btn => btn.disabled = true);
    
    const isCorrect = selectedIndex === question.correctIndex;
    
    buttons[selectedIndex].classList.add(isCorrect ? 'correct' : 'wrong');
    
    if (!isCorrect) {
        buttons[question.correctIndex].classList.add('correct');
    }
    
    if (isCorrect) {
        correctAnswers++;
    } else {
        wrongAnswers++;
    }
    
    userStats.totalAnswered++;
    if (isCorrect) userStats.totalCorrect++;
    
    if (!userStats.questionHistory[question.id]) {
        userStats.questionHistory[question.id] = { correct: 0, wrong: 0, doubts: 0 };
    }
    
    if (isCorrect) {
        userStats.questionHistory[question.id].correct++;
    } else {
        userStats.questionHistory[question.id].wrong++;
    }
    
    // Guardar timestamp de última respuesta
    userStats.questionHistory[question.id].lastAnswered = Date.now();
    
    saveUserStats();
    updateReviewChip(question.id);
    
    if (testMode === 'practice' || testMode === 'daily' || testMode === 'review') {
        showExplanation(isCorrect, question);
    }
    
    const doubtBtn = document.getElementById('doubtButton');
    doubtBtn.classList.remove('hidden');
    doubtBtn.disabled = false;
    doubtBtn.textContent = t('doubt');
    doubtBtn.classList.remove('is-marked');
    doubtBtn.style.background = '';
    doubtBtn.style.border = '';
    doubtBtn.style.color = '';
    
    if (testMode === 'exam' && wrongAnswers > 3) {
        setTimeout(() => showResults(), 1500);
        return;
    }
    
    document.getElementById('nextButton').classList.remove('hidden');
}

async function showExplanation(isCorrect, question) {
    const card = document.getElementById('explanationCard');
    const header = card.querySelector('.explanation-header');
    const icon = document.getElementById('explanationIcon');
    const title = document.getElementById('explanationTitle');
    const text = document.getElementById('explanationText');
    const explanationHTML = getExplanationText(question);
    let bodyHTML = explanationHTML;

    if (currentLang === 'en' && explanationHTML) {
        const tmp = document.createElement('div');
        tmp.innerHTML = explanationHTML;
        tmp.textContent = await translateText(tmp.textContent.trim());
        bodyHTML = tmp.innerHTML;
    }

    if (isCorrect) {
        if (!bodyHTML) {
            card.classList.add('hidden');
            return;
        }
        header.classList.add('hidden');
        text.innerHTML = `<div class="explanation-section">${bodyHTML}</div>`;
    } else {
        header.classList.remove('hidden');
        icon.textContent = '❌';
        title.textContent = t('incorrect');
        text.innerHTML = bodyHTML ? `<div class="explanation-section">${bodyHTML}</div>` : '';
    }
    card.classList.remove('hidden');
}

function getExplanationText(question) {
    const raw = (question.explanation || '').trim();
    return raw ? softenCaps(raw) : '';
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function exitTest() {
    if (confirm(t('confirmExit'))) {
        goHome();
    }
}

// ============================================
// RESULTS
// ============================================

function showResults() {
    const totalQuestions = testMode === 'exam' ? 30 : currentQuestionIndex + 1;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = testMode === 'exam' ? wrongAnswers <= 3 : score >= 90;
    
    document.getElementById('resultIcon').textContent = passed ? '✅' : '❌';
    document.getElementById('resultTitle').textContent = passed ? t('passed') : t('failed');
    document.getElementById('resultSubtitle').textContent = passed 
        ? t('passedSub') 
        : t('failedSub');
    
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('wrongAnswers').textContent = wrongAnswers;
    document.getElementById('finalScore').textContent = `${score}%`;
    
    showView('resultsView');
}

function resetTest() {
    if (testMode === 'review') startReviewSession();
    else startMode(testMode);
}

// ============================================
// LIBRARY
// ============================================

async function showLibrary() {
    await runWithLoader(async () => {
        await ensureQuestions();
        filterQuestions();
    });
    showView('libraryView');
}

function filterQuestions() {
    const category = document.getElementById('categoryFilter').value;
    const query = normalizeSearch(document.getElementById('librarySearch')?.value || '');
    let filtered = [...questionsData];
    
    if (category !== 'all') {
        const categoryMap = {
            'signals': 'Señales',
            'priority': 'Prioridad',
            'speed': 'Velocidad',
            'safety': 'Seguridad Vial'
        };
        filtered = filtered.filter(q => q.category === categoryMap[category]);
    }

    if (query) {
        filtered = filtered.filter(q => {
            const haystack = `${q.question || ''} ${q.answers?.[q.correctIndex] || ''} ${q.explanation || ''}`;
            return normalizeSearch(haystack).includes(query);
        });
    }
    
    displayQuestions(filtered);
}

function normalizeSearch(text) {
    return String(text).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

let libraryList = [];
let libraryShownCount = 0;
const LIBRARY_PAGE = 40;

function displayQuestions(questions) {
    libraryList = questions;
    libraryShownCount = 0;
    const container = document.getElementById('questionsList');
    container.innerHTML = '';

    if (questions.length === 0) {
        container.innerHTML = `<p class="library-empty">${t('libraryEmpty')}</p>`;
        return;
    }

    appendLibraryPage();
}

function appendLibraryPage() {
    const container = document.getElementById('questionsList');
    const moreBtn = document.getElementById('libraryLoadMore');
    if (moreBtn) moreBtn.remove();

    const start = libraryShownCount;
    const end = Math.min(start + LIBRARY_PAGE, libraryList.length);
    const frag = document.createDocumentFragment();

    for (let index = start; index < end; index++) {
        const q = libraryList[index];
        const item = document.createElement('div');
        item.className = 'question-item glass-card';
        const illustrationHTML = getQuestionIllustration(q);

        item.innerHTML = `
            <div class="question-item-header">
                <span class="question-category">${displayCategory(q.category)}</span>
                ${needsReview(q.id) ? `<span class="review-chip">${t('needsReview')}</span>` : ''}
            </div>
            ${illustrationHTML ? `<div class="question-image">${illustrationHTML}</div>` : ''}
            <div class="question-item-text" style="margin-top: 16px;">${q.question}</div>
            
            <div class="library-answers">
                ${q.answers.map((answer, idx) => `
                    <div class="library-answer${idx === q.correctIndex ? ' is-correct' : ''}">
                        ${answer}
                    </div>
                `).join('')}
            </div>
            
            <div class="library-explain">
                <button class="expand-button" onclick="toggleExplanation(${index})">
                    ${t('showExplanation')}
                </button>
                <div id="explanation-${index}" class="explanation-content" style="display: none; margin-top: 12px; padding: 20px; background: linear-gradient(135deg, rgba(217, 119, 87, 0.08) 0%, rgba(139, 154, 122, 0.08) 100%); border-radius: 16px; border: 1px solid var(--border-color);"></div>
            </div>
            <button type="button" class="library-report">${t('somethingWrong')}</button>
        `;

        item.querySelector('.library-report').addEventListener('click', (e) => {
            e.stopPropagation();
            openLibraryFeedbackMenu(q);
        });

        frag.appendChild(item);
    }

    container.appendChild(frag);
    libraryShownCount = end;

    if (libraryShownCount < libraryList.length) {
        const btn = document.createElement('button');
        btn.id = 'libraryLoadMore';
        btn.className = 'library-more';
        btn.textContent = t('seeMore');
        btn.addEventListener('click', appendLibraryPage);
        container.appendChild(btn);
    }
}

function toggleExplanation(index) {
    const content = document.getElementById(`explanation-${index}`);
    const button = content.previousElementSibling;

    if (!content.dataset.ready) {
        const q = libraryList[index];
        const explanation = getExplanationText(q);
        content.innerHTML = explanation
            ? `<div style="font-size: 15px; line-height: 1.7; color: var(--text-primary);">${explanation}</div>`
            : '';
        content.dataset.ready = '1';
    }
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        button.textContent = t('hideExplanation');
    } else {
        content.style.display = 'none';
        button.textContent = t('showExplanation');
    }
}

function softenCaps(text) {
    if (!text || typeof text !== 'string') return text;
    const letters = text.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '');
    if (!letters) return text;
    const upper = (letters.match(/[A-ZÁÉÍÓÚÜÑ]/g) || []).length;
    if (upper / letters.length < 0.55) return text;
    const lower = text.toLocaleLowerCase('es');
    return lower.replace(/(^|[.!?¿¡\n]\s*)(\p{L})/gu, (_, p, c) => p + c.toLocaleUpperCase('es'));
}

// ============================================
// GLOSSARY - Simple geometric shapes
// ============================================

async function showGlossary() {
    await runWithLoader(async () => {
        loadGlossary();
    });
    showView('glossaryView');
}

function loadGlossary() {
    const container = document.getElementById('glossaryGrid');
    if (container.dataset.ready === '1') return;
    container.dataset.ready = '1';
    container.innerHTML = '';

    glossaryDgt.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glossary-card glass-card';
        const photo = item.image
            ? `<div class="glossary-illustration"><img src="${item.image}" alt="${item.term}" loading="lazy"></div>`
            : '';
        card.innerHTML = `
            <h3 class="glossary-term">${item.term}</h3>
            <p class="glossary-definition">${item.definition}</p>
            ${photo}
        `;
        container.appendChild(card);
    });

    const credit = document.createElement('p');
    credit.className = 'glossary-credit';
    credit.textContent = t('glossaryCredit');
    container.appendChild(credit);
}

// ============================================
// USER STATS
// ============================================

function loadUserStats() {
    try {
        const saved = localStorage.getItem('carnetBStats');
        if (saved) userStats = { ...userStats, ...JSON.parse(saved) };
    } catch (error) {}
    if (!userStats.questionHistory) userStats.questionHistory = {};
}

function saveUserStats() {
    try {
        localStorage.setItem('carnetBStats', JSON.stringify(userStats));
    } catch (error) {}
}

function dayKey(ts) {
    const d = new Date(ts);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getStudyStreak() {
    const days = new Set();
    Object.values(userStats.questionHistory || {}).forEach((h) => {
        if (h.lastAnswered) days.add(dayKey(h.lastAnswered));
        if (h.lastDoubt) days.add(dayKey(h.lastDoubt));
    });
    if (!days.size) return 0;
    const cursor = new Date();
    cursor.setHours(12, 0, 0, 0);
    if (!days.has(dayKey(cursor))) {
        cursor.setDate(cursor.getDate() - 1);
        if (!days.has(dayKey(cursor))) return 0;
    }
    let streak = 0;
    while (days.has(dayKey(cursor))) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
}

function getLevelInfo() {
    const xp = (userStats.totalCorrect || 0) * 10;
    const per = 100;
    return {
        level: Math.floor(xp / per) + 1,
        into: xp % per,
        per
    };
}

function getReviewCount() {
    return Object.keys(userStats.questionHistory || {}).filter(needsReview).length;
}

function updateHomeStats() {
    const known = questionsData.length || Number(localStorage.getItem('carnetBQuestionCount') || 0);
    document.getElementById('totalQuestions').textContent = known || '—';
    document.getElementById('completedQuestions').textContent = userStats.totalAnswered;
    document.getElementById('weakTopics').textContent = getReviewCount();
    const acc = userStats.totalAnswered
        ? Math.round((userStats.totalCorrect / userStats.totalAnswered) * 100)
        : 0;
    document.getElementById('accuracyStat').textContent = `${acc}%`;
    const streakN = getStudyStreak();
    document.getElementById('streakCount').textContent = streakN;
    const streakUnit = document.getElementById('streakUnit');
    if (streakUnit) streakUnit.textContent = streakN === 1 ? t('streakUnitOne') : t('streakUnit');
    const level = getLevelInfo();
    document.getElementById('levelLabel').textContent = t('levelN', { n: level.level });
    document.getElementById('levelXp').textContent = `${level.into} / ${level.per} XP`;
    document.getElementById('levelFill').style.width = `${(level.into / level.per) * 100}%`;
    
    // Mostrar setup o sesión diaria
    const setupPrompt = document.getElementById('setupPrompt');
    const dailySessionCard = document.getElementById('dailySessionCard');
    
    if (!userStats.userProfile) {
        setupPrompt.style.display = 'block';
        dailySessionCard.style.display = 'none';
    } else {
        setupPrompt.style.display = 'none';
        dailySessionCard.style.display = 'block';
        
        // Actualizar descripción de sesión
        const minutes = userStats.userProfile.dailyMinutes || 10;
        document.getElementById('dailySessionTime').textContent = t('sessionTime', { n: minutes });
        
        // Contar pendientes
        const pendingReviews = getPendingReviewQuestions();
        const doubtedQuestions = getDoubtedQuestions();
        
        let description = '';
        if (pendingReviews.length > 0) {
            description = t('pendingErrors', { n: pendingReviews.length });
        }
        if (doubtedQuestions.length > 0) {
            if (description) description += ' · ';
            description += t('doubtedQs', { n: doubtedQuestions.length });
        }
        if (!description) {
            description = t('mixNew');
        }
        
        document.getElementById('dailySessionDescription').textContent = description;
    }
}

console.log('🚗 Carnet B App loaded successfully!');

// ============================================
// FEEDBACK SYSTEM
// ============================================

let currentFeedbackQuestionId = null;
let selectedPhoto = null;
let currentLibraryQuestion = null;

function toggleFeedbackMenu() {
    const menu = document.getElementById('feedbackMenu');
    const question = currentTest[currentQuestionIndex];
    if (!question) return;

    if (menu.classList.contains('hidden')) {
        currentFeedbackQuestionId = question.id;
        menu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        closeFeedbackMenu();
    }
}

function closeFeedbackMenu() {
    const menu = document.getElementById('feedbackMenu');
    if (!menu || menu.classList.contains('hidden')) return;
    menu.style.animation = 'slideDown 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    setTimeout(() => {
        menu.classList.add('hidden');
        menu.style.animation = '';
        document.body.style.overflow = '';
    }, 300);
}

function handleFeedbackAction(action) {
    closeFeedbackMenu();
    
    if (action === 'cancel') {
        return;
    }
    
    if (action === 'attach_photo') {
        openPhotoModal();
        return;
    }
    
    if (action === 'suggestion') {
        handleSuggestion();
        return;
    }
    
    handleErrorReport(action);
}

function openLibraryFeedbackMenu(question) {
    currentLibraryQuestion = question;
    currentFeedbackQuestionId = question.id;
    
    const menu = document.getElementById('feedbackMenu');
    menu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function handleErrorReport(type) {
    const question = currentLibraryQuestion || currentTest[currentQuestionIndex];
    const userNote = prompt('¿Qué está mal? (opcional - pulsa Cancelar para omitir)');
    
    if (userNote === null) {
        saveFeedback(type, question, '');
        showToast(t('toastReport'));
    } else {
        saveFeedback(type, question, userNote);
        showToast(t('toastReport'));
    }
    
    currentLibraryQuestion = null;
}

function handleSuggestion() {
    const question = currentLibraryQuestion || currentTest[currentQuestionIndex];
    const suggestion = prompt('Tu sugerencia:');
    
    if (suggestion && suggestion.trim()) {
        saveFeedback('suggestion', question, suggestion);
        showToast(t('toastSuggestion'));
    }
    
    currentLibraryQuestion = null;
}

function saveFeedback(type, question, userNote, photoData = null) {
    const feedback = {
        questionId: question.id,
        type: type,
        timestamp: Date.now(),
        questionText: question.question,
        userNote: userNote || '',
        photo: photoData || ''
    };

    try {
        const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
        allFeedback.push({ ...feedback, photo: photoData ? 'yes' : '' });
        localStorage.setItem('userFeedback', JSON.stringify(allFeedback));
    } catch (error) {}

    sendFeedbackRemote(feedback);
}

function sendFeedbackRemote(feedback) {
    if (!FEEDBACK_WEBAPP_URL) return;
    fetch(FEEDBACK_WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
            type: FEEDBACK_TYPE_LABEL[feedback.type] || feedback.type,
            questionId: feedback.questionId,
            questionText: feedback.questionText,
            userNote: feedback.userNote,
            photo: feedback.photo
        })
    }).catch(() => {});
}

function compressPhoto(dataUrl) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const max = 1200;
            let w = img.width;
            let h = img.height;
            if (w > max || h > max) {
                const scale = Math.min(max / w, max / h);
                w = Math.round(w * scale);
                h = Math.round(h * scale);
            }
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg', 0.72));
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 400);
    }, 3000);
}

function openPhotoModal() {
    document.getElementById('photoModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    selectedPhoto = null;
    document.getElementById('photoPreview').classList.add('hidden');
    document.getElementById('submitPhotoBtn').disabled = true;
}

function closePhotoModal() {
    document.getElementById('photoModal').classList.add('hidden');
    document.body.style.overflow = '';
    selectedPhoto = null;
    document.getElementById('photoInput').value = '';
    document.getElementById('photoPreview').innerHTML = '';
    document.getElementById('photoPreview').classList.add('hidden');
}

function selectPhoto() {
    document.getElementById('photoInput').click();
}

function handlePhotoSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
        showToast(t('toastPhotoBig'));
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showToast(t('toastPhotoType'));
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
        selectedPhoto = event.target.result;
        
        const preview = document.getElementById('photoPreview');
        preview.innerHTML = `<img src="${selectedPhoto}" alt="Vista previa">`;
        preview.classList.remove('hidden');
        
        document.getElementById('submitPhotoBtn').disabled = false;
    };
    reader.readAsDataURL(file);
}

async function submitPhoto() {
    if (!selectedPhoto) return;

    const question = currentLibraryQuestion || currentTest[currentQuestionIndex];
    const note = prompt('Descripción de la evidencia (opcional):');
    const photo = await compressPhoto(selectedPhoto);

    saveFeedback('photo_evidence', question, note || 'Evidencia adjunta', photo);
    showToast(t('toastPhotoSent'));
    closePhotoModal();
    currentLibraryQuestion = null;
}

function exportFeedback() {
    const feedback = localStorage.getItem('userFeedback');
    if (!feedback) {
        console.log('No hay feedback para exportar');
        return;
    }
    
    const data = JSON.parse(feedback);
    console.log('📊 FEEDBACK DEL USUARIO:', data);
    console.log(`Total de reportes: ${data.length}`);
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `feedback-carnetb-${Date.now()}.json`;
    link.click();
    
    return data;
}

window.exportFeedback = exportFeedback;
