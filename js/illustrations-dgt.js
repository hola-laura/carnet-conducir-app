// ============================================
// COLORES OFICIALES DGT
// ============================================

const DGT_COLORS = {
    red: '#E30613',
    blue: '#003DA5',
    yellow: '#FFDE00',
    green: '#00A651',
    orange: '#FF6600',
    brown: '#8B4513',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#555555',
    road: '#3a3a3a',
    roadLine: '#FFD700'
};

// ============================================
// WRAPPER SVG CON DISEÑO ELEGANTE
// ============================================

function wrapSVG(svgContent) {
    return `
        <div style="display: flex; align-items: center; justify-content: center; padding: 32px; background: linear-gradient(135deg, rgba(217, 119, 87, 0.08) 0%, rgba(139, 154, 122, 0.08) 100%); border-radius: 24px; margin: 24px 0;">
            ${svgContent}
        </div>
    `;
}

// ============================================
// SEÑALES DE TRÁFICO DGT
// ============================================

// R5 - SEÑAL STOP
function createStopSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-stop" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <path d="M60,20 L140,20 L180,60 L180,140 L140,180 L60,180 L20,140 L20,60 Z" 
                  fill="${DGT_COLORS.red}" stroke="${DGT_COLORS.white}" stroke-width="6" filter="url(#shadow-stop)"/>
            <text x="100" y="115" font-size="48" fill="${DGT_COLORS.white}" 
                  font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif">STOP</text>
        </svg>
    `;
}

// R6 - CEDA EL PASO
function createYieldSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-yield" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <path d="M100,180 L20,40 L180,40 Z" 
                  fill="${DGT_COLORS.white}" stroke="${DGT_COLORS.red}" stroke-width="16" filter="url(#shadow-yield)"/>
        </svg>
    `;
}

// R306 - PROHIBIDO ADELANTAR
function createNoOvertakingSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-sign" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <circle cx="100" cy="100" r="80" fill="${DGT_COLORS.white}" 
                    stroke="${DGT_COLORS.red}" stroke-width="12" filter="url(#shadow-sign)"/>
            <rect x="55" y="80" width="30" height="40" rx="4" fill="${DGT_COLORS.red}"/>
            <rect x="115" y="80" width="30" height="40" rx="4" fill="${DGT_COLORS.black}"/>
            <path d="M90,100 L110,90 L110,110 Z" fill="${DGT_COLORS.red}"/>
        </svg>
    `;
}

// R301 - VELOCIDAD MÁXIMA
function createSpeedLimitSign(speed) {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-speed" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <circle cx="100" cy="100" r="80" fill="${DGT_COLORS.white}" 
                    stroke="${DGT_COLORS.red}" stroke-width="12" filter="url(#shadow-speed)"/>
            <text x="100" y="125" font-size="64" fill="${DGT_COLORS.black}" 
                  font-weight="bold" text-anchor="middle" font-family="Arial, sans-serif">${speed}</text>
        </svg>
    `;
}

// R101 - ENTRADA PROHIBIDA
function createNoEntrySign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-entry" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <circle cx="100" cy="100" r="80" fill="${DGT_COLORS.red}" 
                    stroke="${DGT_COLORS.white}" stroke-width="6" filter="url(#shadow-entry)"/>
            <rect x="40" y="90" width="120" height="20" rx="4" fill="${DGT_COLORS.white}"/>
        </svg>
    `;
}

// S13 - PASO DE PEATONES
function createPedestrianCrossingSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-ped" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <rect x="30" y="30" width="140" height="140" rx="8" fill="${DGT_COLORS.blue}" 
                  stroke="${DGT_COLORS.white}" stroke-width="6" filter="url(#shadow-ped)"/>
            <circle cx="100" cy="70" r="14" fill="${DGT_COLORS.white}"/>
            <rect x="90" y="88" width="20" height="35" rx="4" fill="${DGT_COLORS.white}"/>
            <rect x="88" y="95" width="10" height="30" rx="3" fill="${DGT_COLORS.white}" transform="rotate(-30 93 110)"/>
            <rect x="112" y="95" width="10" height="30" rx="3" fill="${DGT_COLORS.white}" transform="rotate(30 107 110)"/>
            <rect x="50" y="135" width="15" height="25" fill="${DGT_COLORS.white}"/>
            <rect x="75" y="135" width="15" height="25" fill="${DGT_COLORS.white}"/>
            <rect x="110" y="135" width="15" height="25" fill="${DGT_COLORS.white}"/>
            <rect x="135" y="135" width="15" height="25" fill="${DGT_COLORS.white}"/>
        </svg>
    `;
}

