# Use a lightweight Nginx image as a base
FROM nginx:alpine

# Copy the HTML file, CSS file, JavaScript file, and icons into the Nginx server directory.
COPY index.html style.css script.js /usr/share/nginx/html/
COPY icons /usr/share/nginx/html/icons

# Expose port 80 to allow external access.  
EXPOSE 80
