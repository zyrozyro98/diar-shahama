@echo off
chcp 65001 > nul
echo ===================================================
echo   جاري تحضير موقع ديار الشهامة للنشر...
echo   Preparing Diar Al Shahama Website for Deployment...
echo ===================================================
echo.

echo [1/3] Checking Internet Connection...
ping registry.npmjs.org -n 1 >nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo   [!] تحذير: يبدو أن هناك مشكلة في الاتصال بالإنترنت أو أن الموقع محجوب.
    echo   [!] Warning: Cannot reach npm registry. Check your internet connection.
    echo.
)

echo [2/3] Building Production Version...
call cmd /c "npm run build"
if %ERRORLEVEL% NEQ 0 (
    echo Build Failed!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Uploading to Free Hosting (Surge.sh)...
echo.
echo   >> سيطلب منك النظام الآن إدخال بياناتك:
echo   >> البريد: zyrozyro98@gmail.com
echo   >> كلمة المرور: 770088254
echo.

:: Try local surge first, then npx
if exist "node_modules\.bin\surge.cmd" (
    echo   Using local Surge...
    call .\node_modules\.bin\surge ./dist --domain diar-shahamh.surge.sh
) else (
    echo   Trying to install Surge locally first (more robust)...
    call npm install surge --no-save
    if exist "node_modules\.bin\surge.cmd" (
        call .\node_modules\.bin\surge ./dist --domain diar-shahamh.surge.sh
    ) else (
        echo   Fallback to npx...
        call npx surge ./dist --domain diar-shahamh.surge.sh
    )
)

echo.
echo ===================================================
echo   إذا ظهرت رسالة خطأ (ENOTFOUND)، يرجى التأكد من اتصال الإنترنت والمحاولة مجدداً.
echo   To retry, close this window and run the file again.
echo ===================================================
pause
