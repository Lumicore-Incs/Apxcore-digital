import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'aos/dist/aos.css';
import AOS from 'aos';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Initialize AOS after the app mounts
setTimeout(() => {
  AOS.init({ duration: 1000, once: false, easing: 'ease-in-out' });
}, 50);