// P1 - CURVA PELIGROSA
function createDangerousCurveSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-curve" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <path d="M100,20 L180,170 L20,170 Z" fill="${DGT_COLORS.yellow}" 
                  stroke="${DGT_COLORS.red}" stroke-width="8" filter="url(#shadow-curve)"/>
            <path d="M60,100 Q80,70 100,70 T120,90" 
                  stroke="${DGT_COLORS.black}" stroke-width="10" fill="none" stroke-linecap="round"/>
            <path d="M120,90 L115,80 L125,85 Z" fill="${DGT_COLORS.black}"/>
        </svg>
    `;
}

// SEMÁFORO
function createTrafficLightSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 120px; height: 140px;">
            <defs>
                <filter id="shadow-light" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.2"/>
                </filter>
            </defs>
            <rect x="70" y="20" width="60" height="160" rx="8" fill="${DGT_COLORS.black}" 
                  stroke="${DGT_COLORS.gray}" stroke-width="2" filter="url(#shadow-light)"/>
            <circle cx="100" cy="55" r="18" fill="#8B0000" stroke="#ff0000" stroke-width="2"/>
            <circle cx="100" cy="100" r="18" fill="#8B8000" stroke="${DGT_COLORS.yellow}" stroke-width="2"/>
            <circle cx="100" cy="145" r="18" fill="${DGT_COLORS.green}" stroke="#00ff00" stroke-width="3">
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
            </circle>
        </svg>
    `;
}

// R402 - ROTONDA
function createRoundaboutSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-round" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <circle cx="100" cy="100" r="80" fill="${DGT_COLORS.blue}" 
                    stroke="${DGT_COLORS.white}" stroke-width="6" filter="url(#shadow-round)"/>
            <circle cx="100" cy="100" r="30" fill="none" 
                    stroke="${DGT_COLORS.white}" stroke-width="8"/>
            <path d="M100,55 A45,45 0 0,1 145,100" stroke="${DGT_COLORS.white}" 
                  stroke-width="8" fill="none" stroke-linecap="round"/>
            <path d="M145,100 L140,90 L150,95 Z" fill="${DGT_COLORS.white}"/>
        </svg>
    `;
}

// P11a - SEÑAL GENÉRICA DE ADVERTENCIA
function createGenericWarningSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-warn" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
                </filter>
            </defs>
            <path d="M100,20 L180,170 L20,170 Z" fill="${DGT_COLORS.yellow}" 
                  stroke="${DGT_COLORS.red}" stroke-width="8" filter="url(#shadow-warn)"/>
            <rect x="95" y="70" width="10" height="50" rx="5" fill="${DGT_COLORS.black}"/>
            <circle cx="100" cy="140" r="8" fill="${DGT_COLORS.black}"/>
        </svg>
    `;
}

// ============================================
// SITUACIONES VIALES
// ============================================

// CRUCE / INTERSECCIÓN
function createIntersectionSituation() {
    return `
        <svg viewBox="0 0 240 240" style="width: 160px; height: 160px;">
            <defs>
                <filter id="shadow-intersection" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
                </filter>
            </defs>
            <rect x="105" y="10" width="30" height="220" fill="${DGT_COLORS.road}" filter="url(#shadow-intersection)"/>
            <rect x="10" y="105" width="220" height="30" fill="${DGT_COLORS.road}"/>
            <rect x="118" y="10" width="4" height="90" fill="${DGT_COLORS.roadLine}"/>
            <rect x="118" y="140" width="4" height="90" fill="${DGT_COLORS.roadLine}"/>
            <rect x="10" y="118" width="90" height="4" fill="${DGT_COLORS.roadLine}"/>
            <rect x="140" y="118" width="90" height="4" fill="${DGT_COLORS.roadLine}"/>
            <rect x="115" y="150" width="12" height="22" rx="2" fill="${DGT_COLORS.red}" filter="url(#shadow-intersection)"/>
            <rect x="155" y="113" width="22" height="12" rx="2" fill="${DGT_COLORS.orange}" filter="url(#shadow-intersection)"/>
            <circle cx="120" cy="160" r="2" fill="${DGT_COLORS.white}"/>
            <circle cx="166" cy="120" r="2" fill="${DGT_COLORS.white}"/>
        </svg>
    `;
}

