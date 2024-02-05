@echo off
setlocal enabledelayedexpansion

REM Définir le chemin où les fichiers seront créés
set "chemin=C:\Users\minog\OneDrive\Bureau\Stage\Site\VivaFleurs\VivaFleurs\image\Image-shooting\fleur-unique"

REM Boucler de 1 à 100 pour créer les dossiers
for /L %%i in (1,1,100) do (
    set "nomDossier=!chemin!\Dossier%%i"
    mkdir "!nomDossier!"
    echo Dossier %%i créé.
)

echo Tous les fichiers ont été créés.
pause