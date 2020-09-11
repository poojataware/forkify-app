import Search from './models/Search';
import {elements,renderLoader,clearLoader} from './views/base';
import * as searchView from './views/searchView';
/**Global state of the app
 * -Search object
 * -Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state={};

const controlSearch = async () => {
    //1)Get query from view
    const query = searchView.getInput();//TODO
    if(query){
        //2)new search object and add to state
        state.search = new Search(query);
        //3)prepare a UI for result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4)search for recipes 
        await state.search.getResults();
        //5)Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}
elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
    
});

elements.searchResPages.addEventListener('click', e => {
    const btn=e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);        
    }
});