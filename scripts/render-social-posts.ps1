# Renders every social post in social-posts/ as a consolidated PNG set in three
# aspect ratios:
#   1:1   1080x1080   social-posts/png/{post}-1x1.png
#   4:5   1080x1350   social-posts/png/{post}-4x5.png
#   9:16  1080x1920   social-posts/png/{post}-9x16.png
#
# Each post HTML reads a ?ratio= query param (45 / 916) and applies the matching
# layout variant class. Re-run this after editing any post HTML.
# Requires Google Chrome.

$repo = Split-Path -Parent $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

if (-not (Test-Path $chrome)) {
  Write-Error 'Google Chrome not found at the expected path.'
  exit 1
}

$outDir = "$repo\social-posts\png"
New-Item -ItemType Directory -Force $outDir | Out-Null

$ratios = @(
  @{ suffix = '1x1';  query = '';           size = '1080,1080' },
  @{ suffix = '4x5';  query = '?ratio=45';  size = '1080,1350' },
  @{ suffix = '9x16'; query = '?ratio=916'; size = '1080,1920' }
)

$posts = Get-ChildItem "$repo\social-posts\*.html" | Sort-Object Name

foreach ($post in $posts) {
  $name = [IO.Path]::GetFileNameWithoutExtension($post.Name)
  $src = 'file:///' + ($post.FullName -replace '\\', '/')

  foreach ($r in $ratios) {
    $out = "$outDir\$name-$($r.suffix).png"
    Start-Process -FilePath $chrome -Wait -ArgumentList @(
      '--headless=new', '--disable-gpu', '--no-sandbox',
      "--user-data-dir=$env:TEMP\chrome-social-posts",
      '--hide-scrollbars', "--window-size=$($r.size)",
      '--virtual-time-budget=15000',
      "--screenshot=$out",
      "$src$($r.query)"
    )
    Write-Host "rendered $name-$($r.suffix).png"
  }
}

Get-ChildItem $outDir | Select-Object Name, Length
