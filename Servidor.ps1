param([int]$Port = 8765, [switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$siteRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$sitePrefix = $siteRoot.TrimEnd('\') + '\'
$mimeTypes = @{
  '.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'
  '.css'='text/css; charset=utf-8'; '.json'='application/json; charset=utf-8'
  '.webmanifest'='application/manifest+json'; '.svg'='image/svg+xml'
  '.png'='image/png'; '.webp'='image/webp'; '.ico'='image/x-icon'
}
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)
try {
  $listener.Start()
  $siteUrl = 'http://127.0.0.1:' + $Port + '/'
  Write-Host ''
  Write-Host 'RESPIRA - TU ESPACIO DE CALMA' -ForegroundColor Green
  Write-Host ('Abre esta direccion: ' + $siteUrl)
  Write-Host 'Esta ventana mantiene abierta la aplicacion local.'
  Write-Host 'Para terminar, cierra esta ventana o pulsa Ctrl+C.'
  if (-not $NoBrowser) { Start-Process $siteUrl }
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $client.ReceiveTimeout = 2000
      $stream = $client.GetStream()
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrEmpty($requestLine)) { continue }
      $header = $reader.ReadLine()
      while (-not [string]::IsNullOrEmpty($header)) { $header = $reader.ReadLine() }
      $requestParts = $requestLine.Split(' ')
      $status = '200 OK'
      $contentType = 'text/plain; charset=utf-8'
      $payload = [byte[]]@()
      if ($requestParts.Length -lt 2 -or $requestParts[0] -notin @('GET','HEAD')) {
        $status = '405 Method Not Allowed'
      } else {
        $relative = [Uri]::UnescapeDataString(($requestParts[1] -split '\?',2)[0]).TrimStart('/')
        if ($relative -eq '') { $relative = 'index.html' }
        $fileTarget = [IO.Path]::GetFullPath([IO.Path]::Combine($siteRoot, $relative.Replace('/', '\')))
        $extension = [IO.Path]::GetExtension($fileTarget).ToLowerInvariant()
        if (-not $fileTarget.StartsWith($sitePrefix, [StringComparison]::OrdinalIgnoreCase) -or -not $mimeTypes.ContainsKey($extension)) {
          $status = '403 Forbidden'
        } elseif (-not [IO.File]::Exists($fileTarget)) {
          $status = '404 Not Found'
        } else {
          $payload = [IO.File]::ReadAllBytes($fileTarget)
          $contentType = $mimeTypes[$extension]
        }
      }
      $responseHeader = 'HTTP/1.1 ' + $status + "`r`nContent-Type: " + $contentType + "`r`nContent-Length: " + $payload.Length + "`r`nCache-Control: no-cache`r`nX-Content-Type-Options: nosniff`r`nConnection: close`r`n`r`n"
      $headerBytes = [Text.Encoding]::ASCII.GetBytes($responseHeader)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      if ($requestParts[0] -ne 'HEAD' -and $payload.Length -gt 0) { $stream.Write($payload, 0, $payload.Length) }
      $stream.Flush()
    } catch {
      # Una pestana puede cerrar una conexion anticipada. El servidor sigue disponible.
    } finally {
      if ($reader) { $reader.Dispose(); $reader = $null }
      $client.Dispose()
    }
  }
} catch {
  Write-Host ('No se pudo iniciar Respira: ' + $_.Exception.Message) -ForegroundColor Red
  Write-Host 'Si ya esta abierta, usa su ventana. Si el puerto esta ocupado, cierra la otra copia e intenta nuevamente.'
  exit 1
} finally {
  $listener.Stop()
}
