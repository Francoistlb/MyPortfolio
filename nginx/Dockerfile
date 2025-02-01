FROM nginx:latest

# Supprime la configuration par défaut de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie notre configuration personnalisée
COPY default.conf /etc/nginx/conf.d/

# Expose le port 80
EXPOSE 80 