FROM node:16-alpine

# Add tool which will fix init process
RUN apk add dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node package.json .

RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 9000
CMD ["dumb-init", "node", "server.js" ]