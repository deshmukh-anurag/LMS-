import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "../index.css";
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { ToastContainer } from 'react-toastify'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> 
      <AppContextProvider>
        <App />
        <ToastContainer />
      </AppContextProvider>
    </ClerkProvider>
  </BrowserRouter>

)
