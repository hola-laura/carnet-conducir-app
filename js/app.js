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

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on startup
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        if (themeIcon) themeIcon.textContent = '🌙';
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    await loadQuestions();
    loadUserStats();
    updateHomeStats();
    loadTheme();
    initializeEventListeners();
});

// ============================================
// EVENT LISTENERS INITIALIZATION
// ============================================

function initializeEventListeners() {
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
            showToast('✓ Perfil guardado correctamente');
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
    
    const difficultyFilter = document.getElementById('difficultyFilter');
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', filterQuestions);
    }
    
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', filterQuestions);
    }
    
    // Glossary button
    const glossaryBackBtn = document.getElementById('glossaryBackBtn');
    if (glossaryBackBtn) {
        glossaryBackBtn.addEventListener('click', goHome);
    }
}

// ============================================
// DATA LOADING
// ============================================

async function loadQuestions() {
    try {
        const response = await fetch('data/questions.json');
        const data = await response.json();
        questionsData = processQuestions(data.questions);
        console.log(`✅ Cargadas ${questionsData.length} preguntas`);
    } catch (error) {
        console.error('❌ Error cargando preguntas:', error);
        questionsData = [];
    }
}

function processQuestions(questions) {
    return questions.map((q, index) => {
        return {
            id: q.id,
            question: q.question.es,
            questionEN: q.question.en,
            answers: q.answers.map(a => a.es),
            correctIndex: q.correctIndex,
            category: categorizeQuestion(q),
            difficulty: calculateDifficulty(q, index),
            importance: calculateImportance(q, index),
            frequency: calculateFrequency(index),
            source: q.source,
            explanation: q.explanation || ''
        };
    });
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

function calculateDifficulty(q, index) {
    let score = 0;
    const text = q.question.es;
    
    if (text.length > 100) score += 1;
    if (text.length > 150) score += 1;
    
    const technicalTerms = ['calzada', 'arcén', 'carril', 'vehículo prioritario', 'ciclo', 'intersección'];
    technicalTerms.forEach(term => {
        if (text.toLowerCase().includes(term)) score += 0.5;
    });
    
    if (q.images && q.images.length > 0) score += 1;
    
    if (index < 50) score -= 0.5;
    if (index > 300) score += 1;
    
    const normalized = Math.min(5, Math.max(1, Math.round(score)));
    
    return normalized;
}

function calculateImportance(q, index) {
    let score = 3;
    const text = q.question.es.toLowerCase();
    
    if (text.includes('alcohol') || text.includes('droga')) score = 5;
    if (text.includes('velocidad')) score = 5;
    if (text.includes('peatón') || text.includes('niño')) score = 5;
    if (text.includes('señal de stop') || text.includes('prioridad')) score = 5;
    if (text.includes('distancia de seguridad')) score = 5;
    
    if (text.includes('adelantamiento')) score = Math.max(score, 4);
    if (text.includes('luz') || text.includes('alumbrado')) score = Math.max(score, 4);
    if (text.includes('túnel') || text.includes('autopista')) score = Math.max(score, 4);
    
    return score;
}

function calculateFrequency(index) {
    const randomFactor = Math.random() * 0.3 + 0.7;
    return Math.round((questionsData[index]?.importance || 3) * randomFactor * 20);
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
    btn.textContent = '✓ Marcada para repasar';
    btn.style.background = 'rgba(139, 154, 122, 0.3)';
    btn.style.border = '2px solid var(--success)';
    btn.style.color = 'var(--success)';
    btn.disabled = true;
}

// ============================================
// TEST MODE
// ============================================

function startMode(mode) {
    testMode = mode;
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    
    if (mode === 'exam') {
        currentTest = getRandomQuestions(30);
    } else {
        currentTest = shuffleArray([...questionsData]);
    }
    
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
    
    // Update header
    if (testMode === 'exam') {
        document.getElementById('questionCounter').textContent = 
            `${currentQuestionIndex + 1}/30`;
        document.getElementById('errorsCounter').textContent = 
            `Fallos: ${wrongAnswers}/3`;
        document.getElementById('errorsCounter').style.display = 'inline';
    } else if (testMode === 'daily') {
        document.getElementById('questionCounter').textContent = 
            `${currentQuestionIndex + 1}/${currentTest.length}`;
        document.getElementById('errorsCounter').style.display = 'none';
    } else {
        document.getElementById('questionCounter').textContent = 
            `Pregunta ${currentQuestionIndex + 1}`;
        document.getElementById('errorsCounter').style.display = 'none';
    }
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentTest.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    // Update question
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionDifficulty').textContent = '★'.repeat(question.difficulty) + '☆'.repeat(5 - question.difficulty);
    document.getElementById('questionText').textContent = question.question;
    
    // Show simple illustration
    const imageContainer = document.getElementById('questionImage');
    imageContainer.innerHTML = getQuestionIllustration(question);
    imageContainer.style.display = 'block';
    
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
    
    if (testMode === 'practice' || testMode === 'daily') {
        showExplanation(isCorrect, question);
    }
    
    const doubtBtn = document.getElementById('doubtButton');
    doubtBtn.classList.remove('hidden');
    doubtBtn.disabled = false;
    doubtBtn.textContent = 'He dudado con esta';
    
    if (testMode === 'exam' && wrongAnswers > 3) {
        setTimeout(() => showResults(), 1500);
        return;
    }
    
    document.getElementById('nextButton').classList.remove('hidden');
}

function showExplanation(isCorrect, question) {
    const card = document.getElementById('explanationCard');
    const icon = document.getElementById('explanationIcon');
    const title = document.getElementById('explanationTitle');
    const text = document.getElementById('explanationText');
    
    const explanationHTML = getExplanationText(question);
    
    if (isCorrect) {
        icon.textContent = '✅';
        title.textContent = '¡Correcto!';
        text.innerHTML = `<div style="margin-bottom: 16px; font-size: 16px;">Has seleccionado la respuesta correcta.</div>${explanationHTML}`;
    } else {
        icon.textContent = '❌';
        title.textContent = 'Incorrecto';
        text.innerHTML = `<div style="margin-bottom: 16px; font-size: 16px; padding: 12px; background: rgba(217,119,87,0.1); border-radius: 16px; border-left: 3px solid var(--error);"><strong>La respuesta correcta es:</strong><br/>"${question.answers[question.correctIndex]}"</div>${explanationHTML}`;
    }
    
    card.classList.remove('hidden');
}

function getExplanationText(question) {
    const fullExplanation = generateExplanation(question);
    return fullExplanation;
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function exitTest() {
    if (confirm('¿Seguro que quieres salir del test? Perderás tu progreso.')) {
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
    document.getElementById('resultTitle').textContent = passed ? '¡Aprobado!' : 'No Aprobado';
    document.getElementById('resultSubtitle').textContent = passed 
        ? 'Has superado el examen' 
        : 'Sigue practicando';
    
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('wrongAnswers').textContent = wrongAnswers;
    document.getElementById('finalScore').textContent = `${score}%`;
    
    showView('resultsView');
}

function resetTest() {
    startMode(testMode);
}

// ============================================
// LIBRARY
// ============================================

function showLibrary() {
    showView('libraryView');
    filterQuestions();
}

function filterQuestions() {
    const category = document.getElementById('categoryFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    
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
    
    if (difficulty !== 'all') {
        const diffMap = { 'easy': [1, 2], 'medium': [3], 'hard': [4, 5] };
        filtered = filtered.filter(q => diffMap[difficulty].includes(q.difficulty));
    }
    
    filtered.sort((a, b) => {
        if (sortBy === 'importance') return b.importance - a.importance;
        if (sortBy === 'difficulty') return b.difficulty - a.difficulty;
        if (sortBy === 'frequency') return b.frequency - a.frequency;
        return 0;
    });
    
    displayQuestions(filtered);
}

function displayQuestions(questions) {
    const container = document.getElementById('questionsList');
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const item = document.createElement('div');
        item.className = 'question-item glass-card';
        
        const correctAnswer = q.answers[q.correctIndex];
        const illustrationHTML = getQuestionIllustration(q);
        const explanation = q.explanation || generateExplanation(q);
        
        item.innerHTML = `
            <button class="menu-button" data-question-id="${q.id}" aria-label="Opciones de pregunta">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                    <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
                </svg>
            </button>
            <div class="question-item-header">
                <span class="question-category">${q.category}</span>
                <span class="question-difficulty">${'★'.repeat(q.difficulty)}${'☆'.repeat(5 - q.difficulty)}</span>
            </div>
            ${illustrationHTML}
            <div class="question-item-text" style="margin-top: 16px;">${q.question}</div>
            
            <div class="all-answers-box" style="margin-top: 16px; padding: 16px; background: rgba(255, 255, 255, 0.03); border-radius: 16px;">
                <div style="font-size: 11px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px;">
                    📝 Opciones de Respuesta
                </div>
                ${q.answers.map((answer, idx) => `
                    <div style="padding: 12px; margin: 8px 0; border-radius: 16px; font-size: 15px; ${idx === q.correctIndex ? 'background: rgba(139, 154, 122, 0.15); border-left: 4px solid var(--success); font-weight: 600;' : 'background: rgba(255, 255, 255, 0.02); border-left: 4px solid transparent;'}">
                        ${idx === q.correctIndex ? '✓ ' : ''}${answer}
                    </div>
                `).join('')}
            </div>
            
            <div class="explanation-section" style="margin-top: 16px;">
                <button class="expand-button" onclick="toggleExplanation(${index})" style="width: 100%; padding: 14px; background: rgba(217, 119, 87, 0.1); border: 2px solid var(--primary-warm); border-radius: 50px; color: var(--primary-warm); font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.3s;">
                    💡 Ver Explicación Detallada
                </button>
                <div id="explanation-${index}" class="explanation-content" style="display: none; margin-top: 12px; padding: 20px; background: linear-gradient(135deg, rgba(217, 119, 87, 0.08) 0%, rgba(139, 154, 122, 0.08) 100%); border-radius: 16px; border: 1px solid var(--border-color);">
                    <div style="font-size: 12px; color: var(--success); font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px;">
                        ✓ ¿Por qué es correcta?
                    </div>
                    <div style="font-size: 15px; line-height: 1.7; color: var(--text-primary);">
                        ${explanation}
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 12px; font-size: 12px; color: var(--text-secondary);">
                <span>📊 Importancia: ${q.importance}/5</span> · 
                <span>📈 Frecuencia: ${q.frequency}%</span>
            </div>
        `;
        
        const menuBtn = item.querySelector('.menu-button');
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openLibraryFeedbackMenu(q);
        });
        
        container.appendChild(item);
    });
    
    if (questions.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No se encontraron preguntas</p>';
    }
}

