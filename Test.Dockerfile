FROM node:14-alpine as builder
WORKDIR /app
ADD package.json /app
RUN npm install 
COPY . /app
RUN npm run build


# 选择更小体积的基础镜像
FROM node:14-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3002
ENV PORT 3002
CMD ["node_modules/.bin/next", "start"]