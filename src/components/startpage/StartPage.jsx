import { GoogleLogin } from '@react-oauth/google';
import './startPage.css'
import DarkMode from '../header/DarkMode';

export default function StartPage({ onLoginSuccess }) {
    return (
        <div className="start-page">
            <DarkMode />
            <h1 className="start-title">Welcome to Planit</h1>
            <p className="start-subtitle">Where time meets intention</p>
            <div className="google-login-container">
                <GoogleLogin
                    onSuccess={credentialResponse => onLoginSuccess(credentialResponse)}
                    onError={() => console.log("Login failed")}
                />
            </div>
        </div>
    )
}