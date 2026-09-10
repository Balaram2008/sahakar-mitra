Write-Host "========================================================" -ForegroundColor Green
Write-Host "Starting Sahakara Mitra Cooperative AI Web & Kiosk Portal..." -ForegroundColor Yellow
Write-Host "Covering all 28 States & Ministry of Cooperation" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Green
if (Get-Command py -ErrorAction SilentlyContinue) {
    py -3 server.py
} else {
    python server.py
}