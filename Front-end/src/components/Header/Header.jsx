import { useTranslation } from 'react-i18next';
import '../../i18n';
import './Header.css';
import { useLocation } from 'react-router-dom';

export default function Header({ changeLanguage }) {

    const { t, i18n } = useTranslation();

    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find(row => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }
    
    // On récupert le cookie token et role
    const token = getCookie('token');
    const role = getCookie('role');

    const location = useLocation();

    const isHomeActive = (location.pathname === '/');
    const HomeClassName = isHomeActive ? 'header--nav--ul--li--a--active' : '';

    const isDiscoverActive = (location.pathname === '/discover');
    const DiscoverClassName = isDiscoverActive ? 'header--nav--ul--li--a--active' : '';

    const isPlaylistsActive = (location.pathname === '/playlists');
    const PlaylistsClassName = isPlaylistsActive ? 'header--nav--ul--li--a--active' : '';

    const isAccountActive = (location.pathname === '/account');
    const AccountClassName = isAccountActive ? 'header--nav--ul--li--a--active' : '';

    const isMusicActive = (location.pathname === '/music_post');
    const MusicClassName = isMusicActive ? 'header--nav--ul--li--a--active' : '';
    

    return (
        <header className="website--header">
            <svg width="400px" height="400px" viewBox="0 0 400 400" version="1.1" xmlns="http://www.w3.org/2000/svg" className="header--logo">
                <path d="M0 200C0 89.543 89.543 0 200 0C310.457 0 400 89.543 400 200C400 310.457 310.457 400 200 400C89.543 400 0 310.457 0 200Z" id="Oval" fill="#000000" fillRule="evenodd" stroke="none" />
                <path d="M133 92L204.122 189.891L191.987 198.708L120.865 100.817L133 92Z" id="Rectangle" fill="#FFFFFF" fillRule="evenodd" stroke="none" />
                <path d="M196 12L204 12L204 204L196 204L196 12Z" id="Rectangle-3" fill="#FFFFFF" fillRule="evenodd" stroke="none" />
            </svg>

            <nav className="website--header--nav">
                <ul className='header--nav--ul'>
                    <li className='login--header--nav--ul--li'><a className={`login--header--nav--ul--li--a ${HomeClassName}`} href="/">{t("header.home")}</a></li>
                    <li className='login--header--nav--ul--li'><a className={`login--header--nav--ul--li--a ${DiscoverClassName}`} href="/discover">{t("header.discover")}</a></li>
                    <li className='login--header--nav--ul--li'><a className={`login--header--nav--ul--li--a ${PlaylistsClassName}`} href="/playlists">{t("header.playlists")}</a></li>
                    <li className='login--header--nav--ul--li'><a className={`login--header--nav--ul--li--a ${AccountClassName}`} href="/account">{t("header.account")}</a></li>
                    {role === "2" || role === "4" ? <li className='login--header--nav--ul--li'><a className={`login--header--nav--ul--li--a ${MusicClassName}`} href="/music_post">{t("header.music")}</a></li> : null}
                    {role === "4" ? <li className='login--header--nav--ul--li'><a className='login--header--nav--ul--li--a' href="http://localhost:8000/admin">{t("header.admin")}</a></li> : null}
                    <li className='header--nav--ul--li header--nav--ul--li--space'><a className={`header--nav--ul--li--a ${i18n.language === 'en' ? 'header--nav--ul--li--a--active' : ''}`} onClick={(e) => { e.preventDefault(); changeLanguage('en'); }} href="#">English</a></li>
                    <li className='header--nav--ul--li'><a className={`header--nav--ul--li--a ${i18n.language === 'fr' ? 'header--nav--ul--li--a--active' : ''}`} onClick={(e) => { e.preventDefault(); changeLanguage('fr'); }} href="#">Français</a></li>
                </ul>
            </nav>

        </header>
    );
}