function toggleExplanation(index) {
    const content = document.getElementById(`explanation-${index}`);
    const button = content.previousElementSibling;
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        button.textContent = '🔼 Ocultar Explicación';
        button.style.background = 'var(--primary-warm)';
        button.style.color = '#FFFFFF';
    } else {
        content.style.display = 'none';
        button.textContent = '💡 Ver Explicación Detallada';
        button.style.background = 'rgba(217, 119, 87, 0.1)';
        button.style.color = 'var(--primary-warm)';
    }
}

function generateExplanation(question) {
    const category = question.category;
    const correctAnswer = question.answers[question.correctIndex];
    const questionText = question.question.toLowerCase();
    
    // Si existe explicación en los datos, úsala como base
    let baseExplanation = '';
    if (question.explanation && question.explanation.trim()) {
        baseExplanation = question.explanation;
    }
    
    // Generar explicación completa estructurada
    let explanation = '<div class="explanation-structured">';
    
    // 1. Por qué es correcta
    explanation += '<div class="explanation-section">';
    explanation += '<strong>✓ Por qué es correcta:</strong><br>';
    explanation += generateCorrectReasoning(questionText, correctAnswer, baseExplanation);
    explanation += '</div>';
    
    // 2. Por qué las otras NO lo son
    explanation += '<div class="explanation-section">';
    explanation += '<strong>✗ Por qué las otras opciones no:</strong><br>';
    explanation += generateWrongReasoning(questionText, question.answers, question.correctIndex);
    explanation += '</div>';
    
    // 3. Detalle clave a identificar
    explanation += '<div class="explanation-section">';
    explanation += '<strong>🔍 Detalle clave:</strong><br>';
    explanation += generateKeyDetail(questionText, category);
    explanation += '</div>';
    
    // 4. Normativa aplicable
    explanation += '<div class="explanation-section">';
    explanation += '<strong>📋 Normativa:</strong><br>';
    explanation += generateNormative(questionText, category);
    explanation += '</div>';
    
    explanation += '</div>';
    
    return explanation;
}

