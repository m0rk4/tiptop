FROM node:fermium
WORKDIR usr/src/app
COPY package.json ./
RUN npm install --force --verbose --no-bin-links
COPY . .
RUN npm run build:ssr
CMD ["npm", "run", "serve:ssr"]
