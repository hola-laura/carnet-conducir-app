#!/bin/bash

# Script para iniciar la app Carnet B

echo "🚗 Iniciando Carnet B - Test DGT..."
echo ""
echo "La app estará disponible en:"
echo "👉 http://localhost:8000"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

# Cambiar al directorio del script
cd "$(dirname "$0")"

# Iniciar servidor
python3 -m http.server 8000
