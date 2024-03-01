import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import Error500 from './Error500';
import Message from '../components/Message/Message';
import './MusicPost.css';

export default function MusicPost() {
    const { t, i18n } = useTranslation();

    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find(row => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }

    const token = getCookie('token');

    function postMusic(e) {
        e.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form);

        if(formData.get('title') === '' || formData.get('music') === null){
            localStorage.setItem('error', t('MusicPost.nonCompleteForm'));
            window.location.href = '/music_post';
        }

        fetch('http://localhost:8000/api/publish-music', {
            method: 'POST',
            headers: {
                'Authorization':  token
            },
            body: formData
        })
        .then(response => {
            if(response.status !== 200){
                throw new Error('Erreur lors de la publication de la musique');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('message', t('MusicPost.success'));
            window.location.href = '/music_post';
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données:", error)
            return (
                <Error500 />
            )
        });
    }

    const [fileName, setFileName] = useState('');
    const fileInput = useRef(null);

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInput.current.click();
    };

    function handleFileChange(e) {
        setFileName(e.target.files[0].name);
    }

    return (
        <>
            <h1 className='music_post--title'>{t("MusicPost.title")}</h1>

            <Message />

            <form className='music_post--form' method='POST' encType='multipart/form-data'>
                <input className='music_post--form--title' type='text' name='title' placeholder={t("MusicPost.form.title")} />

                <button className='music_post--form--file' onClick={handleButtonClick}>{t('MusicPost.form.file')}</button>
                <p className='music_post--form--file_name'>{fileName}</p>

                <input type='file' ref={fileInput} style={{ display: 'none' }} name='music' onChange={handleFileChange} />

                <input className='music_post--form--submit' type='submit' value={t("MusicPost.form.submit")} onClick={postMusic} />
            </form>
        </>
    )
}