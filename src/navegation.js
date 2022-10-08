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
        getTrendingSeriesPreview();
        getCategoriesPreview();
    }

    location.hash
}

function homePage() {
    console.log('WE ARE IN HOME');
}
function categoriesPage() {
    console.log('WE ARE IN CATEGORIES');
}
function serieDetailsPage() {
    console.log('WE ARE IN SERIE DETAILS');
}
function searchPage() {
    console.log('WE ARE IN SEARCH');
}
function trendsPage() {
    console.log('WE ARE IN TRENDS');
}