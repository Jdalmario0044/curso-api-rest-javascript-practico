searchFormBtn.addEventListener('click', e => {
    searchFormInput.value !== "" ? location.hash = `#search=${searchFormInput.value}`  : e.preventDefault();
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
});
arrowBtn.addEventListener('click', () => {
    history.back();
});
headerTitle.addEventListener('click', ()=> {
    location.hash = '#home'
});
window.addEventListener('DOMContentLoaded',navigator, false);
window.addEventListener('hashchange',navigator, false);

function navigator() {
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if(location.hash.startsWith('#search=')) {
        searchPage();
    } else if(location.hash.startsWith('#serie=')) {
        serieDetailsPage();
    } else if(location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function homePage() {
    // console.log('WE ARE IN HOME');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    serieDetailSection.classList.add('inactive');

    getTrendingSeriesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    // console.log('WE ARE IN CATEGORIES');
    headerSection.style.background = '';
    
    headerSection.classList.remove('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    serieDetailSection.classList.add('inactive');

    const [,categoryData] = location.hash.split('=');
    const [categoryId,categoryName] = categoryData.split('-');

    const categoryName2 = decodeURI(categoryName);
    headerCategoryTitle.innerHTML= categoryName2;

    getSeriesByCategory(categoryId);
}
function serieDetailsPage() {
    // console.log('WE ARE IN SERIE DETAILS');

    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    serieDetailSection.classList.remove('inactive');

    const [,serieId] = location.hash.split('=');
    getSerieById(serieId);
}
function searchPage() {
    // console.log('WE ARE IN SEARCH');
    headerSection.style.background = '';
 
    headerSection.classList.remove('header-container--long');
    headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    serieDetailSection.classList.add('inactive');

    const [,query] = location.hash.split('=');

    getSeriesBySearch(query);
}
function trendsPage() {
    // console.log('WE ARE IN TRENDS');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    serieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML= 'Tendencias';

    getTrendingSeries();
    // getAndAppendSeries('trending/tv/day',genericSection);
}