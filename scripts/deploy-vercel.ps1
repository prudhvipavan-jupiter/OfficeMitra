# OfficeMitra — one-command Vercel production deploy
# Prerequisite: run `vercel login` once (Continue with GitHub)

$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "Checking Vercel login..." -ForegroundColor Cyan
vercel whoami
if ($LASTEXITCODE -ne 0) { throw "Not logged in. Run: vercel login" }

# Generate secrets if not already set
function New-Secret { -join ((48..57 + 65..90 + 97..122) | Get-Random -Count 32 | ForEach-Object { [char]$_ }) }

$adminToken = New-Secret
$cronSecret = New-Secret
$intelKey = New-Secret

Write-Host "Linking project (first time only)..." -ForegroundColor Cyan
if (-not (Test-Path ".vercel/project.json")) {
  vercel link --yes --project officemitra 2>$null
  if ($LASTEXITCODE -ne 0) {
    vercel link --yes
  }
}

Write-Host "Setting environment variables..." -ForegroundColor Cyan
$vars = @{
  "ADMIN_PASSWORD" = "Honey@1216"
  "ADMIN_SESSION_TOKEN" = $adminToken
  "NEXT_PUBLIC_SITE_URL" = "https://theofficemitra.com"
  "CMS_AUTO_SYNC" = "true"
  "CMS_AUTO_PUBLISH" = "false"
  "INTELLIGENCE_USE_WORKER" = "false"
  "INTELLIGENCE_AUTO_PUBLISH" = "true"
  "INTELLIGENCE_DAILY_PUBLISH_TARGET" = "5"
  "INTELLIGENCE_DRAFT_BATCH" = "15"
  "CRON_SECRET" = $cronSecret
  "INTELLIGENCE_API_KEY" = $intelKey
  "EMAIL_FROM" = "OfficeMitra <noreply@theofficemitra.com>"
  "ADMIN_EMAIL" = "admin@theofficemitra.com"
}

foreach ($key in $vars.Keys) {
  $val = $vars[$key]
  Write-Host "  $key"
  echo $val | vercel env add $key production --force 2>$null
}

Write-Host ""
Write-Host "IMPORTANT: Add POSTGRES_URL in Vercel dashboard (Storage -> Postgres or Neon)." -ForegroundColor Yellow
Write-Host "Without it, admin CMS and forms will not persist." -ForegroundColor Yellow
Write-Host ""

Write-Host "Deploying to production..." -ForegroundColor Green
vercel deploy --prod --yes

Write-Host ""
Write-Host "Done! Save these secrets:" -ForegroundColor Green
Write-Host "  ADMIN_SESSION_TOKEN = $adminToken"
Write-Host "  CRON_SECRET = $cronSecret"
Write-Host "  Admin login: /admin/login  password: Honey@1216"