// Genera el razonamiento de por qué la respuesta es correcta
function generateCorrectReasoning(questionText, correctAnswer, baseExplanation) {
    if (baseExplanation) {
        return baseExplanation;
    }
    
    if (questionText.includes('arcén')) {
        return 'Es más seguro mantener el arcén libre porque actúa como zona de escape para emergencias. Cuando un vehículo tiene una avería o necesita realizar una parada urgente, el arcén le proporciona un espacio seguro fuera del flujo de tráfico. Si está ocupado, ese conductor queda expuesto a ser golpeado desde atrás por otros vehículos. Además, los servicios de emergencia (ambulancias, grúas, bomberos) necesitan circular por el arcén para llegar rápidamente a accidentes sin quedar atrapados en el tráfico.';
    } else if (questionText.includes('chaleco')) {
        return 'Es más seguro llevar el chaleco en el habitáculo porque necesitas ponértelo ANTES de salir del vehículo. Si está en el maletero, tendrías que bajarte sin protección y exponerte al tráfico para buscarlo. Los conductores que circulan a alta velocidad necesitan verte desde la mayor distancia posible para poder frenar o cambiar de carril. Un chaleco reflectante puede hacerte visible hasta 150 metros de distancia, mientras que sin él podrías ser invisible hasta estar a menos de 30 metros, dando tiempo insuficiente para reaccionar.';
    } else if (questionText.includes('neumático')) {
        return 'Los neumáticos son tu único contacto con el asfalto, y su estado determina si puedes frenar, girar o mantener control. Un neumático deteriorado tiene menos agarre porque la banda de rodadura está desgastada, lo que aumenta tu distancia de frenado hasta un 50% en mojado. Además, un neumático en mal estado puede reventar súbitamente a alta velocidad, haciendo que pierdas control del volante de forma brusca y potencialmente volcando o saliendo de la vía. Es especialmente peligroso en curvas o al adelantar.';
    } else if (questionText.includes('velocidad') && questionText.includes('autopista')) {
        return 'Las autopistas permiten 120 km/h porque están diseñadas con múltiples características de seguridad: carriles más anchos, arcén amplio, separación física entre sentidos (evita choques frontales), curvas más suaves, y mejor visibilidad. Estas condiciones te dan más margen de reacción. En carreteras convencionales, el límite es 90 km/h porque suele haber solo un carril por sentido, sin separación física, curvas más cerradas, y posibilidad de que aparezcan peatones, animales o tractores. A mayor velocidad en esas condiciones, el riesgo de colisión frontal o salida de vía se multiplica.';
    } else if (questionText.includes('adelant')) {
        return 'Para adelantar con seguridad necesitas tres elementos críticos que trabajan juntos. Primero, visibilidad: debes ver al menos 200 metros de carretera despejada para asegurarte de que no viene ningún vehículo de frente; sin esto, arriesgas una colisión frontal (el tipo de accidente más mortal). Segundo, espacio suficiente: necesitas acelerar, adelantar y volver a tu carril sin forzar al vehículo adelantado a frenar; si cortas su trayectoria, puede perderse el control. Tercero, comunicación: señalizar con el intermitente avisa a los demás de tu intención, evitando que otro conductor intente adelantar al mismo tiempo.';
    } else if (questionText.includes('intersección') || questionText.includes('cruce')) {
        return 'En intersecciones sin señalizar, ceder el paso a quien viene por la derecha crea un sistema predecible que evita colisiones. Si ambos conductores conocen y aplican esta regla, cada uno sabe qué esperar del otro, reduciendo la indecisión y las paradas bruscas. Esta predictibilidad es crucial porque en cruces hay múltiples trayectorias que se intersectan; sin una regla clara, dos vehículos podrían avanzar simultáneamente y colisionar. Es especialmente importante en rotondas, donde mantener el flujo ordenado previene embotellamientos y alcances traseros.';
    } else if (questionText.includes('alcohol')) {
        return 'El alcohol afecta tu cerebro de múltiples formas peligrosas para conducir. Primero, ralentiza tu tiempo de reacción: donde normalmente reaccionarías en 0.7 segundos, con alcohol puedes tardar 1.5 segundos o más; esos 0.8 segundos extra a 90 km/h significan 20 metros adicionales sin frenar. Segundo, reduce tu visión periférica hasta un 30%, haciendo que no veas peatones o vehículos a los lados. Tercero, afecta tu juicio, haciéndote sentir más confiado y tomando riesgos que normalmente evitarías (adelantamientos peligrosos, exceso de velocidad). Incluso pequeñas cantidades deterioran estas capacidades de forma medible.';
    } else if (questionText.includes('peatón')) {
        return 'Los peatones son usuarios vulnerables porque no tienen ninguna protección: un impacto a 50 km/h tiene 80% de probabilidad de ser mortal para ellos, mientras que a 30 km/h baja a 10%. Cederles el paso les permite cruzar sin tener que calcular velocidades o distancias, lo cual es especialmente importante para niños, personas mayores o con discapacidades que pueden moverse más lento o tener menor visión. Cuando un peatón inicia el cruce confiando en que le cederás el paso, si no lo haces, puede quedarse paralizado a mitad del paso, creando una situación aún más peligrosa.';
    } else if (questionText.includes('distancia')) {
        return 'Mantener distancia de seguridad te da el espacio y tiempo necesarios para reaccionar y frenar completamente. Tu distancia debe cubrir dos factores: tiempo de reacción (el segundo que tardas en ver el peligro y pisar el freno) más distancia de frenado (los metros que tu coche necesita para detenerse). A 100 km/h, solo el tiempo de reacción consume 28 metros. Si vas demasiado cerca, cuando el de adelante frene de golpe, colisionarás antes de que tu pie llegue al pedal. En lluvia o niebla, tu distancia de frenado puede duplicarse porque los neumáticos tienen menos agarre.';
    } else if (questionText.includes('curva')) {
        return 'Las curvas requieren velocidad reducida por física básica: tu vehículo tiene inercia que quiere seguir recto, y los neumáticos deben proporcionar la fuerza lateral para mantener la curva. A mayor velocidad, más fuerza necesitan ejercer. Si vas demasiado rápido, los neumáticos pierden agarre y el coche sigue recto en lugar de girar, sacándote de la vía. Esto se agrava con lluvia, gravilla o hielo. Además, en curvas tu visibilidad se reduce porque no ves qué hay más adelante, podría haber un obstáculo, vehículo lento o animal.';
    } else if (questionText.includes('placa') && questionText.includes('l')) {
        return 'Es más seguro colocar la placa "L" en la parte posterior derecha porque maximiza la visibilidad para los conductores que vienen detrás. Cuando ven que eres conductor novel, pueden anticipar que puedas realizar maniobras más lentas, dudosas o con errores (cambios de carril tardíos, frenadas bruscas, arranques lentos). Esta información les permite mantener mayor distancia de seguridad, tener más paciencia, y evitar adelantamientos arriesgados. Es como una comunicación preventiva que reduce las probabilidades de colisión por alcance o situaciones de estrés mutuo.';
    } else if (questionText.includes('luz') || questionText.includes('alumbrado')) {
        return 'El uso correcto de luces te hace visible y te permite ver. Las luces no solo iluminan lo que tienes delante, sino que comunican tu presencia, tamaño y dirección a otros. En niebla, lluvia o de noche, sin luces eres prácticamente invisible hasta estar a pocos metros. Un vehículo sin luces en una rotonda puede causar que otro conductor entre pensando que está libre, provocando colisión. Las luces largas en ciudad o con tráfico de frente deslumbran a otros conductores, dejándolos temporalmente ciegos y sin control.';
    } else {
        return `Esta respuesta es más segura porque previene situaciones de riesgo. Cuando sigues esta norma, reduces las probabilidades de colisión y proteges tanto a ti como a otros usuarios de la vía. La lógica detrás es crear comportamientos predecibles que todos los conductores puedan anticipar, evitando así reacciones de último momento o decisiones improvisadas que suelen terminar en accidentes.`;
    }
}

