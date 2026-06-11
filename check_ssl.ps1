$url = "https://threadzy.shop"

# Allow ignoring SSL errors to check for connection, but we actually want to exit only when SSL is fully valid (no exceptions thrown).
# By default, Invoke-WebRequest will throw an exception on SSL mismatch.
# This means it will exit 0 only when SSL is fully valid and website returns 200!

while ($true) {
    try {
        $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        if ($res.StatusCode -eq 200) {
            Write-Output "SUCCESS: HTTPS connection established successfully for $url"
            exit 0
        }
    } catch {
        # Exception thrown (SSL error, timeout, network error), ignore and retry
    }
    Start-Sleep -Seconds 20
}
