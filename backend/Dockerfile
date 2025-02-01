# Utilise l'image officielle PHP avec Apache
FROM php:8.1-apache

# Install PDO MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache modules
RUN a2enmod rewrite headers

# Copy virtual host configuration
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

# Set ServerName to suppress the warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copy PHP files
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose le port 80
EXPOSE 80
