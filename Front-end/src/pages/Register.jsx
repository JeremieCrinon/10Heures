import { useTranslation } from 'react-i18next';
import '../i18n';
import './Register.css';
import { redirect } from 'react-router-dom';

export default function Register(){
    const { t, i18n } = useTranslation();

    function register(){
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const password_confirmation = document.querySelector('input[name="password_confirmation"]').value;
        
        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, password_confirmation })
        })
        .then(response => {
            if(response.status !== 201){
                window.location.href = '/register';
            }
            return response.json();
        })
        .then(data => {
                localStorage.setItem('message', t('register.success'));
                // localStorage.setItem('message', 'Votre compte a bien été créé');
                window.location.href = '/login';
        })
    }

    return (
        <>
            <h1 className='register--title'>{t('register.title')}</h1>

            <form method='POST' className='register--form'>
                <input className='register--form--input' type='text' name='name' placeholder={t('register.name')} />
                <input className='register--form--input' type='text' name='email' placeholder='email' />
                <input className='register--form--input' type='password' name='password' placeholder={t('register.password')} />
                <input className='register--form--input' type='password' name='password_confirmation' placeholder={t('register.password_confirmation')} />
                <input className='register--form--confirm' type='submit' value={t('register.submit')} onClick={(e) => { e.preventDefault(); register()}} />
            </form>
        </>
        
    );
}