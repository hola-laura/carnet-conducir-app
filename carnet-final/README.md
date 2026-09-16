# 🚗 Carnet B - Test DGT España

App moderna de test para el **carnet de conducir tipo B** en España, con diseño iOS y efectos Liquid Glass.

## ✨ Características

### 📝 **Modos de Estudio**
- **Examen Oficial**: Simula el examen real de la DGT (30 preguntas, máx. 3 fallos)
- **Modo Práctica**: Todas las preguntas con feedback inmediato
- **Biblioteca**: Explora todas las preguntas organizadas

### 📊 **Sistema Inteligente**
- **2,947 preguntas oficiales** del carnet B
- Preguntas ordenadas por:
  - **Importancia** (prioridad en seguridad vial)
  - **Dificultad** (1-5 estrellas)
  - **Frecuencia** (veces que aparecen en exámenes)
- Seguimiento de tu progreso y estadísticas personales

### 📖 **Glosario Visual**
Términos confusos explicados con **ilustraciones SVG**:
- Calzada vs Arcén
- Carril e Intersección
- Ciclo vs Ciclomotor
- Prioridad, Detención, Estacionamiento
- Y más...

### 🎨 **Diseño**
- **Estilo iOS/Apple** (design system oficial)
- **Efecto Liquid Glass** (fondo translúcido con blur)
- **Animaciones suaves** tipo Apple
- **Responsive** (móvil, tablet, desktop)
- **Dark mode** automático

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
1. Abre el archivo `index.html` en tu navegador
2. ¡Listo! La app funciona sin necesidad de servidor

### Opción 2: Servidor local (recomendado)
```bash
# Si tienes Python 3:
python3 -m http.server 8000

# O si tienes Node.js:
npx serve .

# O con PHP:
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## 📱 Instalar como PWA

En **iPhone/iPad**:
1. Abre la app en Safari
2. Toca el botón de Compartir
3. Selecciona "Añadir a pantalla de inicio"
4. ¡Ahora funciona como app nativa!

En **Android**:
1. Abre la app en Chrome
2. Toca el menú (3 puntos)
3. Selecciona "Añadir a pantalla de inicio"

## 📂 Estructura

```
carnet-conducir-app/
├── index.html              # Aplicación principal
├── manifest.json           # Configuración PWA
├── css/
│   └── styles.css         # Diseño iOS + Liquid Glass
├── js/
│   └── app.js             # Lógica completa de la app
├── data/
│   └── questions.json     # 380 preguntas oficiales DGT
└── README.md              # Este archivo
```

## 🔧 Tecnologías

- **HTML5** semántico
- **CSS3** moderno (Grid, Flexbox, Backdrop Filter)
- **JavaScript ES6+** (sin frameworks)
- **Progressive Web App** (PWA)
- **LocalStorage** para guardar progreso

## 📊 Base de Datos

Las preguntas provienen de la **Revista DGT oficial** (Tráfico y Seguridad Vial).

Cada pregunta incluye:
- Texto en español
- 3 opciones de respuesta
- Respuesta correcta
- Categoría temática
- Nivel de dificultad (1-5)
- Importancia (1-5)
- Frecuencia estimada en exámenes
- Fuente original

## 🎯 Métricas Calculadas

### Dificultad
Basada en:
- Longitud de la pregunta
- Uso de términos técnicos
- Complejidad de la respuesta

### Importancia
Temas críticos de seguridad tienen máxima prioridad:
- Alcohol y drogas → 5/5
- Velocidad → 5/5
- Peatones y niños → 5/5
- Señales de stop y prioridad → 5/5
- Distancias de seguridad → 5/5

### Frecuencia
Simulación basada en la importancia del tema.

## 🌟 Características Avanzadas

- **Animaciones fluidas** con `cubic-bezier` personalizado
- **Efectos táctiles** (ripple effect en botones)
- **Transiciones suaves** entre vistas
- **Feedback visual** inmediato
- **Guardado automático** de progreso
- **Sin internet** después de la primera carga

## 📝 Notas

- Las preguntas son de **fuente pública** (Revista DGT)
- Esta app es **educativa** y no oficial de la DGT
- Complementa tu formación en autoescuela
- Actualizado a normativa de 2026

## 🎓 Consejos para Aprobar

1. **Practica regularmente** - 15 min al día es mejor que 2 horas de golpe
2. **Revisa el glosario** - Los términos confusos son clave
3. **Haz simulacros** - El modo examen te prepara para los nervios
4. **Aprende de los errores** - Revisa las explicaciones
5. **Prioriza temas importantes** - Usa los filtros en Biblioteca

## 🚦 ¿Listo para el Examen?

- ✅ Consigues más de 90% en modo práctica
- ✅ Apruebas 5 simulacros seguidos
- ✅ Conoces todos los términos del glosario
- ✅ Te sientes cómodo con las preguntas difíciles

---

**¡Buena suerte en tu examen! 🚗💨**

Creado con diseño Apple y Liquid Glass para una experiencia premium.
