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
async function getAndAppendSeries(path, parentContainer, optionalConfig ={}) {
    const {data} = await API(path,optionalConfig);
    const series = data.results;

    parentContainer.innerHTML = '';
    series.forEach(serie => {
        const serieContainer = document.createElement('div');
        serieContainer.classList.add('serie-container');
        serieContainer.addEventListener('click',()=>{
            location.hash = `#serie=${serie.id}`;
        });

        const serieImg = document.createElement('img');
        serieImg.classList.add('serie-img');
        serieImg.setAttribute('alt', serie.title);
        serieImg.setAttribute(
            'src',
            `https://image.tmdb.org/t/p/w300${serie.poster_path}`,
        );
        serieContainer.appendChild(serieImg); 
        parentContainer.appendChild(serieContainer);
    })
}

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

async function getCategoriesPreview() {
    const {data} = await  API('genre/movie/list');
    const categories = data.genres;

    createCategories(categories,categoriesPreviewList);
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

    serieDetailTitle.textContent = serie.name;
    serieDetailDescription.textContent = serie.overview;
    serieDetailScore.textContent = serie.vote_average;

    createCategories(serie.genres,serieDetailCategoriesList);
    // console.log(serie.genres);
}

// async function getTrendingSeriesPreview() {
//     const {data} = await  API('trending/tv/day');
//     const series = data.results;

//     series.forEach(serie => {
//         const serieContainer = document.createElement('div');
//         serieContainer.classList.add('serie-container');

//         const serieImg = document.createElement('img');
//         serieImg.classList.add('serie-img');
//         serieImg.setAttribute('alt', serie.title);
//         serieImg.setAttribute(
//             'src',
//             `https://image.tmdb.org/t/p/w300${serie.poster_path}`,
//         ); 
//         serieContainer.appendChild(serieImg); 
//         trendingSeriesPreviewList.appendChild(serieContainer);
//     });
//     // console.log(series);
// }

// async function getSeriesByCategory(id) {
//     const {data} = await  API('discover/tv',{
//         params: {
//             with_genres: id,
//         }
//     });
//     const series = data.results;
    
//     genericSection.innerHTML= '';
//     series.forEach(serie => {
//         const serieContainer = document.createElement('div');
//         serieContainer.classList.add('serie-container');
        
//         const serieImg = document.createElement('img');
//         serieImg.classList.add('serie-img');
//         serieImg.setAttribute('alt', serie.title);
//         serieImg.setAttribute(
//             'src',
//             `https://image.tmdb.org/t/p/w300${serie.poster_path}`,
//             ); 
//             serieContainer.appendChild(serieImg); 
//             genericSection.appendChild(serieContainer);
//         });
//         // console.log(data.results);
//     }

