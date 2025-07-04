# 🐦 MiniX – Clon educativo de Twitter con React

MiniX es una aplicación web inspirada en Twitter, desarrollada con **React**, **Tailwind CSS** y **React Hooks**. Permite a los usuarios iniciar sesión, publicar tweets, dar likes, retweets, comentar, seguir a otros usuarios y explorar perfiles. Todo esto con una interfaz moderna y animaciones suaves gracias a **Framer Motion**.

---

## ✨ Características

- 🔐 **Autenticación simulada** con usuarios predefinidos
- 📝 **Publicación de tweets** con límite de 280 caracteres y contador visual
- ❤️ **Likes**, 🔄 **Retweets** y 💬 **Comentarios**
- 👤 **Perfiles de usuario** con estadísticas dinámicas
- ➕ **Sistema de seguimiento** entre usuarios con persistencia en `localStorage`
- 🔍 **Búsqueda y filtrado** de tweets por texto o usuario
- 🎨 **Interfaz responsiva** con Tailwind CSS
- 🎬 **Animaciones fluidas** con Framer Motion

---

## 🚀 Tecnologías utilizadas

- React
- Tailwind CSS
- Framer Motion
- localStorage

---

## 🧪 Usuarios disponibles

Puedes iniciar sesión con alguno de estos usuarios:

| Usuario        | Avatar | Rol     |
|----------------|--------|---------|
| `admin`        | 👑     | Admin   |
| `invitado`     | 👤     | Guest   |
| `eduardotec05` | 👨🏽‍💻   | Usuario |

---

## 📦 Instalación

1. Clona el repositorio:

```bash 
git clone https://github.com/tu-usuario/minix.git
cd minix
```
2. Instala las dependencias:
```bash 
npm install
```
3. Inicia el servidor de desarrollo:
```bash 
npm run dev
```
## 📁 Estructura del proyecto
```
src/
    ├── components/       # Componentes reutilizables (TweetCard, Navigation, etc.)
    ├── context/          # Contexto de autenticación
    ├── pages/            # Vistas principales (Home, Profile)
    ├── App.jsx           # Componente principal
    ├── main.jsx          # Punto de entrada
```
## 🧠 Aprendizajes
Este proyecto fue creado con fines educativos para practicar:

- Manejo de estado con useState, useEffect, useCallback
- Context API para autenticación
- Persistencia con localStorage
- Diseño de UI con Tailwind
- Animaciones con Framer Motion
