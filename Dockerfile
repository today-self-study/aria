# 1단계: 빌드
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: nginx로 정적 서비스
FROM nginx:alpine

# SPA 라우팅 지원: 404시 index.html로 fallback
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사 (browser 폴더 내부만)
COPY --from=build /app/target/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 