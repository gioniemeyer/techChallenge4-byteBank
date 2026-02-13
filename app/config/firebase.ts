import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// Configure suas credenciais do Firebase aqui
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy_key_configure_env_local',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dummy-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
};

// Log de aviso se credenciais não estão configuradas
if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === undefined && typeof window === 'undefined') {
  console.warn(
    '⚠️  Firebase não está configurado. Crie um arquivo .env.local com as credenciais do Firebase.'
  );
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth: Auth = getAuth(app);

export default app;
