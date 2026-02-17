# GruasApp

Aplicación móvil desarrollada con **React Native + Expo** que permite a los usuarios solicitar servicios de gruas, autenticarse mediante Firebase y visualizar ubicaciones en un mapa interactivo.

---

## Descripción

**GruasApp** es una aplicación móvil orientada a la gestión y solicitud de servicios de gruas.  

Permite a los usuarios:

- Registrarse e iniciar sesión
- Validar credenciales mediante Firebase Authentication
- Visualizar ubicaciones en un mapa
- Consumir datos desde una API externa
- Proceder a una pantalla de pago

La aplicación implementa una arquitectura modular separando navegación, servicios y pantallas.

---

## Tecnologías Utilizadas

- React Native  
- Expo  
- Firebase Authentication  
- React Navigation  
- React Native Maps  
- JavaScript / TypeScript  

---

## Estructura del Proyecto

```
GruasApp/

screens/
LoginScreen.js
RegisterScreen.js
MapScreen.js
PaymentScreen.js

navigation/
AppNavigator.js

service/
apiService.js
authService.js

firebaseConfig.js

App.js
package.json
```

---

## Requisitos Previos

- Node.js (LTS recomendado)
- npm o yarn
- Expo CLI
- Cuenta activa en Firebase
- Dispositivo físico con Expo Go o emulador Android/iOS

---

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/amamorgan/GruasApp
cd GruasApp
```

### Instalar dependencias

```bash
npm install
```

Dependencias principales:

```bash
npm install firebase
npx expo install @react-native-async-storage/async-storage
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-maps
```

---

## Configuración de Firebase

1. Crear un proyecto en Firebase.
2. Habilitar Authentication Email/Password.
3. Registrar la aplicación.
4. Copiar el SDK generado en el archivo `firebaseConfig.js`.

Ejemplo básico:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
		apiKey: "TU_API_KEY",
        authDomain: "TU_AUTH_DOMAIN",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## Ejecutar la Aplicación

```bash
npx expo start
```

Escanear el codigo QR con Expo Go o ejecutar en un emulador.

---

## Funcionalidades Implementadas

- Registro de usuario mediante correo electrónico y contraseña
- Inicio de sesión con validación de credenciales
- Manejo de errores en campos vacíos
- Persistencia de sesión
- Integración con API externa
- Visualización de marcadores en mapa
- Navegación entre pantallas
- Pantalla de solicitud de servicio
- Pantalla de pagos

---

## Flujo General de la Aplicación

1. El usuario se registra o inicia sesión.
2. El sistema valida credenciales con Firebase.
3. Se muestra la pantalla principal de solicitud de servicio.
4. Se consumen datos desde API externa.
5. Se cargan marcadores en el mapa.
6. El usuario puede proceder a la pantalla de pago.
