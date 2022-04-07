$DockerSvc = docker container ls --filter name="mongo" --format '{{.Image}}';
if ($DockerSvc -ne "mongo") {
    $job = Start-Job { docker run --name mongo -p 27017:27017 -v caccc-db:/data/db -d --rm mongo; }
    Wait-Job $job
}
 
cmd.exe /C start http://Localhost:3000
 
node .\server.js