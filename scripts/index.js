
import { getData } from './utils/api.js'
import { displayFilteredRecipes, displayTotalRecipes } from './utils/displayRecipes.js'
import { displaySelectors } from './utils/displaySelect.js'

const initRecipes = async() => {
  const recipes = await getData('./assets/data/recipes.json')
  
  return recipes
}

initRecipes().then((data)=> {
  displayFilteredRecipes(data)
  displaySelectors(data)
  displayTotalRecipes(data)
})