// Genera explicación de por qué las otras opciones son incorrectas
function generateWrongReasoning(questionText, answers, correctIndex) {
    const wrongAnswers = answers.filter((_, idx) => idx !== correctIndex);
    
    if (questionText.includes('arcén')) {
        return 'Ocupar el arcén sin emergencia bloquea la única vía de escape disponible. Cuando alguien tiene una avería real, se ve forzado a quedarse en el carril de circulación, expuesto a ser golpeado por detrás. Los vehículos de emergencia que necesitan pasar quedan atrapados en el tráfico, retrasando su llegada a accidentes donde cada segundo cuenta. Además, crear una situación donde se normaliza usar el arcén confunde a otros conductores sobre cuándo es realmente aceptable, erosionando la cultura de seguridad.';
    } else if (questionText.includes('chaleco')) {
        return 'Si el chaleco está en el maletero, tienes que caminar por detrás del vehículo, de espaldas al tráfico, sin protección visible. Los conductores que circulan a 100 km/h pueden no verte hasta que es tarde porque tu ropa oscura se mimetiza con el entorno. Una vez golpeado, las lesiones suelen ser mortales. Sin chaleco directamente, ni siquiera tienes la opción de protegerte, quedando completamente vulnerable ante cualquier emergencia.';
    } else if (questionText.includes('adelant')) {
        return 'Adelantar sin visibilidad completa es jugar a la ruleta rusa: puede que no venga nadie, o puede que haya un vehículo que aparece en el último segundo, sin tiempo para volver a tu carril. El resultado es una colisión frontal a velocidad combinada (tu velocidad + la suya), frecuentemente mortal. Adelantar sin espacio suficiente obliga al vehículo adelantado a frenar bruscamente, pudiendo hacer que pierda control o sea golpeado por quien viene detrás de él. Sin señalizar, otro conductor puede intentar adelantar al mismo tiempo, creando una situación caótica donde tres vehículos compiten por el mismo espacio.';
    } else if (questionText.includes('alcohol')) {
        return 'Creer que "un poco de alcohol" es seguro ignora que el deterioro comienza con la primera gota. Puedes sentirte bien, pero tus reflejos ya están comprometidos. Cuando un niño cruza inesperadamente, esos 0.8 segundos extras de reacción son la diferencia entre frenar a tiempo o atropellarlo. Las opciones que minimizan el riesgo del alcohol llevan a conducir bajo sus efectos, multiplicando las probabilidades de accidentes graves. Además, el alcohol reduce tu percepción de riesgo, haciéndote creer que conduces bien cuando objetivamente no es así.';
    } else if (questionText.includes('peatón')) {
        return 'No ceder el paso a peatones los pone en peligro mortal directo. Un peatón que ha comenzado a cruzar confiando en que vas a parar puede quedarse paralizado a mitad del paso si no frenas, sin tiempo para volver atrás ni para avanzar. Los peatones no pueden calcular tu velocidad con precisión, especialmente niños o personas mayores. Si dudas y aceleras en lugar de ceder, el peatón puede decidir cruzar al mismo tiempo, causando un atropello evitable.';
    } else if (questionText.includes('distancia')) {
        return 'Circular demasiado cerca del vehículo de adelante elimina tu margen de seguridad. Cuando ese conductor frena de emergencia (por un niño, animal u otro obstáculo), tú colisionas inevitablemente porque físicamente no puedes detenerte a tiempo. Las lesiones por alcance suelen afectar el cuello (latigazo cervical) y pueden ser permanentes. Además, estar muy cerca reduce tu campo visual: no ves qué pasa más adelante en el tráfico, perdiendo información crítica para anticipar peligros.';
    } else if (questionText.includes('curva')) {
        return 'Tomar curvas a velocidad excesiva hace que pierdas control por las leyes de física. La fuerza centrífuga empuja tu vehículo hacia fuera de la curva, y si supera el agarre de los neumáticos, el coche derrapa hacia el exterior. Esto puede sacarte de la vía, haciéndote impactar contra árboles, barreras o precipicios. En curvas hacia la izquierda, podrías invadir el carril contrario y colisionar frontalmente. Frenar dentro de la curva empeora la situación, pudiendo hacer que el coche gire sobre sí mismo (trompo).';
    } else if (questionText.includes('placa') && questionText.includes('l')) {
        return 'Colocar la placa "L" en otro lugar reduce su efectividad. Si va en la parte delantera, los conductores detrás de ti no la ven hasta que te adelantan, perdiendo la información cuando más la necesitan (al seguirte). Esto puede llevarles a presionarte con luces o acercarse demasiado, generando estrés y aumentando las probabilidades de que cometas errores. Sin la placa visible, otros esperan que conduzcas con fluidez y experiencia, y tus vacilaciones se convierten en sorpresas que pueden causar alcances o maniobras bruscas.';
    } else if (questionText.includes('luz') || questionText.includes('alumbrado')) {
        return 'Circular sin luces cuando son necesarias te hace invisible para otros conductores. En situaciones de baja visibilidad (niebla, lluvia, túneles, noche), pueden no verte hasta estar a metros de distancia, sin tiempo para reaccionar. Usar luces largas cuando no corresponde deslumbra a los conductores que vienen de frente, dejándolos temporalmente ciegos: no ven el carril, obstáculos ni peatones. Este deslumbramiento puede durar varios segundos después de que pases, creando un período peligroso donde circulan sin control visual.';
    } else if (questionText.includes('intersección') || questionText.includes('cruce')) {
        return 'No respetar la prioridad en intersecciones crea colisiones laterales (impactos en ángulo), que son muy peligrosas porque los laterales del coche tienen menos protección que el frente o la parte trasera. Los pasajeros en los asientos laterales quedan especialmente vulnerables. La indecisión sobre quién tiene prioridad lleva a arranques y paradas bruscas, aumentando el riesgo de alcances traseros. Además, otros conductores pueden confiar en que respetarás la prioridad y no esperan que avances, eliminando su capacidad de reacción.';
    } else {
        return 'Las otras opciones crean situaciones de riesgo innecesarias donde las consecuencias pueden ser graves. Generalmente aumentan las probabilidades de colisión, reducen el tiempo de reacción disponible, o exponen a usuarios vulnerables a peligros evitables. Seguir esas opciones compromete no solo tu seguridad, sino también la de pasajeros, peatones y otros conductores que confían en que todos respetan las normas de seguridad básicas.';
    }
}

