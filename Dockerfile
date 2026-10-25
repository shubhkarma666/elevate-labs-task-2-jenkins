FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY app.js ./

EXPOSE 3000

CMD ["node", "app.js"]
