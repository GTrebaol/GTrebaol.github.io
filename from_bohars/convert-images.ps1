# Vérifier si ImageMagick est installé
$magickPath = "C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe"
if (-not (Test-Path $magickPath)) {
    Write-Host "ImageMagick n'est pas trouvé à l'emplacement attendu: $magickPath"
    exit 1
}

# Créer un dossier pour les images WebP si nécessaire
$webpFolder = "images/webp"
if (-not (Test-Path $webpFolder)) {
    New-Item -ItemType Directory -Path $webpFolder
}

# Fonction pour convertir une image en WebP
function Convert-ToWebP {
    param (
        [string]$inputPath,
        [string]$outputPath,
        [int]$quality = 80
    )
    
    Write-Host "Conversion de $inputPath en WebP..."
    & $magickPath convert $inputPath -quality $quality -resize "1920x1080>" $outputPath
}

# Liste des images à convertir
$images = @(
    @{
        input = "images/front.png"
        output = "images/webp/front.webp"
    },
    @{
        input = "images/history.png"
        output = "images/webp/history.webp"
    },
    @{
        input = "images/plateau.png"
        output = "images/webp/plateau.webp"
    },
    @{
        input = "images/horizontal-baseline-noir.jpg"
        output = "images/webp/horizontal-baseline-noir.webp"
    },
    @{
        input = "images/horizontal-fromagerie-fond.jpg"
        output = "images/webp/horizontal-fromagerie-fond.webp"
    },
    @{
        input = "images/logo-original.jpg"
        output = "images/webp/logo-original.webp"
    },
    @{
        input = "images/original-fond.jpg"
        output = "images/webp/original-fond.webp"
    },
    @{
        input = "images/symbole-fond.jpg"
        output = "images/webp/symbole-fond.webp"
    },
    @{
        input = "images/symbole-original.jpg"
        output = "images/webp/symbole-original.webp"
    }
)

# Convertir chaque image
foreach ($image in $images) {
    if (Test-Path $image.input) {
        Convert-ToWebP -inputPath $image.input -outputPath $image.output
    } else {
        Write-Host "Image non trouvée: $($image.input)"
    }
}

Write-Host "Conversion terminée !" 