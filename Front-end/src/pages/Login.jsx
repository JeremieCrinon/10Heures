import { useTranslation } from 'react-i18next';
import '../i18n';
import './Login.css';
// import '../index.css';
import Message from '../components/Message/Message'
import { useLocation } from 'react-router-dom';

export default function Login(){
    const { t, i18n } = useTranslation();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let token = query.get('token');

    if(token !== null){
        fetch('http://localhost:8000/api/verify-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        }).then(response => {
            if(response.status !== 200){
                localStorage.setItem('error', 'Erreur lors de la vérification de votre email');
                window.location.href = '/login';
            }
            return response.json();
        }).then(data => {
            localStorage.setItem('message', 'Votre email a bien été vérifié');
            window.location.href = '/login';
        })
    }

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
            if(response.status === 403){
                alert('Veuillez vérifier votre email avant de vous connecter.');
                // console.log(response);
                throw new Error('Veuillez vérifier votre email avant de vous connecter.');
            }
            else if(response.status !== 200){
                alert('Email ou mot de passe incorrect');
                throw new Error('Email ou mot de passe incorrect');
            } else {
                return response.json();
            }
            
        })
        .then(data => {
                // localStorage.setItem('token', data.token);
                // localStorage.setItem('role', data.role);
                // On stocke le token dans un cookie
                document.cookie = `token=${data.token}`;
                document.cookie = `role=${data.role}`;
                window.location.href = '/';
        })
        .catch(error => {
            console.error('Erreur:', error);
        })
    }


    return (
        <>
            <h1 className='login--title'>{t('login.title')}</h1>

            <Message />

            <form method='POST' className='login--form'>
                <input className='login--form--input' type='text' name='email' placeholder='email' />
                <input className='login--form--input' type='password' name='password' placeholder={t('login.password')} />
                <input className='login--form--confirm' type='submit' value={t('login.submit')} onClick={(e) => { e.preventDefault(); login()}} />
            </form>
        </>
        
        
        
    );
}