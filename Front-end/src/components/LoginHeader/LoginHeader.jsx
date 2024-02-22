import { useTranslation } from 'react-i18next';
import '../../i18n';
import './LoginHeader.css';
import { useLocation } from 'react-router-dom';


export default function LoginHeader({ changeLanguage }){

    const { t, i18n } = useTranslation();
    const location = useLocation();

    const isLoginActive = (location.pathname === '/' || location.pathname === '/login');
    const LoginClassName = isLoginActive ? 'login--header--nav--ul--li--a--active' : '';

    const isRegisterActive = (location.pathname === '/register');
    const RegisterClassName = isRegisterActive ? 'login--header--nav--ul--li--a--active' : '';


    return (
        <header>
            <svg width="400px" height="400px" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" className="login--header--logo">
                <path d="M0 200C0 89.543 89.543 0 200 0C310.457 0 400 89.543 400 200C400 310.457 310.457 400 200 400C89.543 400 0 310.457 0 200Z" id="Oval" fill="#000000" fillRule="evenodd" stroke="none" />
                <path d="M133 92L204.122 189.891L191.987 198.708L120.865 100.817L133 92Z" id="Rectangle" fill="#FFFFFF" fillRule="evenodd" stroke="none" />
                <path d="M196 12L204 12L204 204L196 204L196 12Z" id="Rectangle-3" fill="#FFFFFF" fillRule="evenodd" stroke="none" />
            </svg>

            <nav className="login--header--nav">
                <ul className='login--header--nav--ul'>
                    <li className='login--header--nav--ul--li'><a className={`login--header--nav--ul--li--a ${LoginClassName}`} href="/login">{t('loginHeader.login')}</a></li>
                    <li className='login--header--nav--ul--li'><a className={`login--header--nav--ul--li--a ${RegisterClassName}`} href="/register">{t('loginHeader.register')}</a></li>
                    <li className='login--header--nav--ul--li login--header--nav--ul--li--space'><a className={`login--header--nav--ul--li--a ${i18n.language === 'en' ? 'login--header--nav--ul--li--a--active' : ''}`} onClick={(e) => { e.preventDefault(); changeLanguage('en'); }} href="#">English</a></li>
                    <li className='login--header--nav--ul--li'><a className={`login--header--nav--ul--li--a ${i18n.language === 'fr' ? 'login--header--nav--ul--li--a--active' : ''}`} onClick={(e) => { e.preventDefault(); changeLanguage('fr'); }} href="#">Français</a></li>
                </ul>
            </nav>

        </header>
    );
};