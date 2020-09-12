import axios from 'axios';
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.id}`);
            this.title = res.data.recipes.title;
            this.author = res.data.recipes.publisher;
            this.img = res.data.recipes.image_url;
            this.url = res.data.recipes.source_url;
            this.ingredients = res.data.recipes.Ingredients;
            console.log(res);
            this.result = res.data.recipes;
            

        }
        catch (error) {
            alert(error);
        }

    }
}
