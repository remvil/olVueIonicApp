# Usa l'immagine di base di Node.js 20.12.2
FROM node:lts-alpine AS builder

# Imposta la directory di lavoro nel container
WORKDIR /usr/src/bff-app

# Copia il package.json e il package-lock.json (se presente)
COPY package.json package-lock.json ./

	# Installa le dipendenze del progetto
RUN npm install

# Copia i file del progetto nella directory di lavoro del container
COPY . .

# Espone la porta per il server di sviluppo backend
EXPOSE 3000

# Comando di avvio del backend
# CMD ["npm", "run", "start"]