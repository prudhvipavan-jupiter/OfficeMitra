# Set POSTGRES_URL locally and on Vercel, then redeploy.
# Usage:
#   .\scripts\set-postgres-url.ps1 "postgresql://user:pass@host/db?sslmode=require"

param(
  [Parameter(Mandatory = $true)]
  [string]$Url
)

$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-Location (Split-Path $PSScriptRoot -Parent)

if ($Url -notmatch "^postgres") {
  throw "URL must start with postgresql:// or postgres://"
}

Write-Host "Updating local .env..." -ForegroundColor Cyan
$envFile = Join-Path $PWD ".env"
if (Test-Path $envFile) {
  $lines = Get-Content $envFile
  $found = $false
  $lines = $lines | ForEach-Object {
    if ($_ -match "^POSTGRES_URL=") {
      $found = $true
      "POSTGRES_URL=$Url"
    } else {
      $_
    }
  }
  if (-not $found) {
    $lines += "POSTGRES_URL=$Url"
  }
  $lines | Set-Content $envFile -Encoding utf8
} else {
  "POSTGRES_URL=$Url" | Set-Content $envFile -Encoding utf8
}

Write-Host "Updating Vercel env (production, preview, development)..." -ForegroundColor Cyan
foreach ($envName in @("production", "preview", "development")) {
  echo $Url | vercel env add POSTGRES_URL $envName --force | Out-Null
}

Write-Host "Redeploying production..." -ForegroundColor Green
vercel deploy --prod --yes

Write-Host "Done. POSTGRES_URL is set." -ForegroundColor Green
