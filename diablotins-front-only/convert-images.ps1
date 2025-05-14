# Vérifier si ImageMagick est installé
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Host "ImageMagick n'est pas installé. Veuillez l'installer depuis https://imagemagick.org/script/download.php"
    exit 1
}

# Définir les chemins principaux
$sourceDir = "assets/images/chaussures"
$targetDir = Join-Path $sourceDir "webp" # Sera assets/images/chaussures/webp

Write-Host "Vérification du script :"
Write-Host "Répertoire de travail actuel : $(Get-Location)"
Write-Host "Dossier source configuré : $sourceDir"
Write-Host "Dossier cible configuré : $targetDir"

if (Test-Path $sourceDir) {
    Write-Host "Le dossier source '$sourceDir' existe."
} else {
    Write-Host "ERREUR : Le dossier source '$sourceDir' N'EXISTE PAS ou n'est pas accessible depuis '$(Get-Location)'."
    exit 1
}

# Créer le dossier webp cible s'il n'existe pas
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir
    Write-Host "Dossier $targetDir créé."
}

# Fonction pour convertir une image en WebP avec optimisation
function Convert-ImageToWebP {
    param (
        [string]$inputPath,    # Chemin complet de l'image source
        [string]$outputFilePath # Chemin complet où sauvegarder l'image WebP
    )
    
    Write-Host "Conversion de $(Split-Path $inputPath -Leaf) en WebP vers $outputFilePath..."
    
    $quality = 80
    $method = 6
    $sharpness = 0
    
    $params = @(
        "convert",
        $inputPath,
        "-auto-orient",
        "-strip",
        "-resize", "1920x1080>",
        "-quality", $quality,
        "-define", "webp:method=$method",
        "-define", "webp:sharpness=$sharpness",
        "-define", "webp:lossless=false",
        $outputFilePath
    )
    & magick $params
}

# Traiter les images directement dans $sourceDir
Write-Host "Traitement des images du dossier $sourceDir..."
$imagesToProcess = Get-ChildItem -Path $sourceDir -File | Where-Object { $_.Extension -eq ".jpg" -or $_.Extension -eq ".jpeg" -or $_.Extension -eq ".png" }
Write-Host "Nombre d'images trouvées à traiter : $($imagesToProcess.Count)"

if ($imagesToProcess.Count -eq 0) {
    Write-Host "Aucune image .jpg, .jpeg, ou .png n'a été trouvée dans $sourceDir."
    Write-Host "Vérifiez le chemin et les extensions des fichiers."
}

$imagesToProcess | ForEach-Object {
    $outputFileName = "$($_.BaseName).webp"
    $fullOutputFilePath = Join-Path $targetDir $outputFileName
    Convert-ImageToWebP $_.FullName $fullOutputFilePath
}

Write-Host "Conversion et optimisation terminées ! Les fichiers WebP sont dans $targetDir." 