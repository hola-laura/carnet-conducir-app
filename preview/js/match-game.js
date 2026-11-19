// Drivo Match: desliza a la derecha si es verdadero, a la izquierda si es falso.
// Las señales se dibujan en SVG (viewBox 0 0 200 200), con los colores oficiales.

const SIGN_RED = '#d22630';
const SIGN_BLUE = '#1f5fbf';
const SIGN_INK = '#141414';

const signShapes = {
    prohib: (inner) => `<circle cx="100" cy="100" r="86" fill="#fff" stroke="${SIGN_RED}" stroke-width="20"/>${inner}`,
    blue: (inner) => `<circle cx="100" cy="100" r="92" fill="${SIGN_BLUE}" stroke="#fff" stroke-width="4"/>${inner}`,
    tri: (inner) => `<path d="M100 22 L184 168 L16 168 Z" fill="#fff" stroke="${SIGN_RED}" stroke-width="16" stroke-linejoin="round"/>${inner}`,
    square: (inner) => `<rect x="14" y="14" width="172" height="172" rx="14" fill="${SIGN_BLUE}" stroke="#fff" stroke-width="5"/>${inner}`
};

const arrowUp = (x, y, h, color = '#fff', w = 22) =>
    `<path d="M${x} ${y} L${x + 26} ${y + 30} L${x + w / 2 + 2} ${y + 30} L${x + w / 2 + 2} ${y + h} L${x - w / 2 - 2} ${y + h} L${x - w / 2 - 2} ${y + 30} L${x - 26} ${y + 30} Z" fill="${color}"/>`;

