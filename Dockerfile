# Gunakan image Node.js sebagai base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode sumber ke container
COPY . .

# Expose port aplikasi (sesuaikan dengan port yang digunakan)
EXPOSE 4000

# Jalankan aplikasi dalam mode development
CMD ["npm", "run", "dev"]
