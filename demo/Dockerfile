ARG NODE_VERSION=24.9.0

FROM node:${NODE_VERSION}-alpine as build
ARG NUXT_PUBLIC_PREZ_API_ENDPOINT=http://localhost:8000
ARG NUXT_PUBLIC_PREZ_AUTO_DETECT_HTML=false
ARG NUXT_PUBLIC_PREZ_AUTO_DETECT_MARKDOWN=false
WORKDIR /src
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY --link . .
ENV NUXT_PUBLIC_PREZ_API_ENDPOINT=$NUXT_PUBLIC_PREZ_API_ENDPOINT
ENV NUXT_PUBLIC_PREZ_AUTO_DETECT_HTML=$NUXT_PUBLIC_PREZ_AUTO_DETECT_HTML
ENV NUXT_PUBLIC_PREZ_AUTO_DETECT_MARKDOWN=$NUXT_PUBLIC_PREZ_AUTO_DETECT_MARKDOWN
RUN pnpm generate

FROM nginx:stable-alpine
COPY --from=build /src/.output/public /usr/share/nginx/html

RUN echo $' \n\
server { \n\
   listen 80; \n\
   listen [::]:80; \n\
   server_name localhost; \n\
 \n\
   location / { \n\
       root /usr/share/nginx/html; \n\
       index index.html index.htm; \n\
       try_files $uri /index.html; \n\
   } \n\
 \n\
   error_page 404 =200 /404.html; \n\
 \n\
   error_page 500 502 503 504 /index.html; \n\
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]