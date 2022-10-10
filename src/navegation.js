searchFormBtn.addEventListener('click', () => {
    location.hash = '#search='
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
});
arrowBtn.addEventListener('click', () => {
    location.hash = '#home'
});
window.addEventListener('DOMContentLoaded',navigator, false);
window.addEventListener('hashchange',navigator, false);

function navigator() {
    console.log({location});
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

    location.hash
}

function homePage() {
    console.log('WE ARE IN HOME');

    headerSection.classList.remove('header-container--long');
    headerSection.style.backgound = '';
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
    console.log('WE ARE IN CATEGORIES');

    headerSection.classList.remove('header-container--long');
    headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    serieDetailSection.classList.add('inactive');
}
function serieDetailsPage() {
    console.log('WE ARE IN SERIE DETAILS');

    headerSection.classList.add('header-container--long');
    // headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    serieDetailSection.classList.remove('inactive');
}
function searchPage() {
    console.log('WE ARE IN SEARCH');

    headerSection.classList.remove('header-container--long');
    headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    serieDetailSection.classList.add('inactive');
}
function trendsPage() {
    console.log('WE ARE IN TRENDS');

    headerSection.classList.remove('header-container--long');
    headerSection.style.backgound = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    serieDetailSection.classList.add('inactive');
}