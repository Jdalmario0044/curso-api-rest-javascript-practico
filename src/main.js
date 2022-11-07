const API = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    header: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': 'es-CO'
    },
});

// Helpers

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
      // console.log(entry.target.setAttribute);
      if (entry.isIntersecting) {
        const url = entry.target.getAttribute('data-img');
        entry.target.setAttribute('src', url);
      }
    });
  });

function createSeries(series, container, lazyLoad = false) {
    container.innerHTML = '';
  
    series.forEach(serie => {
      const serieContainer = document.createElement('div');
      serieContainer.classList.add('serie-container');
      serieContainer.addEventListener('click', () => {
        location.hash = '#serie=' + serie.id;
      });
  
      const serieImg = document.createElement('img');
      serieImg.classList.add('serie-img');
      serieImg.setAttribute('alt', serie.title);
      serieImg.setAttribute(
        lazyLoad ? 'data-img' : 'src',
        'https://image.tmdb.org/t/p/w300' + serie.poster_path,
      );
      serieImg.addEventListener('error', () => {
        serieImg.setAttribute(
          'src',
          'https://i.imgur.com/DTvoIh6.png',
        );
      })
  
        if (lazyLoad) {
        lazyLoader.observe(serieImg);
      }
  
      serieContainer.appendChild(serieImg);
      container.appendChild(serieContainer);
    });
}

// async function getAndAppendSeries(path, parentContainer, optionalConfig ={}) {
//     const {data} = await API(path,optionalConfig);
//     const series = data.results;

//     parentContainer.innerHTML = '';
//     series.forEach(serie => {
//         const serieContainer = document.createElement('div');
//         serieContainer.classList.add('serie-container');
//         serieContainer.addEventListener('click',()=>{
//             location.hash = `#serie=${serie.id}`;
//         });

//         const serieImg = document.createElement('img');
//         serieImg.classList.add('serie-img');
//         serieImg.setAttribute('alt', serie.title);
//         serieImg.setAttribute(
//             'src',
//             `https://image.tmdb.org/t/p/w300${serie.poster_path}`,
//         );
//         serieContainer.appendChild(serieImg); 
//         parentContainer.appendChild(serieContainer);
//     })
// }

function createCategories(categories,container) {
    container.innerHTML = '';

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click',() => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const CategoryTitleText = document.createTextNode(category.name);
    
        categoryTitle.appendChild(CategoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

// Llamados a la API

async function getTrendingSeriesPreview() {
    const { data } = await API('trending/tv/day');
    const series = data.results;
    // console.log(movies)
  
    createSeries(series, trendingSeriesPreviewList, true);
}

async function getCategoriesPreview() {
    const {data} = await  API('genre/tv/list');
    const categories = data.genres;

    createCategories(categories,categoriesPreviewList);
}

async function getSeriesByCategory(id) {
    const { data } = await API('discover/tv', {
      params: {
        with_genres: id,
      },
    });
    const series = data.results;
  
    createSeries(series, genericSection, true);
  }

  async function getSeriesBySearch(query) {
    const { data } = await API('search/tv', {
      params: {
        query,
      },
    });
    const series = data.results;
  
    createSeries(series, genericSection, true);
}

async function getTrendingSeries() {
    const { data } = await API('trending/movie/day');
    const series = data.results;
  
    createSeries(series, genericSection, true);
}

async function getSerieById(id) {
    const {data:serie} = await API(`tv/${id}`);
    const serieDetailImg = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
    headerSection.style.background = `
        linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.35) 19.27%,
            rgba(0, 0, 0, 0) 29.17%
        ),
        url(${serieDetailImg})
    `;
    serieDetailTitle.classList.remove('serieDetail-title--loading');
    serieDetailTitle.textContent = serie.name;
    serieDetailDescription.classList.remove('serieDetail-description--loading');
    serieDetailDescription.textContent = serie.overview;
    serieDetailScore.classList.remove('serieDetail-score--loading');
    serieDetailScore.textContent = serie.vote_average.toFixed(1);

    createCategories(serie.genres, serieDetailCategoriesList);

    getRelatedSeriesById(id);
}

async function getRelatedSeriesById(id) {
    const {data} = await API(`tv/${id}/recommendations`);
    const relatedSeries = data.results;
    console.log(id);

  createSeries(relatedSeries, relatedSeriesContainer, true);
}