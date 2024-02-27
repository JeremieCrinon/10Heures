import { useTranslation } from 'react-i18next';
import '../i18n';
import './NoPage.css';

export default function NoPage(){
    const { t, i18n } = useTranslation();

    function redirectToHome(){
        window.location.href = "/";
    }

    return (
        <>
            <h1>{t(404)}</h1>
            <svg className='octopus--svg' onClick={redirectToHome} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path d="M455.6 349.2c-45.9-39.1-36.7-77.9-16.1-128.1C475.2 134 416 34.1 329.9 8.3 237-19.6 134.3 24.3 99.7 117.1a180.9 180.9 0 0 0 -11 73.5c1.7 29.5 14.7 53 24.1 80.3 17.2 50.2-28.1 92.7-66.7 117.6-46.8 30.2-36.3 39.9-8.4 41.9 23.4 1.7 44.5-4.5 65.3-15 9.2-4.6 40.7-18.9 45.1-28.6C135.9 413.4 111.1 459.5 126.6 488.9c19.1 36.2 67.1-31.8 76.7-45.8 8.6-12.6 43-81.3 63.6-46.9 18.9 31.4 8.6 76.4 35.7 104.6 32.9 34.2 51.2-18.3 51.4-44.2 .2-16.4-6.1-95.9 29.9-59.9C405.4 418 436.9 467.8 472.6 463.6c38.7-4.5-22.1-68-28.3-78.7 5.4 4.3 53.7 34.1 53.8 9.5C498.2 375.7 468 359.8 455.6 349.2z"/></svg>

        </>
        
    );
}