# Renders the 5-Minute Voter Guide from lead-magnet/voter-guide-5min.html into:
#   public/downloads/mark-norman-5-min-voter-guide.pdf   (11-page letter PDF)
#   public/images/5-min-voter-guide-cover.png            (cover image for /5-minute-voter-guide)
#
# Re-run this after editing the HTML. Requires Google Chrome (or render with
# Playwright's Chromium via page.pdf() if Chrome is not installed).

$repo = Split-Path -Parent $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$src = 'file:///' + ($repo -replace '\\', '/') + '/lead-magnet/voter-guide-5min.html'

if (-not (Test-Path $chrome)) {
  Write-Error 'Google Chrome not found at the expected path.'
  exit 1
}

New-Item -ItemType Directory -Force "$repo\public\downloads" | Out-Null

Start-Process -FilePath $chrome -Wait -ArgumentList @(
  '--headless=new', '--disable-gpu', '--no-sandbox',
  "--user-data-dir=$env:TEMP\chrome-5min-pdf",
  '--no-pdf-header-footer', '--virtual-time-budget=20000',
  "--print-to-pdf=$repo\public\downloads\mark-norman-5-min-voter-guide.pdf",
  $src
)

Start-Process -FilePath $chrome -Wait -ArgumentList @(
  '--headless=new', '--disable-gpu', '--no-sandbox',
  "--user-data-dir=$env:TEMP\chrome-5min-png",
  '--hide-scrollbars', '--window-size=816,1056', '--virtual-time-budget=20000',
  "--screenshot=$repo\public\images\5-min-voter-guide-cover.png",
  $src
)

Get-Item "$repo\public\downloads\mark-norman-5-min-voter-guide.pdf",
         "$repo\public\images\5-min-voter-guide-cover.png" |
  Select-Object Name, Length, LastWriteTime
