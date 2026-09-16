# 📋 GUÍA DE ILUSTRACIONES DGT

Sistema de ilustraciones realistas en SVG basado en señales oficiales de la Dirección General de Tráfico (DGT) de España.

## 🎨 Colores Oficiales DGT

```javascript
const DGT_COLORS = {
    red: '#E30613',      // Rojo DGT - Prohibición
    blue: '#003DA5',     // Azul DGT - Obligación/Información
    yellow: '#FFDE00',   // Amarillo DGT - Advertencia
    green: '#00A651',    // Verde DGT - Información/Autorización
    orange: '#FF6600',   // Naranja - Obras/Temporal
    brown: '#8B4513'     // Marrón - Indicaciones culturales
};
```

## 🚦 Señales Implementadas

### **Señales de Prohibición** (Círculo rojo)
- ✅ **R5 - STOP**: `createStopSign()`
- ✅ **R6 - CEDA EL PASO**: `createYieldSign()`
- ✅ **R101 - ENTRADA PROHIBIDA**: `createNoEntrySign()`
- ✅ **R301 - VELOCIDAD MÁXIMA**: `createSpeedLimitSign(speed)`
- ✅ **R306 - PROHIBIDO ADELANTAR**: `createNoOvertakingSign()`

### **Señales de Advertencia** (Triángulo amarillo)
- ✅ **P1 - CURVA PELIGROSA**: `createDangerousCurveSign()`
- ✅ **P11a - ADVERTENCIA GENÉRICA**: `createGenericWarningSign()`

### **Señales de Información** (Cuadrado/Círculo azul)
- ✅ **S13 - PASO DE PEATONES**: `createPedestrianCrossingSign()`
- ✅ **R402 - ROTONDA**: `createRoundaboutSign()`
- ✅ **SEMÁFORO**: `createTrafficLightSign()`

## 🛣️ Situaciones Viales Implementadas

- ✅ **CRUCE/INTERSECCIÓN**: Vista cenital con 2 coches aproximándose
- ✅ **ADELANTAMIENTO**: Carretera con línea discontinua, 2 coches
- ✅ **APARCAMIENTO**: 3 plazas con coche aparcado
- ✅ **ARCÉN**: Sección de carretera mostrando arcenes y calzada
- ✅ **MARCAS VIALES**: Comparación línea continua vs discontinua
- ✅ **CARRETERA**: Perspectiva 3D de carretera

## 🔧 Elementos Específicos

- ✅ **CHALECO REFLECTANTE**: Chaleco amarillo con marcas V16
- ✅ **NEUMÁTICO**: Vista frontal de neumático con dibujo de banda

## ⚡ Sistema de Detección Inteligente

La función `getQuestionIllustration(question)` analiza el texto y retorna la ilustración apropiada:

```javascript
// Ejemplo de detección
if (questionText.includes('stop') || questionText.includes('señal de stop')) {
    return wrapSVG(createStopSign());
}
```

## ➕ Cómo Añadir Nuevas Ilustraciones

1. **Crear función SVG** en `js/illustrations-dgt.js`
2. **Añadir detección** en `getQuestionIllustration()`
3. **Usar colores DGT** con `${DGT_COLORS.xxx}`
4. **Añadir filtro único** para sombras: `<filter id="shadow-nombre-unico">`
5. **Documentar** en este archivo

## 📚 Referencias DGT

- **Catálogo Oficial de Señales:** dgt.es/es/seguridad-vial/senales
- **Reglamento General de Circulación:** RD 1428/2003
- **Colores RGB Oficiales:** Norma UNE 135-334

---

**Versión:** 1.0  
**Fecha:** 2026-09-16  
**Estado:** 21 ilustraciones implementadas (13 señales + 6 situaciones + 2 elementos)
