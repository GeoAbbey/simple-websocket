FROM node:14-alpine

# Add tool which will fix init process
RUN apk add dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node package.json .

COPY --chown=node:node package-lock.json .

RUN npm ci --only=production

COPY --chown=node:node . .

USER node

EXPOSE 9000
CMD ["dumb-init", "node", "server.js" ]