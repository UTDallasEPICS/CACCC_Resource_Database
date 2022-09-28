FROM docker.io/library/node
COPY . /opt/web
WORKDIR /opt/web
RUN npm install --omit=dev --no-audit
CMD node server.js
EXPOSE 3000