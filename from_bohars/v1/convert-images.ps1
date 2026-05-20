# Vérifier si ImageMagick est installé
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Host "ImageMagick n'est pas installé. Veuillez l'installer depuis https://imagemagick.org/script/download.php"
    exit 1
}

# Créer le dossier webp s'il n'existe pas
$webpDir = "images/webp"
if (-not (Test-Path $webpDir)) {
    New-Item -ItemType Directory -Path $webpDir
}

# Fonction pour convertir une image en WebP avec optimisation
function Convert-ToWebP {
    param (
        [string]$inputPath,
        [string]$outputPath,
        [string]$folderName
    )
    
    $inputFile = Get-Item $inputPath
    $outputFile = Join-Path $outputPath "$folderName-$($inputFile.BaseName).webp"
    
    Write-Host "Conversion de $($inputFile.Name) en WebP..."
    
    # Optimisation des paramètres pour WebP
    $quality = 80
    $method = 6  # Niveau de compression (0-6)
    $sharpness = 0  # Niveau de netteté
    
    # Conversion avec optimisation
    magick convert $inputPath `
        -strip `  # Supprime les métadonnées
        -resize "1920x1080>" `  # Redimensionne si plus grand que 1920x1080
        -quality $quality `
        -define webp:method=$method `
        -define webp:sharpness=$sharpness `
        -define webp:lossless=false `
        $outputFile
}

# Fonction pour renommer les images dans un dossier
function Rename-ImagesInFolder {
    param (
        [string]$folderPath
    )
    
    $folderName = (Get-Item $folderPath).Name
    $images = Get-ChildItem -Path $folderPath -File | Where-Object { $_.Extension -match '\.(webp)$' }
    $counter = 1
    
    foreach ($image in $images) {
        $newName = "$folderName-$counter.webp"
        $newPath = Join-Path $folderPath $newName
        Write-Host "Renommage de $($image.Name) en $newName"
        Rename-Item -Path $image.FullName -NewName $newName -Force
        $counter++
    }
}

# Traiter les images dans le dossier principal
Get-ChildItem -Path "images" -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' } | ForEach-Object {
    Convert-ToWebP $_.FullName $webpDir "main"
}

# Liste des sous-dossiers à traiter
$subFolders = @("buffet", "cave", "plateau", "epicerie")

# Traiter chaque sous-dossier
foreach ($subFolder in $subFolders) {
    $sourceDir = Join-Path "images" $subFolder
    $targetDir = Join-Path $webpDir $subFolder
    
    # Vérifier si le dossier source existe
    if (Test-Path $sourceDir) {
        Write-Host "Traitement du dossier $subFolder..."
        
        # Créer le sous-dossier webp s'il n'existe pas
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir
        }
        
        # Convertir les images du sous-dossier
        Get-ChildItem -Path $sourceDir -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' } | ForEach-Object {
            Convert-ToWebP $_.FullName $targetDir $subFolder
        }
        
        # Renommer les images converties
        Write-Host "Renommage des images dans le dossier $subFolder..."
        Rename-ImagesInFolder $targetDir
    } else {
        Write-Host "Le dossier $sourceDir n'existe pas"
    }
}

Write-Host "Conversion et optimisation terminées !" 