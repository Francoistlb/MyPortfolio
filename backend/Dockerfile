# Utilise l'image officielle PHP avec Apache
FROM php:8.1-apache

# Installe l'extension MySQL pour PHP
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copier les fichiers PHP vers le répertoire Apache
COPY ./ /var/www/html/

# Expose le port 80
EXPOSE 80
