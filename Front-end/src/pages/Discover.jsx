import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';

export default function Discover(){
    
    const { t, i18n } = useTranslation();

    return (
        <h1>Discover</h1>
    );
}