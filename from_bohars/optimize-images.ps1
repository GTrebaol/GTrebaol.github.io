# Vérifier si ImageMagick est installé
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Host "ImageMagick n'est pas installé. Veuillez l'installer depuis https://imagemagick.org/script/download.php"
    exit 1
}

# Fonction pour obtenir la taille d'une image en Ko
function Get-ImageSize {
    param (
        [string]$imagePath
    )
    $file = Get-Item $imagePath
    return [math]::Round($file.Length / 1KB, 2)
}

# Fonction pour optimiser une image
function Optimize-Image {
    param (
        [string]$inputPath,
        [string]$outputPath,
        [int]$maxSizeKB = 500,
        [int]$quality = 80
    )
    
    $inputFile = Get-Item $inputPath
    $currentSize = Get-ImageSize $inputPath
    $currentQuality = $quality
    
    Write-Host "Optimisation de $($inputFile.Name) (Taille actuelle: $currentSize KB)"
    
    # Si l'image est déjà plus petite que la taille maximale, on la copie simplement
    if ($currentSize -le $maxSizeKB) {
        Copy-Item $inputPath $outputPath
        Write-Host "Image déjà optimisée, copiée vers $outputPath"
        return
    }
    
    # Boucle d'optimisation
    while ($currentSize -gt $maxSizeKB -and $currentQuality -gt 20) {
        # Conversion avec les paramètres actuels
        magick convert $inputPath `
            -strip `
            -resize "1920x1080>" `
            -quality $currentQuality `
            -define webp:method=6 `
            -define webp:sharpness=0 `
            -define webp:lossless=false `
            $outputPath
        
        $currentSize = Get-ImageSize $outputPath
        Write-Host "Taille après optimisation: $currentSize KB (Qualité: $currentQuality)"
        
        # Si l'image est toujours trop grande, on réduit la qualité
        if ($currentSize -gt $maxSizeKB) {
            $currentQuality -= 5
        }
    }
    
    if ($currentSize -gt $maxSizeKB) {
        Write-Host "ATTENTION: Impossible d'optimiser l'image en dessous de $maxSizeKB KB"
    } else {
        Write-Host "Image optimisée avec succès (Taille finale: $currentSize KB, Qualité: $currentQuality)"
    }
}

# Créer un dossier temporaire pour les images optimisées
$tempDir = "images/optimized"
if (-not (Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir
}

# Traiter toutes les images dans le dossier images et ses sous-dossiers
Get-ChildItem -Path "images" -Recurse -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|webp)$' } | ForEach-Object {
    $relativePath = $_.FullName.Substring($PWD.Path.Length + 1)
    $outputPath = Join-Path $tempDir $relativePath
    
    # Créer le dossier de destination s'il n'existe pas
    $outputDir = Split-Path $outputPath
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force
    }
    
    Optimize-Image $_.FullName $outputPath
}

Write-Host "`nOptimisation terminée ! Les images optimisées sont dans le dossier $tempDir"
Write-Host "Vérifiez les images optimisées avant de les remplacer dans le dossier original." 