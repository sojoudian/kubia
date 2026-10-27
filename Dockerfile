FROM node:24-alpine
ARG VERSION=""
ENV VERSION=${VERSION}
WORKDIR /app
COPY app.js .
USER node
EXPOSE 8080
CMD ["node", "app.js"]
