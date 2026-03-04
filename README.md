# Grupo PMKT - Landing Page

Sitio web corporativo para Grupo PMKT Financial Planning. Landing page moderna, responsive y optimizada construida con HTML5, CSS3 y JavaScript vanilla.

## 📁 Estructura del Proyecto

```
grupo-pmkt/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principales
├── js/
│   └── main.js         # Funcionalidades JavaScript
├── assets/
│   └── logo.png        # Logo de la empresa (agregar)
└── README.md           # Este archivo
```

## 🚀 Características

- ✅ **Diseño Responsive**: Funciona perfectamente en móviles, tablets y desktop
- ✅ **Navegación Suave**: Scroll suave entre secciones
- ✅ **Animaciones**: Efectos de entrada al hacer scroll
- ✅ **Menú Móvil**: Navegación adaptativa para dispositivos móviles
- ✅ **Formulario de Contacto**: Validación y envío preparado
- ✅ **Tarjetas Interactivas**: Divisiones expandibles
- ✅ **Optimizado**: Carga rápida y rendimiento mejorado
- ✅ **Accesible**: Cumple con estándares de accesibilidad web

## 📋 Secciones

1. **Hero**: Banner principal con llamados a la acción
2. **Quienes Somos**: Información sobre el equipo y metodología
3. **Management**: Detalles sobre el liderazgo y socios estratégicos
4. **Divisiones**: Servicios ofrecidos (PMKT Capital, Planning, Services, Pymes)
5. **Responsabilidad**: Compromiso social con Fundación Pequeños Pasos
6. **Contacto**: Formulario de contacto
7. **Footer**: Información de contacto y navegación

## 🛠️ Personalización

### Imágenes Necesarias

1. **Logo**: Agregar `logo.png` en la carpeta `assets/`
   - Tamaño recomendado: 200x200px
   - Formato: PNG con transparencia

2. **Fondo del Hero** (opcional): Puedes agregar una imagen de fondo personalizada
   - Editar en CSS la propiedad `.hero-background`
   - Tamaño recomendado: 1920x1080px

### Colores

Los colores principales se pueden modificar en `css/styles.css`:

```css
:root {
    --color-primary: #1a365d;        /* Azul oscuro principal */
    --color-primary-dark: #0f1e3d;   /* Azul más oscuro */
    --color-secondary: #2563eb;      /* Azul secundario */
    /* ... más colores */
}
```

### Formulario de Contacto

El formulario actualmente simula el envío. Para conectarlo a un backend:

1. Edita `js/main.js` en la función del formulario
2. Reemplaza el código de simulación con tu endpoint:

```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

### Enlaces Sociales

Edita los enlaces en el footer del `index.html`:

```html
<li><a href="TU_URL_LINKEDIN" target="_blank">LinkedIn</a></li>
<li><a href="mailto:TU_EMAIL">Gmail</a></li>
<li><a href="TU_URL_INSTAGRAM" target="_blank">Instagram</a></li>
```

## 📤 Subir a cPanel

### Método 1: File Manager de cPanel

1. **Comprimir el proyecto**:
   - Selecciona todas las carpetas y archivos
   - Crea un archivo ZIP

2. **Subir a cPanel**:
   - Accede a cPanel → File Manager
   - Navega a `public_html/` (o tu directorio raíz)
   - Sube el archivo ZIP
   - Haz clic derecho → Extract para descomprimir
   - Elimina el archivo ZIP

3. **Verificar**:
   - Visita tu dominio para verificar que funciona

### Método 2: FTP

1. Conecta con un cliente FTP (FileZilla, WinSCP, etc.)
2. Navega a `public_html/`
3. Sube todas las carpetas y archivos:
   - `index.html`
   - `css/`
   - `js/`
   - `assets/`

### Método 3: Terminal SSH (si tienes acceso)

```bash
cd public_html
# Sube tus archivos via SCP o git
```

## 🔧 Desarrollo Local

Para trabajar localmente:

1. **Clona o descarga el proyecto**

2. **Abre con un servidor local**:

   **Opción A - Python:**
   ```bash
   python -m http.server 8000
   ```

   **Opción B - Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Opción C - VS Code Live Server:**
   - Instala la extensión "Live Server"
   - Clic derecho en `index.html` → "Open with Live Server"
   - **Nota:** Live Server no ejecuta PHP. Para probar el **formulario de contacto** en local, usa la Opción D.

   **Opción D - PHP (recomendado para probar el formulario):**
   ```bash
   php -S 127.0.0.1:8000
   ```
   - Abre en el navegador: `http://127.0.0.1:8000`
   - El envío del formulario irá a `api/contact.php` y funcionará correctamente.

## 📱 Pruebas

Antes de subir, verifica:

- [ ] El logo se muestra correctamente
- [ ] Todos los enlaces funcionan
- [ ] El formulario valida correctamente
- [ ] El menú móvil funciona
- [ ] Las animaciones se ejecutan al hacer scroll
- [ ] La página es responsive en diferentes tamaños de pantalla
- [ ] Los enlaces sociales están configurados

## 🌐 Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## 📝 Notas Importantes

- El formulario de contacto actualmente solo muestra un mensaje de éxito. Conéctalo a tu backend para funcionalidad completa.
- Asegúrate de agregar el logo antes de subir a producción.
- Las imágenes del sitio usan SVGs inline, no requieren archivos adicionales excepto el logo.

## 📞 Soporte

Para cualquier duda o mejora, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Grupo PMKT**

