# Renders the QR-funnel lead magnet from lead-magnet/qr-guide.html into:
#   public/downloads/mark-norman-qr-guide.pdf   (letter PDF)
#   public/images/qr-guide-cover.png            (cover image for /meet-mark)
#
# Workflow: copy lead-magnet/qr-guide-template.html → lead-magnet/qr-guide.html,
# pour in the final content, then run this script. Requires Google Chrome.

$repo = Split-Path -Parent $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$html = "$repo\lead-magnet\qr-guide.html"
$src = 'file:///' + ($repo -replace '\\', '/') + '/lead-magnet/qr-guide.html'

if (-not (Test-Path $chrome)) {
  Write-Error 'Google Chrome not found at the expected path.'
  exit 1
}

if (-not (Test-Path $html)) {
  Write-Error 'lead-magnet/qr-guide.html not found. Copy qr-guide-template.html to qr-guide.html and add the final content first.'
  exit 1
}

New-Item -ItemType Directory -Force "$repo\public\downloads" | Out-Null

Start-Process -FilePath $chrome -Wait -ArgumentList @(
  '--headless=new', '--disable-gpu', '--no-sandbox',
  "--user-data-dir=$env:TEMP\chrome-qrguide-pdf",
  '--no-pdf-header-footer', '--virtual-time-budget=20000',
  "--print-to-pdf=$repo\public\downloads\mark-norman-qr-guide.pdf",
  $src
)

Start-Process -FilePath $chrome -Wait -ArgumentList @(
  '--headless=new', '--disable-gpu', '--no-sandbox',
  "--user-data-dir=$env:TEMP\chrome-qrguide-png",
  '--hide-scrollbars', '--window-size=816,1056', '--virtual-time-budget=20000',
  "--screenshot=$repo\public\images\qr-guide-cover.png",
  $src
)

Get-Item "$repo\public\downloads\mark-norman-qr-guide.pdf",
         "$repo\public\images\qr-guide-cover.png" |
  Select-Object Name, Length, LastWriteTime
