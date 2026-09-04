# Copies MERN custom SVG icons to Cursor extensions folder
# (Material Icon Theme reads custom icons from ~/.cursor/extensions/icons/)

$source = Join-Path $PSScriptRoot "icons"
$target = Join-Path $env:USERPROFILE ".cursor\extensions\icons"

if (-not (Test-Path $source)) {
    Write-Error "Icons folder not found: $source"
    exit 1
}

New-Item -ItemType Directory -Force -Path $target | Out-Null
Copy-Item -Path (Join-Path $source "*.svg") -Destination $target -Force

Write-Host "MERN icons copied to: $target"
Get-ChildItem $target -Filter "mern-*.svg" | ForEach-Object { Write-Host "  - $($_.Name)" }
