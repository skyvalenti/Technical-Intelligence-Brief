$WshShell = New-Object -ComObject WScript.Shell
$StartMenuPath = [System.Environment]::GetFolderPath('StartMenu') + "\Programs"

# Remove legacy links
Get-ChildItem -Path $StartMenuPath -Filter "*Technical Intelligence Brief*.lnk" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path $StartMenuPath -Filter "SKY TECH BRIEF.lnk" | Remove-Item -Force -ErrorAction SilentlyContinue

# Register new short-titled shortcut
$ShortcutPath = "$StartMenuPath\SKY TECH BRIEF.lnk"
$ProjectRoot = (Get-Item -Path ".\").FullName
$TargetBat = "$ProjectRoot\launch_dashboard.bat"
$IconLocation = "$ProjectRoot\public\app_icon.ico"

$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $TargetBat
$Shortcut.WorkingDirectory = $ProjectRoot
$Shortcut.IconLocation = "$IconLocation, 0"
$Shortcut.Description = "Sky Technical Intelligence Brief"
$Shortcut.Save()

Write-Host "Shortcut registered in Start Menu as: SKY TECH BRIEF"
