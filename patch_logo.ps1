$logoB64 = Get-Content 'c:\Users\hp\diar_shahama\logo_b64.txt' -Raw
$logoB64 = $logoB64.Trim()
$dataUrl = "data:image/png;base64,$logoB64"

# Update index.html
$indexFile = 'c:\Users\hp\diar_shahama\index.html'
$indexContent = Get-Content $indexFile -Raw
# Replace the src of splash-logo-img
$indexContent = $indexContent -replace 'id="splash-logo-img" src="[^"]*"', "id=`"splash-logo-img`" src=`"$dataUrl`""

# Inject immediate cache-loading script if not present
if ($indexContent -notlike "*settings.logo*") {
    $scriptSnippet = @"
                <script>
                    try {
                        const settings = JSON.parse(localStorage.getItem('luxury-settings-cache') || '{}');
                        if (settings && settings.logo) {
                            document.getElementById('splash-logo-img').src = settings.logo;
                        }
                    } catch (e) {}
                </script>
"@
    $indexContent = $indexContent -replace '(<img[^>]*id="splash-logo-img"[^>]*>)', "`$1`n$scriptSnippet"
}

$indexContent | Set-Content $indexFile

# Update src/main.js
$mainFile = 'c:\Users\hp\diar_shahama\src\main.js'
$mainContent = Get-Content $mainFile -Raw
# Replace "logo.jpg" and 'logo.jpg' where they appear as defaults
$mainContent = $mainContent -replace '"logo\.jpg"', "`"$dataUrl`""
$mainContent = $mainContent -replace "'logo\.jpg'", "'$dataUrl'"
$mainContent | Set-Content $mainFile

Write-Host "Logo patched successfully in index.html and main.js (including cache-bust script)"
