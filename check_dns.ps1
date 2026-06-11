$domain = "threadzy.shop"
$targetIp = "216.24.57.1"

while ($true) {
    try {
        $ips = [System.Net.Dns]::GetHostAddresses($domain)
        foreach ($ip in $ips) {
            if ($ip.IPAddressToString -eq $targetIp) {
                Write-Output "SUCCESS: $domain resolved to $targetIp"
                exit 0
            }
        }
    } catch {
        # DNS query failed, ignore and retry
    }
    Start-Sleep -Seconds 15
}
