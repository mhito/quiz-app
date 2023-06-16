#!/bin/bash

# Detener y eliminar los contenedores existentes
docker-compose down

# Construir una nueva imagen de la aplicación
docker-compose build

# Iniciar los contenedores
docker-compose up