const SIGNS = {
    stop: `<path d="M71 10 H129 L190 71 V129 L129 190 H71 L10 129 V71 Z" fill="${SIGN_RED}" stroke="#fff" stroke-width="6"/>
           <text x="100" y="118" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="56" fill="#fff" letter-spacing="1">STOP</text>`,
    ceda: `<path d="M16 34 L184 34 L100 180 Z" fill="#fff" stroke="${SIGN_RED}" stroke-width="18" stroke-linejoin="round"/>`,
    entradaProhibida: `<circle cx="100" cy="100" r="92" fill="${SIGN_RED}"/><rect x="34" y="84" width="132" height="32" rx="3" fill="#fff"/>`,
    circulacionProhibida: signShapes.prohib(''),
    adelantamientoProhibido: signShapes.prohib(`
        <g transform="translate(40 82)"><path d="M4 30 Q2 18 12 16 L18 4 Q20 0 26 0 H44 Q50 0 52 4 L58 16 Q66 18 64 30 V36 H4 Z" fill="${SIGN_RED}"/><rect x="8" y="34" width="12" height="8" rx="2" fill="${SIGN_RED}"/><rect x="48" y="34" width="12" height="8" rx="2" fill="${SIGN_RED}"/></g>
        <g transform="translate(94 82)"><path d="M4 30 Q2 18 12 16 L18 4 Q20 0 26 0 H44 Q50 0 52 4 L58 16 Q66 18 64 30 V36 H4 Z" fill="${SIGN_INK}"/><rect x="8" y="34" width="12" height="8" rx="2" fill="${SIGN_INK}"/><rect x="48" y="34" width="12" height="8" rx="2" fill="${SIGN_INK}"/></g>`),
    velocidad50: signShapes.prohib(`<text x="100" y="124" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="72" fill="${SIGN_INK}">50</text>`),
    finProhibiciones: `<circle cx="100" cy="100" r="90" fill="#fff" stroke="#9a9a9a" stroke-width="3"/>
        <clipPath id="fp"><circle cx="100" cy="100" r="88"/></clipPath>
        <g clip-path="url(#fp)" stroke="${SIGN_INK}" stroke-width="7">
            <line x1="40" y1="190" x2="190" y2="40"/><line x1="26" y1="174" x2="174" y2="26"/><line x1="10" y1="160" x2="160" y2="10"/>
            <line x1="56" y1="204" x2="204" y2="56"/><line x1="-4" y1="146" x2="146" y2="-4"/></g>`,
    rectoObligatorio: signShapes.blue(arrowUp(100, 38, 126)),
    giroIzquierdaProhibido: signShapes.prohib(`
        <path d="M118 158 V96 Q118 76 98 76 H74" fill="none" stroke="${SIGN_INK}" stroke-width="18"/>
        <path d="M50 76 L80 52 L80 100 Z" fill="${SIGN_INK}"/>
        <line x1="44" y1="44" x2="156" y2="156" stroke="${SIGN_RED}" stroke-width="16"/>`),
    estacionamientoProhibido: `<circle cx="100" cy="100" r="86" fill="${SIGN_BLUE}" stroke="${SIGN_RED}" stroke-width="20"/>
        <line x1="40" y1="40" x2="160" y2="160" stroke="${SIGN_RED}" stroke-width="20"/>`,
    paradaProhibida: `<circle cx="100" cy="100" r="86" fill="${SIGN_BLUE}" stroke="${SIGN_RED}" stroke-width="20"/>
        <line x1="40" y1="40" x2="160" y2="160" stroke="${SIGN_RED}" stroke-width="20"/>
        <line x1="160" y1="40" x2="40" y2="160" stroke="${SIGN_RED}" stroke-width="20"/>`,
    interseccionPrioridad: signShapes.tri(`<rect x="91" y="72" width="18" height="78" fill="${SIGN_INK}"/><rect x="66" y="106" width="68" height="9" fill="${SIGN_INK}"/>`),
    prioridadDerecha: signShapes.tri(`<g stroke="${SIGN_INK}" stroke-width="14" stroke-linecap="butt"><line x1="74" y1="86" x2="126" y2="146"/><line x1="126" y1="86" x2="74" y2="146"/></g>`),
    curvaDerecha: signShapes.tri(`<path d="M86 152 V112 Q86 92 104 88" fill="none" stroke="${SIGN_INK}" stroke-width="15"/><path d="M98 70 L128 88 L98 106 Z" fill="${SIGN_INK}"/>`),
    semaforos: signShapes.tri(`<rect x="84" y="66" width="32" height="88" rx="8" fill="${SIGN_INK}"/>
        <circle cx="100" cy="82" r="9" fill="${SIGN_RED}"/><circle cx="100" cy="110" r="9" fill="#f4b400"/><circle cx="100" cy="138" r="9" fill="#2e9a4b"/>`),
    sentidoUnico: signShapes.square(arrowUp(100, 34, 134)),
    velocidadMinima60: signShapes.blue(`<text x="100" y="124" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="72" fill="#fff">60</text>`),
    clasonProhibido: signShapes.prohib(`
        <path d="M54 88 H80 L130 64 V136 L80 112 H54 Z" fill="${SIGN_INK}"/>
        <path d="M138 80 Q150 100 138 120" fill="none" stroke="${SIGN_INK}" stroke-width="7" stroke-linecap="round"/>
        <line x1="44" y1="44" x2="156" y2="156" stroke="${SIGN_RED}" stroke-width="16"/>`),
    calzadaPrioridad: `<rect x="34" y="34" width="132" height="132" fill="#fff" stroke="${SIGN_INK}" stroke-width="3" transform="rotate(45 100 100)"/>
        <rect x="58" y="58" width="84" height="84" fill="#f4c20d" transform="rotate(45 100 100)"/>`,
    glorieta: signShapes.blue(`
        <g fill="none" stroke="#fff" stroke-width="14" stroke-linecap="butt">
            <path d="M100 56 A44 44 0 0 1 138 78"/>
            <path d="M138 122 A44 44 0 0 1 100 144"/>
            <path d="M62 122 A44 44 0 0 1 62 78"/>
        </g>
        <g fill="#fff">
            <path d="M150 64 L150 98 L120 82 Z"/>
            <path d="M86 156 L118 140 L118 170 Z" transform="rotate(0)"/>
            <path d="M44 86 L74 70 L72 104 Z"/>
        </g>`),
    estrechamientoDerecha: signShapes.tri(`<path d="M80 154 V72" stroke="${SIGN_INK}" stroke-width="12"/><path d="M122 154 V118 Q122 104 110 98 V72" fill="none" stroke="${SIGN_INK}" stroke-width="12"/>`),
    alturaMaxima: signShapes.prohib(`
        <path d="M100 30 L88 50 H112 Z" fill="${SIGN_INK}"/><path d="M100 170 L88 150 H112 Z" fill="${SIGN_INK}"/>
        <text x="100" y="118" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="50" fill="${SIGN_INK}">3,5m</text>`)
};

