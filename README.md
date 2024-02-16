# Microservice GPIO

## 1 - Prerequisites

- docker
- docker-compose
- git
- my scripts docker

### Clone my docker repository

``` bash
git clone https://github.com/vincent-leclerc-dev/docker.git
```

### Create microservice network

``` bash
cd docker/scripts
./create-ms-network.sh
```

That allow you to use microservice name (Example: "ms-gpio" instead of localhost, 127.0.0.1 or 0.0.0.0).

## 2 - Run microservice GPIO

``` bash
git clone https://github.com/vincent-leclerc-dev/ms-gpio.git
cd ms-gpio
cp .env.sample .env
docker-compose up -d
```