FROM php:8.2-apache

RUN apt-get update \
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && apt-get install -y libpng-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip
    
# Nodejs y NPM
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs

# CONEXIÓN BBDD
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo && docker-php-ext-enable pdo
RUN apt-get update \
    && apt-get install -y default-mysql-client libpq-dev \
    && docker-php-ext-install pdo_mysql

# Git clone
RUN apt-get install -y git
RUN git clone https://github.com/daw223-12/camping_espana.git
RUN mv camping_espana/* ./
RUN rm -fr camping_espana

WORKDIR /var/www/html/Camping_Espana_Frontend

# Build de la SPA
RUN mkdir ../Camping_Espana

RUN npm install && ng build --base-href ./

RUN mv ./dist/camping-espana-frontend/* ../Camping_Espana
RUN cp .htaccess ../Camping_Espana


WORKDIR /var/www/html/Camping_Espana_Backend

# Instalando composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
&& php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
&& php composer-setup.php \
&& php -r "unlink('composer-setup.php');"

# Instalando dependencias
RUN ./composer.phar install

# TODO: Ponerlo en el readme.md 

RUN php artisan migrate

WORKDIR /var/www/html

# SITE CONF
RUN a2dissite 000-default.conf
RUN rm -r /etc/apache2/sites-available/000-default.conf
RUN mv sites-available/camping_espana.conf /etc/apache2/sites-available/
RUN a2ensite camping_espana.conf

# Elimina los archivos restantes
WORKDIR /var/www/html
RUN rm -fr docker-compose.yml && rm -fr DockerFile && rm -fr Camping_Espana_Frontend && rm -fr README.md && rm -fr sites-available

USER root
RUN chown -R www-data:www-data /var/www/html
# IMPORTANTE
RUN a2enmod rewrite
EXPOSE 80