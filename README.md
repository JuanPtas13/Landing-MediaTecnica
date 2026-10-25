# Kronos Gate

Landing informativa de Kronos Gate, la aplicación de control de asistencia y
gestión escolar. Está construida con HTML, CSS y JavaScript nativos y Vite como
servidor de desarrollo y herramienta de compilación; no reutiliza archivos
internos del frontend ni del backend existente ni se conecta al backend.

## Requisitos

- Node.js 18 o superior
- npm

## Desarrollo

Desde esta carpeta:

```powershell
npm install
npm run dev
```

La landing queda disponible en `http://localhost:4174`, separada del frontend
funcional que utiliza el puerto `5173`. Para generar y previsualizar el build:

```powershell
npm run build
npm run preview
```

La vista previa del build queda en `http://localhost:4175`.

## Despliegue en Vercel

El repositorio está configurado para que Vercel detecte Vite, instale las
dependencias con npm y publique `dist` después de `npm run build`.

1. Importa `JuanPtas13/Landing-MediaTecnica` en Vercel.
2. Deja el directorio raíz como `.` (la aplicación está en la raíz de este
   repositorio).
3. Comprueba estos ajustes del proyecto:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Despliega la rama `main`. Los despliegues posteriores se harán al actualizar
   esa rama en GitHub.

No se requieren variables de entorno para el despliegue normal. Si necesitas
cambiar la URL destino de los botones, define `VITE_APP_URL` en la configuración
del proyecto de Vercel y vuelve a desplegar.

## Enlace a la aplicación

Los botones de acceso apuntan de forma predeterminada a
`https://media-tecnica-frontend.vercel.app/`. Para apuntar a otro despliegue,
establece `VITE_APP_URL` en el entorno antes de iniciar Vite o generar el build.
Por ejemplo, en PowerShell:

```powershell
$env:VITE_APP_URL = "https://tu-dominio.example/"
npm run build
```

No se incluye ningún endpoint de backend ni credenciales en esta landing.

## Formulario de contacto

El formulario envía nombre, institución, correo, teléfono opcional, motivo y
mensaje a `juanraze.13@gmail.com` mediante el servicio externo FormSubmit. Se
requiere aceptar el aviso antes de enviar; los campos obligatorios se validan
en el navegador, y se bloquea el botón mientras la solicitud está en proceso.
El primer envío puede requerir confirmar la dirección del destinatario desde el
correo de activación de FormSubmit. Hasta completar esa activación, el proveedor
puede rechazar los envíos. Los datos son procesados por ese servicio para
entregar el correo.

## Contenido

- Presentación del sistema y vista ilustrativa del panel, sin datos inventados.
- Módulos respaldados por el proyecto para administración, docentes y vigilancia.
- Flujo de organización, registro de ingreso y consulta de asistencia.
- Formulario de contacto conectado con el correo de Kronos Gate.
- Enlaces de acceso centralizados mediante `VITE_APP_URL`.
