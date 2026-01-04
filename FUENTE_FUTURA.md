# Instrucciones para cargar la fuente Futura LT W01 Book

## ⚠️ IMPORTANTE: La fuente Futura no se está cargando actualmente

Actualmente el sitio está usando una fuente alternativa (Quicksand) que es similar a Futura pero no es la fuente original.

## Opción 1: Cargar desde Adobe Fonts (RECOMENDADO)

### Pasos:

1. **Ir a Adobe Fonts:**
   - Visita: https://fonts.adobe.com/
   - Inicia sesión con tu cuenta de Adobe

2. **Buscar la fuente:**
   - Busca: "Futura LT W01 Book"
   - O busca: "Futura" y selecciona la variante "W01 Book"

3. **Crear proyecto web:**
   - Haz clic en "Add to Web Project" o "Añadir a proyecto web"
   - Crea un nuevo proyecto o usa uno existente
   - Nombre sugerido: "Grupo PMKT Website"

4. **Copiar el código:**
   - Adobe te dará un código como este:
     ```html
     <link rel="stylesheet" href="https://use.typekit.net/XXXXXXX.css">
     ```

5. **Agregar al HTML:**
   - Abre `index.html`
   - Encuentra la línea 10 (aproximadamente) que dice:
     ```html
     <!-- <link rel="stylesheet" href="https://use.typekit.net/xxxxxxx.css"> -->
     ```
   - **Descomenta** esa línea (quita los `<!--` y `-->`)
   - Reemplaza `xxxxxxx` con tu código real de Adobe Fonts

6. **Verificar el nombre de la fuente:**
   - En Adobe Fonts, ve a "Web Project Settings"
   - Verifica que el nombre de la fuente sea exactamente: `futura-lt-w01-book`
   - Si es diferente, ajusta el nombre en `css/styles.css` en la variable `--font-paragraph`

## Opción 2: Usar archivos de fuente locales

Si tienes los archivos `.woff2` o `.woff` de la fuente:

1. **Crear carpeta:**
   - Crea la carpeta: `assets/fonts/`

2. **Copiar archivos:**
   - Copia los archivos de la fuente a `assets/fonts/`
   - Nombres sugeridos:
     - `futura-lt-w01-book.woff2`
     - `futura-lt-w01-book.woff`

3. **Activar @font-face:**
   - Abre `css/styles.css`
   - Encuentra el bloque comentado alrededor de la línea 8-17
   - **Descomenta** el bloque `@font-face`
   - Verifica que las rutas sean correctas

## Verificar que funciona

Después de cargar la fuente:

1. Abre la página en el navegador
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña "Console"
4. Debería aparecer un mensaje confirmando que Futura está cargada
5. O revisa en "Computed" que la fuente usada sea "futura-lt-w01-book"

## Nota sobre licencias

- **Futura LT W01 Book** es una fuente comercial
- Necesitas una licencia válida para usarla
- Adobe Fonts incluye la licencia si tienes una suscripción activa
- Si usas archivos locales, asegúrate de tener la licencia correspondiente

## Fuente alternativa temporal

Actualmente se está usando **Quicksand** como fallback, que es similar pero no idéntica a Futura. Una vez que cargues la fuente real, se usará automáticamente.

