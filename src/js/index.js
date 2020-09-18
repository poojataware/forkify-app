import Search from './models/Search';
import recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
/**Global state of the app
 * -Search object
 * -Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state = {};

/* SEARCH CONTROLLER */

const controlSearch = async () => {
    //1)Get query from view
    const query = searchView.getInput();//TODO
    if (query) {
        //2)new search object and add to state
        state.search = new Search(query);
        //3)prepare a UI for result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            //4)search for recipes 
            await state.search.getResults();
            //5)Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something is wrong in search');
        }

    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
elements.searchResPages.addEventListener('click', e => {
    console.log(e.target);
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/* RECIPE CONTROLLER */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        // Prepare UI for changes

        //Create new recipe object
        state.recipe = new recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and Time
            state.recipe.calcTime;
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Something is wrong in recipe');
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));