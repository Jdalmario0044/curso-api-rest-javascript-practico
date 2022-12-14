// Data
let language = navigator.language;

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  header: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: language,
  },
});

function likedSeriesList() {
  const item = JSON.parse(localStorage.getItem("liked_series"));
  let series;
  if (item) {
    series = item;
  } else {
    series = {};
  }

  return series;
}

function likeSerie(serie) {
  const likedSeries = likedSeriesList();

  // console.log(likedMovies);

  if (likedSeries[serie.id]) {
    likedSeries[serie.id] = undefined;
  } else {
    likedSeries[serie.id] = serie;
  }

  localStorage.setItem('liked_series', JSON.stringify(likedSeries));
}

// Helpers

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry.target.setAttribute);
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});

function createSeries(
  series,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  if (clean) {
    container.innerHTML = "";
  } else {
  }

  series.forEach((serie) => {
    const serieContainer = document.createElement("div");
    serieContainer.classList.add("serie-container");

    const serieImg = document.createElement("img");
    serieImg.classList.add("serie-img");
    serieImg.setAttribute("alt", serie.title);
    serieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      "https://image.tmdb.org/t/p/w300" + serie.poster_path
    );
    serieImg.addEventListener('click', () => {
      location.hash = '#serie=' + serie.id;
    });
    serieImg.addEventListener("error", () => {
      serieImg.setAttribute("src", "https://i.imgur.com/DTvoIh6.png");
    });

    const serieBtn = document.createElement('button');
    serieBtn.classList.add('serie-btn');
    likedSeriesList()[serie.id] && serieBtn.classList.add('serie-btn--liked');
    serieBtn.addEventListener('click', () => {
      serieBtn.classList.toggle('serie-btn--liked');
      likeSerie(serie);

      if (!location.hash == "") {
        getLikedSeries();
      } else {
        getLikedSeries();
        homePage();
      }
    });

    if (lazyLoad) {
      lazyLoader.observe(serieImg);
    }

    serieContainer.appendChild(serieImg);
    serieContainer.appendChild(serieBtn);
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

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", `id${category.id}`);
    categoryTitle.addEventListener("click", () => {
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
  const { data } = await API("trending/tv/day");
  const series = data.results;
  // console.log(movies)

  createSeries(series, trendingSeriesPreviewList, { lazyLoad: true, clean: true });
}

async function getCategoriesPreview() {
  const { data } = await API("genre/tv/list");
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getSeriesByCategory(id) {
  const { data } = await API("discover/tv", {
    params: {
      with_genres: id,
    },
  });
  const series = data.results;
  maxPage = data.total_pages;
  // console.log(maxPage);

  createSeries(series, genericSection, { lazyLoad: true, clean: true });
}

function getPaginatedSeriesBycategory(id) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const isScrollBottton = scrollTop + clientHeight >= scrollHeight - 15;
    const isNotPageMax = page < maxPage;
    
    if (isScrollBottton && isNotPageMax) {
      page++;
      const { data } = await API("discover/tv", {
        params: {
          with_genres: id,
          page,
        },
      });
      const series = data.results;

      createSeries(series, genericSection, { lazyLoad: true, clean: false });
    }
  };
}

async function getSeriesBySearch(query) {
  const { data } = await API("search/tv", {
    params: {
      query,
    },
  });
  const series = data.results;

  maxPage = data.total_pages;
  // console.log(maxPage);

  createSeries(series, genericSection, { lazyLoad: true, clean: true });
}

function getPaginatedSeriesBySearch(query) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isScrollBottton = scrollTop + clientHeight >= scrollHeight - 15;
    const isNotPageMax = page < maxPage;

    if (isScrollBottton && isNotPageMax) {
      page++;
      const { data } = await API("search/tv", {
        params: {
          query,
          page,
        },
      });
      const series = data.results;

      createSeries(series, genericSection, { lazyLoad: true, clean: false });
    }
  };
}

async function getTrendingSeries() {
  const { data } = await API("trending/tv/day");
  const series = data.results;
  maxPage = data.total_pages;
  // console.log(maxPage);

  createSeries(series, genericSection, { lazyLoad: true, clean: true });
}

async function getPaginatedTrendingSeries() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const isScrollBottton = scrollTop + clientHeight >= scrollHeight - 15;
  const isNotPageMax = page < maxPage;

  if (isScrollBottton && isNotPageMax) {
    page++;
    const { data } = await API("trending/tv/day", {
      params: {
        page,
      },
    });
    const series = data.results;

    createSeries(series, genericSection, { lazyLoad: true, clean: false });
  }
}

async function getSerieById(id) {
  const { data: serie } = await API(`tv/${id}`);
  const serieDetailImg = `https://image.tmdb.org/t/p/w500${serie.poster_path}`;
  headerSection.style.background = `
        linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.35) 19.27%,
            rgba(0, 0, 0, 0) 29.17%
        ),
        url(${serieDetailImg})
    `;
  serieDetailTitle.classList.remove("serieDetail-title--loading");
  serieDetailTitle.textContent = serie.name;
  serieDetailDescription.classList.remove("serieDetail-description--loading");
  serieDetailDescription.textContent = serie.overview;
  serieDetailScore.classList.remove("serieDetail-score--loading");
  serieDetailScore.textContent = serie.vote_average.toFixed(1);

  createCategories(serie.genres, serieDetailCategoriesList);

  getRelatedSeriesById(id);
}

async function getRelatedSeriesById(id) {
  const { data } = await API(`tv/${id}/recommendations`);
  const relatedSeries = data.results;
  // console.log(id);

  createSeries(relatedSeries, relatedSeriesContainer, { lazyLoad: true, clean: true });
}

function getLikedSeries() {
  const likedSeries = likedSeriesList();
  const seriesArray = Object.values(likedSeries);

  createSeries(seriesArray, likedSeriesListArticle, {lazyLoad: true, clean: true});

  // console.log(seriesArray);
}

function isEmptyLocalStorage() {
  const likedSeries = likedSeriesList();
  const seriesArray = Object.values(likedSeries);

  if (seriesArray.length > 0) {
    // console.log('LikedMovies: ' + moviesArray.length);
  } else {
    likedSeriesSection.classList.add('inactive');
  }
}