const podcastIds = document.querySelectorAll('#podcastId');

podcastIds.forEach(id => {
    id.addEventListener("click", (event) => {
        const podcastId = id.getAttribute('value');
        localStorage.setItem('searchPodcast', podcastId)
        window.location.href = '/home';
    });
});