// Genera el detalle clave a identificar en la pregunta
function generateKeyDetail(questionText, category) {
    if (questionText.includes('autopista') || questionText.includes('autovía')) {
        return 'Identifica el <strong>tipo de vía</strong> porque determina la velocidad segura: autopista (120 km/h con separación física de sentidos), autovía (120 km/h), carretera convencional (90 km/h, un carril por sentido), o travesía (50 km/h, zona urbana con peatones).';
    } else if (questionText.includes('intersección') || questionText.includes('cruce')) {
        return 'Busca <strong>señalización</strong> primero (señal de STOP, ceda el paso, semáforo). Si no hay ninguna, aplica la regla de prioridad a la derecha. La presencia o ausencia de señales cambia completamente quién debe ceder.';
    } else if (questionText.includes('adelant')) {
        return 'Verifica TRES condiciones simultáneas: <strong>visibilidad</strong> (¿ves al menos 200m despejados?), <strong>línea de la calzada</strong> (continua = prohibido adelantar), y <strong>espacio</strong> (¿puedes completar la maniobra sin forzar a otros a frenar?). Las tres deben cumplirse.';
    } else if (questionText.includes('distancia')) {
        return 'Considera la <strong>relación velocidad + condiciones meteorológicas</strong>: a mayor velocidad o peores condiciones (lluvia, niebla, hielo), necesitas más distancia porque tu capacidad de frenado se reduce exponencialmente.';
    } else if (questionText.includes('peatón')) {
        return 'Localiza si hay <strong>paso de peatones señalizado</strong> y si el peatón <strong>ha iniciado el cruce</strong> o está esperando. Si ha dado un solo paso hacia la calzada, tienes obligación de ceder, incluso si el semáforo está en ámbar.';
    } else if (questionText.includes('curva')) {
        return 'Evalúa la <strong>señalización de la curva</strong> (curva peligrosa con señal triangular) y las <strong>condiciones del asfalto</strong>. Las curvas con señal requieren reducir velocidad significativamente antes de entrar, no durante.';
    } else if (questionText.includes('luz') || questionText.includes('alumbrado')) {
        return 'Identifica <strong>tres factores</strong>: hora del día (noche obligatorio), condiciones meteorológicas (lluvia/niebla reducen visibilidad), y tipo de vía (túneles siempre requieren luces, incluso de día).';
    } else if (questionText.includes('placa') && questionText.includes('l')) {
        return 'La clave está en <strong>quién necesita ver la información</strong>: los conductores que vienen detrás son quienes más se benefician de saber que eres novel, por eso la placa va en la parte posterior derecha.';
    } else {
        return `Identifica <strong>palabras clave</strong> en el enunciado que indiquen restricciones ("prohibido", "obligatorio"), condiciones especiales ("en caso de"), o usuarios vulnerables ("peatón", "ciclista", "niño"). Estas palabras suelen señalar la respuesta correcta.`;
    }
}

