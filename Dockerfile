FROM docker.io/library/node
COPY . /opt/web
WORKDIR /opt/web
CMD node server.js
EXPOSE 3000