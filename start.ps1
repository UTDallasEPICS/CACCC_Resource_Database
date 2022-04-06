$DockerSvc = docker container ls --filter name="mongo" --format '{{.Image}}';
if ($DockerSvc -ne "mongo") {
    docker run --name mongo -p 27017:27017 -v caccc-db:/data/db -d --rm mongo;
    Timeout 1;
}
node .\server.js