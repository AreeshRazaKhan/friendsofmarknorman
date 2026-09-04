# Builds social-post-urls.xlsx (+ .csv) covering every published social asset:
# carousels, static posts and stories (PNG) plus the feed posts (HTML).
#
# The workbook is a deliverable, not a repo artifact, so it lands in the user's
# Downloads folder by default. Override with -OutDir.
#
# The Node step stages the raw OOXML parts; this step zips them with
# forward-slash entry names (Compress-Archive / CreateFromDirectory emit
# backslashes, which Excel rejects).
#
# Run: powershell -File scripts/export-social-urls.ps1

param(
  [string]$OutDir = (Join-Path $env:USERPROFILE 'Downloads')
)

$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot
$stage = Join-Path ([System.IO.Path]::GetTempPath()) "social-urls-$PID"
$out = Join-Path $OutDir 'social-post-urls.xlsx'

New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
New-Item -ItemType Directory -Path $stage -Force | Out-Null
Push-Location $repo
try {
  node scripts/export-social-urls.mjs $stage
  if ($LASTEXITCODE -ne 0) { throw 'staging step failed' }

  # -Force alone can still fail here if the destination is held open (Excel), so
  # clear it first and surface a clear message rather than a raw IOException.
  $csv = Join-Path $OutDir 'social-post-urls.csv'
  if (Test-Path $csv) {
    try { Remove-Item $csv -Force -ErrorAction Stop }
    catch { throw "Cannot overwrite $csv - close it if it is open in Excel." }
  }
  Move-Item (Join-Path $stage 'social-post-urls.csv') $csv -Force

  if (Test-Path $out) { Remove-Item $out -Force }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  $zip = [System.IO.Compression.ZipFile]::Open($out, 'Create')
  try {
    foreach ($f in Get-ChildItem $stage -Recurse -File) {
      $rel = $f.FullName.Substring($stage.Length + 1).Replace('\', '/')
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $zip, $f.FullName, $rel, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
  } finally {
    $zip.Dispose()
  }

  Write-Output "Wrote $out"
} finally {
  Pop-Location
  Remove-Item $stage -Recurse -Force -ErrorAction SilentlyContinue
}
