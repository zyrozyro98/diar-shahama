@echo off
chcp 65001 > nul
echo ===================================================
echo   جاري تحضير موقع ديار الشهامة للنشر على Firebase...
echo   Preparing Diar Al Shahama Website for Firebase Deployment...
echo ===================================================
echo.

echo [1/2] Building Production Version...
call cmd /c "npm run build"
if %ERRORLEVEL% NEQ 0 (
    echo Build Failed!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Uploading to Firebase Hosting...
echo.
call firebase deploy --only hosting

echo.
echo ===================================================
echo   تمت العملية! تفقد الرابط في المخرجات أعلاه.
echo   Operation Complete! Check the link in the output above.
echo ===================================================
pause
