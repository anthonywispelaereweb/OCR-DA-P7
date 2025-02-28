import { getData } from './utils/api.js'
import { displayFilteredRecipes, displayTotalRecipes } from './display/recipes.js'
import { displaySelectors } from './display/select.js'
import { updateAllRecipes, setCurrentRecipes } from './utils/context.js'
import { initSearchInput } from './utils/searchInput.js'

const initRecipes = async () => {
  const recipes = await getData('./assets/data/recipes.json')
  return recipes
}

initRecipes().then(data => {
  displayFilteredRecipes(data)
  displaySelectors(data)
  displayTotalRecipes(data)
  updateAllRecipes(data)
  setCurrentRecipes(data)
  initSearchInput()
})
