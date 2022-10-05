# build images if the project image list is empty.
if (-not { docker-compose -p caccc images -q; }) {
    $job = Start-Job { docker-compose -p caccc build }
    Wait-Job $job
}
# start the orchestrated containers if not started.
if (-not { docker-compose -p caccc ps --filter "status=running" -q } ) {
    $job = Start-Job { docker-compose -p caccc up -d }
    Wait-Job $job
}