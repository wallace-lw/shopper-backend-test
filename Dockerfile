FROM node:18-alpine AS base
RUN npm install -g npm@10.7.0
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN ls -la
RUN npm run build
# COPY prisma /app/dist/prisma



FROM node:18-alpine
RUN npm install -g npm@10.7.0
WORKDIR /app
COPY package.json ./
COPY prisma ./
RUN npm install --omit=dev
COPY --from=base /app/dist ./src


RUN ls -la
RUN pwd

EXPOSE 8000

# CMD [ "tail", "-f", "/dev/null" ]
CMD ["npm", "start"]
