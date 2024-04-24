document.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/apod')
    .then(response => {
        const { url, title, explanation } = response.data;

        // Asignar la URL de la imagen y los datos al DOM
        document.getElementById('apod-image').src = url;
        document.getElementById('apod-image').alt = title;
        document.getElementById('apod-title').textContent = title;
        document.getElementById('apod-description').textContent = explanation;
    })
    .catch(error => {
        console.error('Error al obtener la foto del día:', error);

        // Verificar si el error es un objeto HTML (error de la API)
        if (error.response && error.response.data) {
            const errorMessage = error.response.data;
            console.error('Mensaje de error de la API:', errorMessage);
        }

        // Mostrar un mensaje de error genérico en la página
        document.getElementById('apod-title').textContent = 'Error al obtener la foto del día';
        document.getElementById('apod-description').textContent = 'Hubo un error al cargar la imagen. Por favor, intenta de nuevo más tarde.';
    });
});
