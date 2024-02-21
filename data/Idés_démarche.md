# Idés streaming musical

- ##### Web sockets - pour ouvrir un canal et permettre échanges de donnés sans réinitialiser la connexion
    - Peut être pertinent pour le streaming audio, envoyer les fichier petits à petit
    - Pertinent pour certaines mises à jour en temps réel (Nombre de likes sur une musique, nombre de vues...)
- ##### Il faudrais sans doute diviser le fichier en morceaux de quelques secondes. Sans doute les stocker dans un dossier et que chaque fichiers soient numérotés (1er fichier à lire s'appelle 1, le deuxième 2...) et stocker dans la BDD le nombre de morceaux et le nom du dossier qui sera random.
- ##### Protocole HSL et DASH peuvent etre pertinents
