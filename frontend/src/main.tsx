import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProfileProvider } from './contexts/ProfileContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(

   <ProfileProvider>
    <App />
    </ProfileProvider>


)