// ADELANTAMIENTO
function createOvertakingSituation() {
    return `
        <svg viewBox="0 0 240 180" style="width: 180px; height: 120px;">
            <defs>
                <filter id="shadow-overtake" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
                </filter>
            </defs>
            <rect x="0" y="55" width="240" height="70" fill="${DGT_COLORS.road}" filter="url(#shadow-overtake)"/>
            <rect x="10" y="88" width="20" height="4" fill="${DGT_COLORS.yellow}"/>
            <rect x="40" y="88" width="20" height="4" fill="${DGT_COLORS.yellow}"/>
            <rect x="70" y="88" width="20" height="4" fill="${DGT_COLORS.yellow}"/>
            <rect x="100" y="88" width="20" height="4" fill="${DGT_COLORS.yellow}"/>
            <rect x="130" y="88" width="20" height="4" fill="${DGT_COLORS.yellow}"/>
            <rect x="160" y="88" width="20" height="4" fill="${DGT_COLORS.yellow}"/>
            <rect x="190" y="88" width="20" height="4" fill="${DGT_COLORS.yellow}"/>
            <rect x="220" y="88" width="20" height="4" fill="${DGT_COLORS.yellow}"/>
            <rect x="50" y="95" width="28" height="18" rx="3" fill="${DGT_COLORS.blue}" filter="url(#shadow-overtake)"/>
            <rect x="135" y="68" width="28" height="18" rx="3" fill="${DGT_COLORS.orange}" filter="url(#shadow-overtake)"/>
            <path d="M150,60 L155,50 L160,60 Z" fill="${DGT_COLORS.orange}"/>
            <circle cx="55" cy="103" r="2" fill="${DGT_COLORS.white}"/>
            <circle cx="74" cy="103" r="2" fill="${DGT_COLORS.white}"/>
            <circle cx="140" cy="76" r="2" fill="${DGT_COLORS.white}"/>
            <circle cx="159" cy="76" r="2" fill="${DGT_COLORS.white}"/>
        </svg>
    `;
}

// APARCAMIENTO
function createParkingSituation() {
    return `
        <svg viewBox="0 0 220 180" style="width: 160px; height: 130px;">
            <defs>
                <filter id="shadow-park" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
                </filter>
            </defs>
            <rect x="20" y="40" width="180" height="100" fill="${DGT_COLORS.gray}" filter="url(#shadow-park)"/>
            <rect x="30" y="50" width="50" height="80" fill="none" stroke="${DGT_COLORS.white}" stroke-width="3"/>
            <rect x="90" y="50" width="50" height="80" fill="none" stroke="${DGT_COLORS.white}" stroke-width="3"/>
            <rect x="150" y="50" width="50" height="80" fill="none" stroke="${DGT_COLORS.white}" stroke-width="3"/>
            <rect x="97" y="70" width="36" height="50" rx="3" fill="${DGT_COLORS.blue}" filter="url(#shadow-park)"/>
            <circle cx="103" cy="115" r="3" fill="${DGT_COLORS.black}"/>
            <circle cx="127" cy="115" r="3" fill="${DGT_COLORS.black}"/>
            <rect x="105" y="72" width="20" height="15" fill="#87CEEB" opacity="0.6"/>
        </svg>
    `;
}

