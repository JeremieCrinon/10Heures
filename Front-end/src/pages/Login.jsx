import { useTranslation } from 'react-i18next';
import '../i18n';
import './Login.css';
// import '../index.css';

export default function Login(){
    const { t, i18n } = useTranslation();

    function login(){
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if(response.status !== 200){
                alert('Email ou mot de passe incorrect');
                throw new Error('Email ou mot de passe incorrect');
            }
            return response.json();
        })
        .then(data => {
                // localStorage.setItem('token', data.token);
                // localStorage.setItem('role', data.role);
                // On stocke le token dans un cookie
                document.cookie = `token=${data.token}`;
                document.cookie = `role=${data.role}`;
                window.location.href = '/';
        })
    }


    return (
        <>
            <h1 className='login--title'>{t('login.title')}</h1>

            <form method='POST' className='login--form'>
                <input className='login--form--input' type='text' name='email' placeholder='email' />
                <input className='login--form--input' type='password' name='password' placeholder={t('login.password')} />
                <input className='login--form--confirm' type='submit' value={t('login.submit')} onClick={(e) => { e.preventDefault(); login()}} />
            </form>
        </>
        
        
        
    );
}