// Genera la normativa aplicable con artículos específicos (solo como referencia)
function generateNormative(questionText, category) {
    if (questionText.includes('arcén')) {
        return '<em>Referencia legal:</em> <strong>Art. 49 RGC</strong> (Real Decreto 1428/2003) sobre uso del arcén. Revisado en Enero 2024. Solo para emergencias.';
    } else if (questionText.includes('chaleco')) {
        return '<em>Referencia legal:</em> <strong>Art. 118 RGC</strong> (RD 1428/2003) sobre señalización de vehículos inmovilizados. Última actualización: Marzo 2023. Un chaleco en habitáculo.';
    } else if (questionText.includes('velocidad') && questionText.includes('autopista')) {
        return '<em>Referencia legal:</em> <strong>Art. 48-50 RGC</strong> (RD 1428/2003). Límites vigentes desde 2022: autopista/autovía 120 km/h, carretera convencional 90 km/h, zona urbana/travesía 50 km/h.';
    } else if (questionText.includes('adelant')) {
        return '<em>Referencia legal:</em> <strong>Art. 36 RGC</strong> (RD 1428/2003) sobre adelantamientos. Revisión 2021: prohibido sin visibilidad suficiente y con línea continua.';
    } else if (questionText.includes('intersección') || questionText.includes('cruce')) {
        return '<em>Referencia legal:</em> <strong>Art. 25 RGC</strong> (RD 1428/2003) sobre prioridad de paso. Norma general: ceder a la derecha en intersecciones sin señalizar. Vigente desde 2003.';
    } else if (questionText.includes('alcohol')) {
        return '<em>Referencia legal:</em> <strong>Art. 20-21 RGC + Art. 383 Código Penal</strong>. Límite administrativo: 0.25 mg/l aire (0.5 g/l sangre). Delito penal a partir de 0.60 mg/l. Reforma 2024.';
    } else if (questionText.includes('peatón')) {
        return '<em>Referencia legal:</em> <strong>Art. 25-26 RGC</strong> (RD 1428/2003) sobre protección de peatones. Prioridad absoluta en pasos señalizados. Actualización 2023.';
    } else if (questionText.includes('distancia')) {
        return '<em>Referencia legal:</em> <strong>Art. 54 RGC</strong> (RD 1428/2003) sobre separación entre vehículos. Criterio: distancia suficiente para poder detenerse sin colisión. Actualizado 2022.';
    } else if (questionText.includes('neumático')) {
        return '<em>Referencia legal:</em> <strong>Art. 23 RGC</strong> (RD 1428/2003) sobre estado del vehículo. Los neumáticos deben tener profundidad mínima de 1.6mm en toda la banda de rodadura. Vigente desde 2010.';
    } else if (questionText.includes('curva')) {
        return '<em>Referencia legal:</em> <strong>Art. 46 RGC</strong> (RD 1428/2003) sobre velocidad adecuada a las circunstancias. En curvas señalizadas, reducir velocidad. Actualizado 2015.';
    } else if (questionText.includes('luz') || questionText.includes('alumbrado')) {
        return '<em>Referencia legal:</em> <strong>Art. 43-44 RGC</strong> (RD 1428/2003) sobre alumbrado. Obligatorio desde el ocaso hasta el amanecer, y en condiciones de baja visibilidad. Reforma 2021.';
    } else if (questionText.includes('placa') && questionText.includes('l')) {
        return '<em>Referencia legal:</em> <strong>Art. 13.3 RGC</strong> (RD 1428/2003). Conductores noveles deben colocar placa "L" en parte posterior derecha durante el primer año. Vigente desde 2003.';
    } else {
        return '<em>Referencia legal:</em> <strong>Reglamento General de Circulación</strong> (Real Decreto 1428/2003, modificado por RD 965/2006 y sucesivas actualizaciones hasta 2026). La normativa refleja principios de seguridad vial basados en evidencia.';
    }
}