// [sign, statement, isTrue, why]
const MATCH_CARDS = [
    ['stop', 'Te obliga a detenerte siempre, aunque no venga nadie.', true, 'En un STOP hay que parar por completo en la línea, venga o no venga alguien.'],
    ['stop', 'Solo tienes que parar si viene algún vehículo.', false, 'Eso es el ceda el paso. En un STOP hay que detenerse siempre.'],
    ['stop', 'Después de parar, cedes el paso a los que vienen por los dos lados.', true, 'Tras detenerte, tienes que dejar pasar a los que circulan por la vía, vengan por la izquierda o por la derecha.'],
    ['ceda', 'Solo tienes que parar si viene alguien al que debas dejar pasar.', true, 'El ceda el paso no obliga a detenerse si la vía está libre.'],
    ['ceda', 'Te obliga a detenerte siempre en la línea.', false, 'Eso lo exige el STOP. Con el ceda el paso, si no viene nadie, sigues.'],
    ['entradaProhibida', 'Ningún vehículo puede entrar por esa vía.', true, 'Es la señal de entrada prohibida: suele indicar que por ahí vienen de frente.'],
    ['entradaProhibida', 'Los ciclomotores sí pueden entrar.', false, 'La entrada prohibida afecta a todos los vehículos, también a ciclomotores y bicis.'],
    ['circulacionProhibida', 'Prohíbe circular a todos los vehículos en los dos sentidos.', true, 'El círculo blanco con borde rojo y sin nada dentro es circulación prohibida.'],
    ['circulacionProhibida', 'Solo prohíbe estacionar.', false, 'La de estacionamiento prohibido es azul con una franja roja. Esta prohíbe circular.'],
    ['adelantamientoProhibido', 'Puedes adelantar a una moto o a una bici si es seguro.', true, 'Esta señal prohíbe adelantar a vehículos de motor, salvo los de dos ruedas.'],
    ['adelantamientoProhibido', 'Puedes adelantar a un turismo si va muy despacio.', false, 'Mientras dure la prohibición no puedes adelantar a turismos, vayan como vayan.'],
    ['velocidad50', 'Desde esta señal no puedes pasar de 50 km/h.', true, 'Las señales redondas con borde rojo y una cifra marcan una velocidad máxima obligatoria.'],
    ['velocidad50', 'Es una velocidad recomendada, no obligatoria.', false, 'Las recomendadas van en señales cuadradas azules. Esta es un máximo obligatorio.'],
    ['finProhibiciones', 'Indica el final de las prohibiciones señalizadas antes.', true, 'Las franjas diagonales negras anulan las restricciones anteriores, como límites o prohibición de adelantar.'],
    ['finProhibiciones', 'Indica el final de la autopista.', false, 'El fin de autopista es una señal azul cuadrada. Esta es fin de prohibiciones.'],
    ['rectoObligatorio', 'Solo puedes seguir de frente.', true, 'Las señales azules redondas obligan: aquí, a seguir recto.'],
    ['rectoObligatorio', 'Solo te informa de que la vía sigue recta.', false, 'Las azules redondas son de obligación, no de información.'],
    ['giroIzquierdaProhibido', 'Prohíbe girar a la izquierda.', true, 'La flecha hacia la izquierda tachada prohíbe ese giro.'],
    ['giroIzquierdaProhibido', 'Prohíbe girar a la derecha.', false, 'La flecha tachada apunta a la izquierda, así que solo prohíbe ese giro.'],
    ['estacionamientoProhibido', 'Prohíbe estacionar, pero puedes parar un momento.', true, 'Una sola franja roja prohíbe estacionar. Parar sí está permitido.'],
    ['estacionamientoProhibido', 'Prohíbe parar y estacionar.', false, 'Para prohibir también la parada, la señal lleva un aspa roja, no una sola franja.'],
    ['paradaProhibida', 'No puedes ni parar ni estacionar.', true, 'El aspa roja sobre fondo azul prohíbe parar y estacionar.'],
    ['paradaProhibida', 'Puedes parar si es menos de dos minutos.', false, 'Con el aspa no se puede parar, ni siquiera un momento.'],
    ['interseccionPrioridad', 'Tienes prioridad en el próximo cruce.', true, 'La línea gruesa vertical es tu vía: tienes preferencia sobre la transversal.'],
    ['interseccionPrioridad', 'Debes ceder el paso a los que vengan por la derecha.', false, 'Eso sería la señal con el aspa. Esta te da prioridad.'],
    ['prioridadDerecha', 'Tienes que ceder el paso a los que vengan por tu derecha.', true, 'El aspa avisa de un cruce sin prioridad señalizada: se cede a la derecha.'],
    ['prioridadDerecha', 'Tienes prioridad en ese cruce.', false, 'Con esta señal no tienes prioridad: rige la norma de ceder a la derecha.'],
    ['curvaDerecha', 'Avisa de una curva peligrosa hacia la derecha.', true, 'La flecha curvada indica hacia dónde gira la curva.'],
    ['curvaDerecha', 'Avisa de una curva peligrosa hacia la izquierda.', false, 'La flecha gira hacia la derecha.'],
    ['semaforos', 'Avisa de que hay un semáforo más adelante.', true, 'Es una señal de peligro: te prepara para un semáforo que quizá no ves aún.'],
    ['semaforos', 'Te obliga a detenerte.', false, 'Es solo un aviso. Lo que tienes que obedecer es el semáforo cuando llegues.'],
    ['sentidoUnico', 'Indica una calle de sentido único hacia donde apunta la flecha.', true, 'La señal azul cuadrada con la flecha informa de que todos circulan en ese sentido.'],
    ['sentidoUnico', 'Te prohíbe girar en el próximo cruce.', false, 'Solo informa del sentido de la calle. Puedes girar si nada lo prohíbe.'],
    ['velocidadMinima60', 'Tienes que ir al menos a 60 km/h, si las condiciones lo permiten.', true, 'Una cifra blanca sobre círculo azul es una velocidad mínima obligatoria.'],
    ['velocidadMinima60', 'No puedes pasar de 60 km/h.', false, 'El máximo va en círculo con borde rojo. El azul marca el mínimo.'],
    ['clasonProhibido', 'Prohíbe tocar el claxon, salvo para evitar un accidente.', true, 'Es la señal de advertencias acústicas prohibidas, con esa única excepción.'],
    ['clasonProhibido', 'Prohíbe el claxon incluso para evitar un accidente.', false, 'Evitar un accidente es la excepción: entonces sí puedes usarlo.'],
    ['calzadaPrioridad', 'Tienes prioridad en las intersecciones de esta vía.', true, 'El rombo amarillo indica calzada con prioridad hasta que aparezca su señal de fin.'],
    ['calzadaPrioridad', 'Avisa de una zona de obras.', false, 'Las obras se avisan con una señal triangular. El rombo amarillo es calzada con prioridad.'],
    ['glorieta', 'Te obliga a circular por la glorieta en el sentido de las flechas.', true, 'Se circula dejando el centro a la izquierda, en sentido contrario a las agujas del reloj.'],
    ['glorieta', 'Puedes rodear la glorieta por la izquierda si está vacía.', false, 'Siempre se rodea por la derecha, dejando el centro a tu izquierda.'],
    ['estrechamientoDerecha', 'La calzada se estrecha por la derecha.', true, 'La línea que se curva está a la derecha: ese lado es el que se estrecha.'],
    ['estrechamientoDerecha', 'La calzada se estrecha por los dos lados.', false, 'Si fuera por los dos lados, las dos líneas estarían curvadas.'],
    ['alturaMaxima', 'No pueden pasar vehículos de más de 3,5 m de alto, contando la carga.', true, 'Las flechas arriba y abajo indican altura máxima.'],
    ['alturaMaxima', 'Limita el ancho de los vehículos a 3,5 m.', false, 'El ancho se indica con las flechas a los lados. Esta es de altura.']
];

