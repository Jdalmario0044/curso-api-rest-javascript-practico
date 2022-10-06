async function getTrendingSeriesPreview() {
    const res = await  fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=' + API_KEY);
    const data = await res.json();

    const series = data.results;
    series.forEach(serie => {
        const trendingPreviewSeriesContainer = document.querySelector('#trendingPreview .trendingPreview-serieList');
        const serieContainer = document.createElement('div');
        serieContainer.classList.add('serie-container');

        const serieImg = document.createElement('img');
        serieImg.classList.add('serie-img');
        serieImg.setAttribute('alt', serie.title);
        serieImg.setAttribute(
            'src',
            `https://image.tmdb.org/t/p/w300${serie.poster_path}`,
        ); 
        serieContainer.appendChild(serieImg); 
        trendingPreviewSeriesContainer.appendChild(serieContainer);
    });
    // console.log(series);
}
async function getCategoriesPreview() {
    const res = await  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();

    const categories = data.genres;
    categories.forEach(category => {
        const categoriesPreviewSeriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        const CategoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(CategoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewSeriesContainer.appendChild(categoryContainer);

        console.log(category.id, category.name)
    });
}


getTrendingSeriesPreview();
getCategoriesPreview();