// ARCÉN
function createRoadShoulderSituation() {
    return `
        <svg viewBox="0 0 240 140" style="width: 200px; height: 100px;">
            <defs>
                <filter id="shadow-shoulder" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
                </filter>
            </defs>
            <rect x="0" y="40" width="240" height="60" fill="${DGT_COLORS.road}" filter="url(#shadow-shoulder)"/>
            <rect x="0" y="35" width="240" height="10" fill="${DGT_COLORS.gray}"/>
            <rect x="0" y="95" width="240" height="10" fill="${DGT_COLORS.gray}"/>
            <rect x="115" y="67" width="4" height="6" fill="${DGT_COLORS.white}"/>
            <rect x="125" y="67" width="4" height="6" fill="${DGT_COLORS.white}"/>
            <rect x="135" y="67" width="4" height="6" fill="${DGT_COLORS.white}"/>
            <rect x="145" y="67" width="4" height="6" fill="${DGT_COLORS.white}"/>
            <rect x="155" y="67" width="4" height="6" fill="${DGT_COLORS.white}"/>
            <rect x="165" y="67" width="4" height="6" fill="${DGT_COLORS.white}"/>
            <text x="10" y="32" font-size="10" fill="${DGT_COLORS.orange}" font-weight="bold">ARCÉN</text>
            <text x="10" y="117" font-size="10" fill="${DGT_COLORS.orange}" font-weight="bold">ARCÉN</text>
            <text x="110" y="65" font-size="10" fill="${DGT_COLORS.white}" font-weight="bold">CALZADA</text>
        </svg>
    `;
}

// MARCAS VIALES - LÍNEAS
function createRoadMarkings() {
    return `
        <svg viewBox="0 0 240 140" style="width: 200px; height: 100px;">
            <defs>
                <filter id="shadow-marks" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
                </filter>
            </defs>
            <rect x="0" y="20" width="240" height="50" fill="${DGT_COLORS.road}" filter="url(#shadow-marks)"/>
            <rect x="115" y="20" width="5" height="50" fill="${DGT_COLORS.white}"/>
            <text x="10" y="50" font-size="11" fill="${DGT_COLORS.white}" font-weight="bold">CONTINUA</text>
            <text x="150" y="17" font-size="9" fill="${DGT_COLORS.orange}">NO ADELANTAR</text>
            <rect x="0" y="90" width="240" height="50" fill="${DGT_COLORS.road}" filter="url(#shadow-marks)"/>
            <rect x="20" y="112" width="20" height="5" fill="${DGT_COLORS.white}"/>
            <rect x="50" y="112" width="20" height="5" fill="${DGT_COLORS.white}"/>
            <rect x="80" y="112" width="20" height="5" fill="${DGT_COLORS.white}"/>
            <rect x="110" y="112" width="20" height="5" fill="${DGT_COLORS.white}"/>
            <rect x="140" y="112" width="20" height="5" fill="${DGT_COLORS.white}"/>
            <rect x="170" y="112" width="20" height="5" fill="${DGT_COLORS.white}"/>
            <rect x="200" y="112" width="20" height="5" fill="${DGT_COLORS.white}"/>
            <text x="10" y="105" font-size="11" fill="${DGT_COLORS.white}" font-weight="bold">DISCONTINUA</text>
            <text x="140" y="87" font-size="9" fill="${DGT_COLORS.green}">SÍ ADELANTAR</text>
        </svg>
    `;
}

// ============================================
// ELEMENTOS ESPECÍFICOS
// ============================================

// CARRETERA / CALZADA
function createRoadSituation() {
    return `
        <svg viewBox="0 0 240 160" style="width: 180px; height: 120px;">
            <defs>
                <filter id="shadow-road" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
                </filter>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:${DGT_COLORS.gray};stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:${DGT_COLORS.road};stop-opacity:1" />
                </linearGradient>
            </defs>
            <polygon points="0,160 240,160 200,20 40,20" fill="url(#roadGrad)" filter="url(#shadow-road)"/>
            <rect x="115" y="30" width="3" height="15" fill="${DGT_COLORS.white}"/>
            <rect x="115" y="55" width="3" height="20" fill="${DGT_COLORS.white}"/>
            <rect x="115" y="85" width="3" height="25" fill="${DGT_COLORS.white}"/>
            <rect x="115" y="120" width="3" height="30" fill="${DGT_COLORS.white}"/>
        </svg>
    `;
}

