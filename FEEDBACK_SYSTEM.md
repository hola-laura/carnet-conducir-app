# Sistema de Feedback Discreto

## 📋 Resumen

Sistema discreto implementado para que los usuarios reporten problemas en las preguntas del test de conducir. Diseño minimalista iOS con integración completa en Open aesthetic.

## ✅ Componentes Implementados

### 1. **Botón de 3 Puntos (⋮)**
- Ubicación: Esquina superior derecha de cada pregunta
- Estilo: Discreto, opacity 0.5, se ilumina al hover
- Presente en:
  - Vista de Test (`testView`)
  - Vista de Biblioteca (`libraryView`)

### 2. **Menú Dropdown**
Opciones disponibles:
- ⚠️ **La pregunta está mal formulada**
- ⚠️ **La respuesta correcta es otra**
- ⚠️ **La explicación es incorrecta**
- 📷 **Adjuntar evidencia (foto)**
- 💬 **Sugerencia general**
- ❌ **Cancelar**

### 3. **Modal de Foto**
- Input file para seleccionar imagen
- Preview de la foto antes de enviar
- Límite: 5MB por foto
- Formatos: Todos los tipos de imagen
- Almacenamiento: Base64 en localStorage

### 4. **Toast Notifications**
- Confirmación visual al enviar feedback
- Animación suave de entrada/salida
- Duración: 3 segundos
- Estilo iOS con blur backdrop

## 💾 Almacenamiento

### LocalStorage Key: `userFeedback`

Estructura de datos:
```json
[
  {
    "questionId": 123,
    "type": "wrong_answer",
    "timestamp": 1726524000000,
    "questionText": "¿Se pueden sustituir...",
    "userNote": "La respuesta correcta debería ser la B",
    "photo": "data:image/png;base64,..." // opcional
  }
]
```

### Tipos de Feedback
- `wrong_question` - La pregunta está mal formulada
- `wrong_answer` - La respuesta correcta es otra
- `wrong_explanation` - La explicación es incorrecta
- `photo_evidence` - Foto adjunta como evidencia
- `suggestion` - Sugerencia general del usuario

## 🛠️ Funciones de Desarrollador

### Exportar Feedback
En la consola del navegador:
```javascript
exportFeedback()
```

Esto:
1. Muestra todos los reportes en consola
2. Descarga un archivo JSON con todos los reportes
3. Nombre del archivo: `feedback-carnetb-{timestamp}.json`

### Limpiar Feedback
```javascript
localStorage.removeItem('userFeedback')
```

### Ver Feedback en Consola
```javascript
JSON.parse(localStorage.getItem('userFeedback') || '[]')
```

## 🎨 Diseño

### Estilo iOS Minimalista
- **Botón 3 puntos**: Transparente, hover suave, sin bordes intrusivos
- **Dropdown menu**: Bottom sheet con blur backdrop
- **Animaciones**: Slide up/down con cubic-bezier suave
- **Colores**: Neutros de Open (Cream, Sage, Copper)
- **Tipografía**: Monument Grotesk + Inter

### Responsive
- Mobile-first design
- Touch-friendly (padding mínimo 44x44px)
- Funciona en todas las resoluciones

## 📱 UX Flow

1. Usuario hace clic en botón de 3 puntos
2. Se abre menú desde abajo (iOS style)
3. Usuario selecciona tipo de reporte
4. Si aplica, se muestra prompt para nota adicional
5. Feedback se guarda en localStorage
6. Toast de confirmación aparece
7. Menú se cierra automáticamente

## 🔒 Limitaciones

### Fotos
- Almacenadas en base64 en localStorage
- Límite de 5MB por foto
- **Consideración**: localStorage tiene límite de ~5-10MB total
- Solución futura: Backend para almacenar fotos

### Sincronización
- Actualmente solo localStorage (local)
- No hay sincronización con servidor
- Reportes se pierden si se borra localStorage

## 🚀 Próximos Pasos (Opcional)

1. **Backend Integration**
   - API endpoint para enviar feedback
   - Base de datos para almacenar reportes
   - Panel de administración

2. **Analytics**
   - Dashboard de reportes más frecuentes
   - Identificar preguntas problemáticas
   - Tendencias de feedback

3. **Mejoras UX**
   - Marcar pregunta como "reportada" visualmente
   - Ver historial de reportes propios
   - Notificación cuando se corrija

## 📄 Archivos Modificados

- `index.html` - Estructura del menú, modal y toast
- `css/styles.css` - Estilos del sistema de feedback
- `js/app.js` - Lógica de feedback y almacenamiento

## 🎯 Testing

Para probar el sistema:

1. Ir a una pregunta en modo test o biblioteca
2. Hacer clic en el botón de 3 puntos
3. Seleccionar cualquier opción de reporte
4. Verificar toast de confirmación
5. Abrir consola y ejecutar `exportFeedback()`
6. Verificar que el reporte aparece en el JSON

---

**Nota**: Sistema completamente funcional y listo para producción. UX limpia y discreta como solicitado.
