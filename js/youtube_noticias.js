document.addEventListener('DOMContentLoaded', function () {
  const videoSection = document.getElementById('videoSection');
  const CACHE_KEY = 'youtubeVideosCache';  // Llave para almacenar en localStorage
  const CACHE_TIME_LIMIT = 60 * 60 * 1000; // 1 hora en milisegundos

  // Función para obtener videos de YouTube
  async function fetchVideos() {
    const API_KEY = 'AIzaSyC_RuXUXZpfSSQmcnEcfFb6y_iomOD2q9E'; // Tu API key de YouTube
    const channelId = 'UC11M4NXDUqs4oBNF_rZzurQ';  // ID del canal
    const maxResults = 6;  // Número máximo de videos que quieres mostrar

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`);
      const data = await response.json();

      // Guardar los datos en el caché con la marca de tiempo actual
      const cacheData = {
        timestamp: Date.now(),
        videos: data.items,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      return data.items;
    } catch (error) {
      console.error('Error al obtener los videos:', error);
      return [];
    }
  }

  // Función para cargar los videos desde el caché o la API
  async function loadVideos() {
    // Revisar si hay datos en caché
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);

      // Verificar si el caché es reciente (dentro del límite de tiempo)
      if (Date.now() - parsedCache.timestamp < CACHE_TIME_LIMIT) {
        console.log('Cargando videos desde caché');
        renderVideos(parsedCache.videos);
        return;
      } else {
        // Si los datos en caché son viejos, los eliminamos
        localStorage.removeItem(CACHE_KEY);
      }
    }

    // Si no hay caché o los datos son viejos, hacer una nueva solicitud a la API
    const videos = await fetchVideos();
    renderVideos(videos);
  }

  // Función para mostrar los videos en el HTML
  function renderVideos(videos) {
    // Limpiar la sección de videos
    videoSection.innerHTML = '';

    // Añadir cada video
    videos.forEach(item => {
      if (item.id.videoId) { // Verificar que es un video
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        videoItem.innerHTML = `
          <h5>${item.snippet.title}</h5>
          <iframe src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;

        videoSection.appendChild(videoItem);
      }
    });
  }

  // Llamar la función al cargar la página
  loadVideos();

  // Actualizar cada 5 minutos (300000 ms)
  setInterval(loadVideos, 300000);
});
