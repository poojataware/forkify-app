import Search from './models/Search';
/**Global state of the app
 * -Search object
 * -Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state={};

const controlSearch = async () => {
    //1)Get query from view
    const query = 'pizza'//TODO
    if(query){
        //2)new search object and add to state
        state.search = new Search(query);
        //3)prepare a UI for result
        
        //4)search for recipes 
        await state.search.getResults();
        //5)Render results on UI
        console.log(state.search.result);
    }
}
document.querySelector('.search').addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
    
});

