@echo off
setlocal enabledelayedexpansion

REM Définir le chemin où les fichiers seront créés
set "chemin=C:\Users\kmqlz\OneDrive\Documents\VivaFleurs\Image-shooting\wetransfer_plante-trie_2024-01-18_0843\plante-trie"

REM Boucler de 1 à 100 pour créer les dossiers
for /L %%i in (1,1,100) do (
    set "nomDossier=!chemin!\Dossier%%i"
    mkdir "!nomDossier!"
    echo Dossier %%i créé.
)

echo Tous les fichiers ont été créés.
pause