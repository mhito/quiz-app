# Utiliza la imagen base de Node.js
FROM node:16-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json a la imagen
COPY package*.json ./
# RUN ls -lah

# Instala las dependencias de la aplicación
# RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY node_modules ./
COPY . .

# Expone el puerto en el que la aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
