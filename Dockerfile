FROM buildkite/puppeteer:5.2.1 as react-build

ARG REACT_APP_API_BASE_URL

COPY web /opt/web
WORKDIR /opt/web

RUN npm ci --only=production && npm run build



FROM node:15.14.0-alpine3.13

COPY api /opt/api
WORKDIR /opt/api

RUN npm ci --only=production
COPY --from=react-build /opt/web/build /opt/api/react-app

EXPOSE 3001

CMD ["npm","start"]