// CHALECO REFLECTANTE
function createReflectiveVestIllustration() {
    return `
        <svg viewBox="0 0 200 200" style="width: 130px; height: 140px;">
            <defs>
                <filter id="shadow-vest" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15"/>
                </filter>
            </defs>
            <path d="M100,40 L70,60 L70,160 L130,160 L130,60 Z" fill="${DGT_COLORS.yellow}" filter="url(#shadow-vest)"/>
            <rect x="85" y="80" width="30" height="8" fill="${DGT_COLORS.white}" opacity="0.8"/>
            <rect x="85" y="100" width="30" height="8" fill="${DGT_COLORS.white}" opacity="0.8"/>
            <path d="M70,60 L100,40 L100,70 Z" fill="${DGT_COLORS.orange}"/>
            <path d="M130,60 L100,40 L100,70 Z" fill="${DGT_COLORS.orange}"/>
            <text x="100" y="145" font-size="16" fill="${DGT_COLORS.black}" font-weight="bold" text-anchor="middle">V16</text>
        </svg>
    `;
}

// NEUMÁTICO
function createTireIllustration() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <defs>
                <filter id="shadow-tire" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="6" flood-opacity="0.2"/>
                </filter>
            </defs>
            <circle cx="100" cy="100" r="75" fill="${DGT_COLORS.black}" filter="url(#shadow-tire)"/>
            <circle cx="100" cy="100" r="65" fill="${DGT_COLORS.gray}"/>
            <circle cx="100" cy="100" r="40" fill="${DGT_COLORS.black}"/>
            <rect x="95" y="35" width="10" height="25" fill="${DGT_COLORS.black}"/>
            <rect x="95" y="140" width="10" height="25" fill="${DGT_COLORS.black}"/>
            <rect x="35" y="95" width="25" height="10" fill="${DGT_COLORS.black}"/>
            <rect x="140" y="95" width="25" height="10" fill="${DGT_COLORS.black}"/>
            <path d="M100,60 Q120,80 100,100 T100,140" stroke="${DGT_COLORS.black}" stroke-width="6" fill="none"/>
            <path d="M140,100 Q120,80 100,100 T60,100" stroke="${DGT_COLORS.black}" stroke-width="6" fill="none"/>
        </svg>
    `;
}

// ============================================
// MAPEO INTELIGENTE DE PREGUNTAS
// ============================================

function getQuestionIllustration(question) {
    if (question.image) {
        return `<img src="${question.image}" alt="">`;
    }
    const questionText = question.question.toLowerCase();

    // Only when the picture teaches the thing. No emoji filler.
    if (questionText.includes('stop') || questionText.includes('señal de stop')) {
        return wrapSVG(createStopSign());
    }
    if (questionText.includes('ceda el paso') || questionText.includes('ceder el paso')) {
        return wrapSVG(createYieldSign());
    }
    if (questionText.includes('prohibido') && (questionText.includes('adelantar') || questionText.includes('adelantamiento'))) {
        return wrapSVG(createNoOvertakingSign());
    }
    if (questionText.includes('prohibido el paso') || questionText.includes('dirección prohibida') || questionText.includes('entrada prohibida')) {
        return wrapSVG(createNoEntrySign());
    }
    if (questionText.includes('paso de peatones')) {
        return wrapSVG(createPedestrianCrossingSign());
    }
    if (questionText.includes('curva peligrosa')) {
        return wrapSVG(createDangerousCurveSign());
    }
    if (questionText.includes('semáforo')) {
        return wrapSVG(createTrafficLightSign());
    }
    if (questionText.includes('rotonda') || questionText.includes('glorieta')) {
        return wrapSVG(createRoundaboutSign());
    }
    if (questionText.includes('animales') && questionText.includes('prioridad')) {
        return wrapSVG(createAnimalsCrossing());
    }
    if (questionText.includes('tractor')) {
        return wrapSVG(createTractorOnShoulder());
    }
    if (questionText.includes('arcén')) {
        return wrapSVG(createRoadShoulderSituation());
    }
    if (questionText.includes('línea continua') || questionText.includes('linea continua') ||
        (questionText.includes('línea') && questionText.includes('marca'))) {
        return wrapSVG(createRoadMarkings());
    }
    if (questionText.includes('chaleco')) {
        return wrapSVG(createReflectiveVestIllustration());
    }
    if (questionText.includes('neumático')) {
        return wrapSVG(createTireIllustration());
    }
    if (questionText.includes('p-33') || (questionText.includes('señal') && questionText.includes('visibilidad reducida') && !questionText.includes('curva') && !questionText.includes('rasante'))) {
        return wrapSVG(createReducedVisibilitySign());
    }
    if (questionText.includes('p-35') || (questionText.includes('trenzado') && (questionText.includes('señal') || questionText.includes('tramo')))) {
        return wrapSVG(createWeavingSign());
    }
    if (questionText.includes('r-118') || (questionText.includes('movilidad personal') && questionText.includes('prohíbe'))) {
        return wrapSVG(createNoVmpSign());
    }
    if (questionText.includes('s-47') || questionText.includes('coexistencia')) {
        return wrapSVG(createCoexistenceSign());
    }
    if (questionText.includes('2+1') || questionText.includes('s-1c')) {
        return wrapSVG(createRoadTwoPlusOneSign());
    }
    if (questionText.includes('multicarril')) {
        return `<img src="assets/glossary/carretera-multicarril.jpg" alt="Señal de carretera multicarril">`;
    }

    return '';
}

function createWarningTriangle(inner) {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <path d="M100,22 L178,168 L22,168 Z" fill="${DGT_COLORS.yellow}" stroke="${DGT_COLORS.red}" stroke-width="10"/>
            ${inner}
        </svg>
    `;
}