const MATCH_ROUND = 10;
let match = null;

function signSVG(key) {
    return `<svg viewBox="0 0 200 200" aria-hidden="true">${SIGNS[key]}</svg>`;
}

function shuffleCards(list) {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickRound() {
    // One card per sign per round, so you never see the same sign twice in a row.
    const seen = new Set();
    const out = [];
    for (const card of shuffleCards(MATCH_CARDS)) {
        if (seen.has(card[0])) continue;
        seen.add(card[0]);
        out.push(card);
        if (out.length === MATCH_ROUND) break;
    }
    return out;
}

function startMatch() {
    match = { cards: pickRound(), index: 0, correct: 0, locked: false };
    document.getElementById('matchResult').hidden = true;
    document.getElementById('matchFeedback').hidden = true;
    document.getElementById('matchPlay').hidden = false;
    renderMatchCard();
}

function renderMatchProgress() {
    const dots = document.getElementById('matchDots');
    dots.innerHTML = match.cards.map((_, i) => {
        const state = i < match.index ? (match.results?.[i] ? 'ok' : 'ko') : i === match.index ? 'now' : '';
        return `<span class="match-dot ${state}"></span>`;
    }).join('');
}

function renderMatchCard() {
    const stack = document.getElementById('matchStack');
    const [sign, text] = match.cards[match.index];
    const next = match.cards[match.index + 1];
    stack.innerHTML = `
        ${next ? `<div class="match-card is-behind" aria-hidden="true"><div class="match-sign">${signSVG(next[0])}</div></div>` : ''}
        <div class="match-card" id="matchCard">
            <span class="match-stamp yes">Verdadero</span>
            <span class="match-stamp no">Falso</span>
            <span class="prompt-label">¿Verdadero o falso?</span>
            <div class="match-sign">${signSVG(sign)}</div>
            <p class="prompt-answer match-text">${text}</p>
        </div>`;
    match.locked = false;
    renderMatchProgress();
    bindMatchDrag(document.getElementById('matchCard'));
}

function bindMatchDrag(card) {
    let startX = 0;
    let dx = 0;
    let dragging = false;
    const onMove = (e) => {
        if (!dragging) return;
        dx = e.clientX - startX;
        card.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
        card.style.setProperty('--yes', Math.max(0, Math.min(1, dx / 90)));
        card.style.setProperty('--no', Math.max(0, Math.min(1, -dx / 90)));
    };
    const onUp = () => {
        if (!dragging) return;
        dragging = false;
        card.classList.remove('is-dragging');
        if (Math.abs(dx) > 90) {
            answerMatch(dx > 0);
        } else {
            card.style.transform = '';
            card.style.setProperty('--yes', 0);
            card.style.setProperty('--no', 0);
        }
    };
    card.addEventListener('pointerdown', (e) => {
        if (match.locked) return;
        dragging = true;
        startX = e.clientX;
        dx = 0;
        card.classList.add('is-dragging');
        card.setPointerCapture(e.pointerId);
    });
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerup', onUp);
    card.addEventListener('pointercancel', onUp);
}

function answerMatch(saidTrue) {
    if (!match || match.locked) return;
    match.locked = true;
    const card = document.getElementById('matchCard');
    const [, , isTrue, why] = match.cards[match.index];
    const ok = saidTrue === isTrue;
    match.results = match.results || [];
    match.results[match.index] = ok;
    if (ok) match.correct++;

    card.classList.add(saidTrue ? 'fly-right' : 'fly-left');
    card.style.transform = '';

    if (ok) {
        const chip = document.getElementById('matchChip');
        chip.classList.remove('show');
        void chip.offsetWidth;
        chip.classList.add('show');
        setTimeout(nextMatchCard, 650);
    } else {
        const fb = document.getElementById('matchFeedback');
        document.getElementById('matchFeedbackTitle').textContent = isTrue ? 'Era verdadero' : 'Era falso';
        document.getElementById('matchFeedbackText').textContent = why;
        setTimeout(() => { fb.hidden = false; }, 280);
    }
}

function nextMatchCard() {
    document.getElementById('matchFeedback').hidden = true;
    match.index++;
    if (match.index >= match.cards.length) {
        finishMatch();
        return;
    }
    renderMatchCard();
}

function finishMatch() {
    renderMatchProgress();
    const xp = match.correct;
    userStats.gameXp = (userStats.gameXp || 0) + xp;
    userStats.matchBest = Math.max(userStats.matchBest || 0, match.correct);
    saveUserStats();
    if (typeof updateHomeStats === 'function') updateHomeStats();
    document.getElementById('matchPlay').hidden = true;
    document.getElementById('matchScore').textContent = `${match.correct}/${match.cards.length}`;
    document.getElementById('matchScoreSub').textContent = match.correct === match.cards.length
        ? `¡Ronda perfecta! +${xp} XP`
        : `+${xp} XP · Tu mejor ronda: ${userStats.matchBest}/${MATCH_ROUND}`;
    document.getElementById('matchResult').hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('matchNo')?.addEventListener('click', () => answerMatch(false));
    document.getElementById('matchYes')?.addEventListener('click', () => answerMatch(true));
    document.getElementById('matchContinue')?.addEventListener('click', nextMatchCard);
    document.getElementById('matchAgain')?.addEventListener('click', startMatch);
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('gameView')?.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') answerMatch(false);
        if (e.key === 'ArrowRight') answerMatch(true);
    });
});
