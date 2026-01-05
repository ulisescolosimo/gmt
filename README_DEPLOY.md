# 🚀 Guía de Despliegue en Vercel

Este sitio web está listo para ser desplegado en Vercel. Aquí tienes las opciones disponibles:

## Opción 1: Despliegue mediante GitHub (Recomendado)

### Paso 1: Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. Sube todos los archivos de la carpeta `GMT` al repositorio

### Paso 2: Conectar con Vercel

1. Ve a [Vercel](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "Add New Project"
4. Selecciona tu repositorio
5. Vercel detectará automáticamente que es un sitio estático
6. Haz clic en "Deploy"

¡Listo! Tu sitio estará online en menos de un minuto.

---

## Opción 2: Despliegue directo con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Desplegar

1. Abre la terminal en la carpeta `GMT`
2. Ejecuta:

```bash
vercel
```

3. Sigue las instrucciones en pantalla
4. Para producción, ejecuta:

```bash
vercel --prod
```

---

## Opción 3: Despliegue mediante drag & drop

1. Ve a [Vercel](https://vercel.com)
2. Inicia sesión
3. Haz clic en "Add New Project"
4. Selecciona "Upload" o "Import"
5. Arrastra la carpeta `GMT` o comprímela en ZIP y súbela

---

## 🔧 Configuración

El archivo `vercel.json` ya está configurado con:
- Headers de seguridad
- Cacheo optimizado para assets estáticos
- Rewrites para SPA (si es necesario en el futuro)

## 📝 Variables de Entorno

Si en el futuro necesitas variables de entorno, puedes agregarlas en:
- Vercel Dashboard → Project Settings → Environment Variables

## 🌐 Dominio Personalizado

Para usar un dominio personalizado:
1. Ve a Vercel Dashboard → Project Settings → Domains
2. Agrega tu dominio
3. Sigue las instrucciones para configurar DNS

---

## 🔄 Actualizaciones

Con GitHub (Opción 1):
- Cada push a la rama principal desplegará automáticamente
- Vercel creará un preview para cada pull request

Con CLI (Opción 2):
- Ejecuta `vercel --prod` cada vez que quieras actualizar

---

## 📦 Alternativas

Si prefieres otros servicios:

### Netlify
- Similar a Vercel, también soporta drag & drop
- URL: https://netlify.com

### GitHub Pages
- Gratis para repositorios públicos
- URL: https://pages.github.com

### Cloudflare Pages
- Rápido y gratuito
- URL: https://pages.cloudflare.com

---

## ⚡ Características de Vercel

✅ **Gratis** para proyectos personales
✅ **HTTPS automático**
✅ **CDN global** (rápido en todo el mundo)
✅ **Deploy instantáneo**
✅ **Preview deployments** para cada cambio
✅ **Analytics** opcional
✅ **Dominio personalizado** fácil de configurar

---

¿Necesitas ayuda? Consulta la [documentación de Vercel](https://vercel.com/docs)


