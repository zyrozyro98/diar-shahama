$logoB64 = Get-Content 'c:\Users\hp\diar_shahama\logo_b64.txt' -Raw
$logoB64 = $logoB64.Trim()
$dataUrl = "data:image/jpeg;base64,$logoB64"

# Update index.html
$indexContent = Get-Content 'c:\Users\hp\diar_shahama\index.html' -Raw
$indexContent = $indexContent -replace 'logo\.jpg', $dataUrl
$indexContent | Set-Content 'c:\Users\hp\diar_shahama\index.html'

# Update src/main.js
$mainContent = Get-Content 'c:\Users\hp\diar_shahama\src\main.js' -Raw
# Replace "logo.jpg" and 'logo.jpg' where they appear as defaults
$mainContent = $mainContent -replace '"logo\.jpg"', "`"$dataUrl`""
$mainContent = $mainContent -replace "'logo\.jpg'", "'$dataUrl'"
$mainContent | Set-Content 'c:\Users\hp\diar_shahama\src\main.js'

Write-Host "Logo patched successfully in index.html and main.js"
