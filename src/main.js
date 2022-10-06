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

getTrendingSeriesPreview();