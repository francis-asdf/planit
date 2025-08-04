import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import Planit from './Planit.jsx'
import StartPage from './components/startpage/StartPage.jsx'

const CLIENT_ID = '2356713209-d8qsruogf2ef2ls7uje10uif38dg43d8.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <StartPage />
    </GoogleOAuthProvider>
  </StrictMode>,
)