function createReducedVisibilitySign() {
    return createWarningTriangle(`
        <circle cx="78" cy="118" r="16" fill="${DGT_COLORS.black}" opacity="0.35"/>
        <circle cx="100" cy="110" r="20" fill="${DGT_COLORS.black}" opacity="0.28"/>
        <circle cx="122" cy="120" r="16" fill="${DGT_COLORS.black}" opacity="0.35"/>
    `);
}

function createWeavingSign() {
    return createWarningTriangle(`
        <path d="M70,150 C78,128 90,118 100,108 C110,98 118,88 128,72" stroke="${DGT_COLORS.black}" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M130,150 C122,128 110,118 100,108 C90,98 82,88 72,72" stroke="${DGT_COLORS.black}" stroke-width="7" fill="none" stroke-linecap="round"/>
    `);
}

function createNoVmpSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <circle cx="100" cy="100" r="78" fill="${DGT_COLORS.white}" stroke="${DGT_COLORS.red}" stroke-width="12"/>
            <circle cx="78" cy="128" r="12" fill="${DGT_COLORS.black}"/>
            <circle cx="128" cy="128" r="12" fill="${DGT_COLORS.black}"/>
            <path d="M70,118 L130,90 L138,98" stroke="${DGT_COLORS.black}" stroke-width="7" fill="none" stroke-linecap="round"/>
            <path d="M108,92 L104,72" stroke="${DGT_COLORS.black}" stroke-width="6" stroke-linecap="round"/>
            <line x1="48" y1="48" x2="152" y2="152" stroke="${DGT_COLORS.red}" stroke-width="12" stroke-linecap="round"/>
        </svg>
    `;
}

function createCoexistenceSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <rect x="28" y="28" width="144" height="144" rx="10" fill="${DGT_COLORS.blue}"/>
            <text x="100" y="92" text-anchor="middle" fill="${DGT_COLORS.white}" font-size="42" font-weight="700" font-family="Arial, sans-serif">20</text>
            <circle cx="78" cy="128" r="10" fill="${DGT_COLORS.white}"/>
            <rect x="72" y="138" width="12" height="22" rx="3" fill="${DGT_COLORS.white}"/>
            <circle cx="122" cy="132" r="8" fill="${DGT_COLORS.white}"/>
            <rect x="108" y="138" width="28" height="8" rx="3" fill="${DGT_COLORS.white}"/>
        </svg>
    `;
}

