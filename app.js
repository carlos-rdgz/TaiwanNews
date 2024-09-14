const apiKey = 'V0sKvIkV-EZy7BuaY-bd38URbq9O3ldHOLgyhk4ISfGcR-gR';
const apiUrl = 'https://api.currentsapi.services/v1/latest-news?apiKey=' + apiKey;

async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const articles = data.news;
        const newsContainer = document.getElementById('news-container');

        newsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas noticias

        if (articles.length === 0) {
            newsContainer.innerHTML = '<p>No news available at the moment.</p>';
            return;
        }

        articles.forEach(article => {
            const newsArticle = document.createElement('article');
            newsArticle.className = 'news-article';
            newsArticle.innerHTML = `
                <img src="${article.image || 'https://via.placeholder.com/300x200'}" alt="News Image" class="news-image">
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" class="read-more" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(newsArticle);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '<p>Error loading news. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchNews);