// ============================================
// GLOSSARY - Simple geometric shapes
// ============================================

function showGlossary() {
    showView('glossaryView');
    loadGlossary();
}

function loadGlossary() {
    const glossaryTerms = [
        {
            term: 'Calzada',
            definition: 'Parte de la carretera destinada a la circulación de vehículos. No incluye el arcén ni la acera.',
            icon: '🛣️',
            svg: createRoadSituation()
        },
        {
            term: 'Arcén',
            definition: 'Franja longitudinal de la carretera, contigua a la calzada, NO destinada al tránsito de vehículos.',
            icon: '↔️',
            svg: createRoadShoulderSituation()
        },
        {
            term: 'Carril',
            definition: 'Banda longitudinal en que puede estar dividida la calzada, delimitada o no por marcas viales.',
            icon: '🚗',
            svg: createRoadMarkings()
        },
        {
            term: 'Intersección',
            definition: 'Zona donde se cruzan o unen dos o más vías. Incluye rotondas y cruces.',
            icon: '✖️',
            svg: createIntersectionSituation()
        },
        {
            term: 'Prioridad',
            definition: 'Derecho del conductor a pasar antes que otro vehículo en una intersección o situación de tráfico.',
            icon: '⚠️',
            svg: createYieldSign()
        },
        {
            term: 'Estacionamiento',
            definition: 'Inmovilización del vehículo que no es una detención ni una parada. Puede ser prolongada.',
            icon: '🅿️',
            svg: createParkingSituation()
        }
    ];
    
    const container = document.getElementById('glossaryGrid');
    container.innerHTML = '';
    
    glossaryTerms.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glossary-card glass-card';
        card.innerHTML = `
            <div class="glossary-icon">${item.icon}</div>
            <h3 class="glossary-term">${item.term}</h3>
            <p class="glossary-definition">${item.definition}</p>
            <div class="glossary-illustration">${item.svg}</div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// USER STATS
// ============================================

function loadUserStats() {
    const saved = localStorage.getItem('carnetBStats');
    if (saved) {
        userStats = JSON.parse(saved);
    }
    
    // Asegurar estructura correcta
    if (!userStats.questionHistory) {
        userStats.questionHistory = {};
    }
}

function saveUserStats() {
    localStorage.setItem('carnetBStats', JSON.stringify(userStats));
}

function updateHomeStats() {
    document.getElementById('totalQuestions').textContent = questionsData.length;
    document.getElementById('completedQuestions').textContent = userStats.totalAnswered;
    
    // Calcular temas débiles
    const weakCategories = getWeakCategories();
    document.getElementById('weakTopics').textContent = weakCategories.length;
    
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
        document.getElementById('dailySessionTime').textContent = `~${minutes} minutos`;
        
        // Contar pendientes
        const pendingReviews = getPendingReviewQuestions();
        const doubtedQuestions = getDoubtedQuestions();
        
        let description = '';
        if (pendingReviews.length > 0) {
            description = `${pendingReviews.length} errores pendientes de repasar`;
        }
        if (doubtedQuestions.length > 0) {
            if (description) description += ' · ';
            description += `${doubtedQuestions.length} preguntas dudadas`;
        }
        if (!description) {
            description = 'Mezcla de repaso y preguntas nuevas';
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

// Initialize feedback system
document.addEventListener('DOMContentLoaded', () => {
    // Menu button in test view
    const menuButton = document.getElementById('questionMenuButton');
    if (menuButton) {
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFeedbackMenu();
        });
    }
    
    // Menu items
    const menuItems = document.querySelectorAll('.feedback-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            handleFeedbackAction(action);
        });
    });
    
    // Photo modal
    document.getElementById('selectPhotoBtn')?.addEventListener('click', selectPhoto);
    document.getElementById('cancelPhotoBtn')?.addEventListener('click', closePhotoModal);
    document.getElementById('submitPhotoBtn')?.addEventListener('click', submitPhoto);
    document.getElementById('photoInput')?.addEventListener('change', handlePhotoSelect);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('feedbackMenu');
        const menuButton = document.getElementById('questionMenuButton');
        if (!menu?.contains(e.target) && e.target !== menuButton) {
            closeFeedbackMenu();
        }
    });
    
    // Close modal when clicking backdrop
    document.getElementById('photoModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'photoModal') {
            closePhotoModal();
        }
    });
});

function toggleFeedbackMenu() {
    const menu = document.getElementById('feedbackMenu');
    const question = currentTest[currentQuestionIndex];
    
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
        showToast('✓ Reporte enviado. Gracias por ayudarnos a mejorar.');
    } else {
        saveFeedback(type, question, userNote);
        showToast('✓ Reporte enviado. Gracias por ayudarnos a mejorar.');
    }
    
    currentLibraryQuestion = null;
}

function handleSuggestion() {
    const question = currentLibraryQuestion || currentTest[currentQuestionIndex];
    const suggestion = prompt('Tu sugerencia:');
    
    if (suggestion && suggestion.trim()) {
        saveFeedback('suggestion', question, suggestion);
        showToast('✓ Sugerencia enviada. ¡Gracias!');
    }
    
    currentLibraryQuestion = null;
}

function saveFeedback(type, question, userNote, photoData = null) {
    const feedback = {
        questionId: question.id,
        type: type,
        timestamp: Date.now(),
        questionText: question.question,
        userNote: userNote,
        photo: photoData
    };
    
    const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    allFeedback.push(feedback);
    localStorage.setItem('userFeedback', JSON.stringify(allFeedback));
    
    console.log('📝 Feedback guardado:', feedback);
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
        showToast('⚠️ La foto es demasiado grande (máx 5MB)');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showToast('⚠️ Solo se permiten imágenes');
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

function submitPhoto() {
    if (!selectedPhoto) return;
    
    const question = currentLibraryQuestion || currentTest[currentQuestionIndex];
    const note = prompt('Descripción de la evidencia (opcional):');
    
    saveFeedback('photo_evidence', question, note || 'Evidencia adjunta', selectedPhoto);
    showToast('✓ Foto enviada. ¡Gracias!');
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