function createAnimalsCrossing() {
    return `
        <svg viewBox="0 0 280 160" style="width: 260px; height: 148px;">
            <rect x="0" y="0" width="280" height="160" fill="#4a6b3a"/>
            <rect x="88" y="0" width="72" height="160" fill="${DGT_COLORS.road}"/>
            <rect x="160" y="52" width="120" height="56" fill="${DGT_COLORS.road}"/>
            <rect x="120" y="10" width="6" height="16" fill="${DGT_COLORS.white}"/>
            <rect x="120" y="36" width="6" height="16" fill="${DGT_COLORS.white}"/>
            <rect x="176" y="76" width="16" height="6" fill="${DGT_COLORS.white}"/>
            <rect x="204" y="76" width="16" height="6" fill="${DGT_COLORS.white}"/>
            <rect x="232" y="76" width="16" height="6" fill="${DGT_COLORS.white}"/>
            <rect x="104" y="108" width="28" height="42" rx="5" fill="#4989ff"/>
            <rect x="108" y="112" width="20" height="12" rx="2" fill="#dbeafe"/>
            <circle cx="110" cy="150" r="5" fill="${DGT_COLORS.black}"/>
            <circle cx="126" cy="150" r="5" fill="${DGT_COLORS.black}"/>
            <path d="M118 104 C118 78 150 80 188 80" stroke="${DGT_COLORS.yellow}" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M176 72 L192 80 L176 88" fill="${DGT_COLORS.yellow}"/>
            <ellipse cx="214" cy="68" rx="14" ry="8" fill="#f5f0e6"/>
            <circle cx="226" cy="64" r="5" fill="#f5f0e6"/>
            <ellipse cx="246" cy="90" rx="12" ry="7" fill="#efe6d6"/>
            <circle cx="256" cy="86" r="4" fill="#efe6d6"/>
            <text x="118" y="22" text-anchor="middle" fill="${DGT_COLORS.white}" font-size="11" font-weight="700" font-family="Inter, Arial, sans-serif">VEHÍCULO</text>
            <text x="230" y="148" text-anchor="middle" fill="${DGT_COLORS.white}" font-size="11" font-weight="700" font-family="Inter, Arial, sans-serif">ANIMALES</text>
        </svg>
    `;
}

function createTractorOnShoulder() {
    return `
        <svg viewBox="0 0 280 160" style="width: 260px; height: 148px;">
            <rect x="0" y="0" width="200" height="160" fill="${DGT_COLORS.road}"/>
            <rect x="96" y="8" width="8" height="24" fill="${DGT_COLORS.white}"/>
            <rect x="96" y="44" width="8" height="24" fill="${DGT_COLORS.white}"/>
            <rect x="96" y="80" width="8" height="24" fill="${DGT_COLORS.white}"/>
            <rect x="96" y="116" width="8" height="24" fill="${DGT_COLORS.white}"/>
            <rect x="200" y="0" width="8" height="160" fill="${DGT_COLORS.white}"/>
            <rect x="208" y="0" width="72" height="160" fill="#6B7280"/>
            <text x="100" y="22" text-anchor="middle" fill="${DGT_COLORS.white}" font-size="11" font-weight="700" font-family="Inter, Arial, sans-serif">CALZADA</text>
            <text x="244" y="22" text-anchor="middle" fill="${DGT_COLORS.white}" font-size="11" font-weight="700" font-family="Inter, Arial, sans-serif">ARCÉN</text>
            <rect x="218" y="70" width="40" height="22" rx="3" fill="#3F7D3A"/>
            <rect x="226" y="56" width="18" height="16" rx="2" fill="#2F5D2C"/>
            <circle cx="226" cy="94" r="8" fill="${DGT_COLORS.black}"/>
            <circle cx="250" cy="94" r="8" fill="${DGT_COLORS.black}"/>
            <text x="244" y="122" text-anchor="middle" fill="${DGT_COLORS.white}" font-size="10" font-weight="600" font-family="Inter, Arial, sans-serif">TRACTOR</text>
        </svg>
    `;
}

function createRoadTwoPlusOneSign() {
    return `
        <svg viewBox="0 0 200 200" style="width: 140px; height: 140px;">
            <rect x="28" y="28" width="144" height="144" rx="10" fill="${DGT_COLORS.blue}"/>
            <rect x="70" y="48" width="60" height="104" rx="4" fill="${DGT_COLORS.white}"/>
            <rect x="78" y="56" width="14" height="88" fill="${DGT_COLORS.blue}"/>
            <rect x="108" y="56" width="14" height="40" fill="${DGT_COLORS.blue}"/>
            <rect x="96" y="104" width="14" height="40" fill="${DGT_COLORS.blue}"/>
            <text x="100" y="168" text-anchor="middle" fill="${DGT_COLORS.white}" font-size="16" font-weight="700" font-family="Arial, sans-serif">2+1</text>
        </svg>
    `;
}
