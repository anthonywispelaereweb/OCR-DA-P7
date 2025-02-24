import { allRecipes, currentRecipes, updateCurrentRecipess } from './context.js'
import { displayFilteredRecipes, displayTotalRecipes } from './../utils/displayRecipes.js'
import { updateSelectors } from './../utils/displaySelect.js'
const filterRecipes = (selectedTags) => {
  let allTags = []
  Object.values(selectedTags).forEach((tag) => {
    return tag.map(itemTag => {
      allTags.push(itemTag.toLowerCase())
    })
  } )
  if (allTags.length === 0) {
    updateCurrentRecipess(allRecipes)
    displayTotalRecipes(allRecipes)
    displayFilteredRecipes(allRecipes)
    updateSelectors(allRecipes)
    return allRecipes
  }
  let filteredRecipes = allRecipes.filter(recipe => {
    let recipesElement = []
    recipesElement.push(recipe.appliance.toLowerCase())
    recipe.ingredients.forEach(ingredientInfo => recipesElement.push(ingredientInfo.ingredient.toLowerCase()))
    recipe.ustensils.forEach(ustencil => recipesElement.push(ustencil.toLowerCase()))
    if (allTags.every(tag => recipesElement.includes(tag))) {
      return recipe
    }
  })
  
  updateCurrentRecipess(filteredRecipes)
  displayTotalRecipes(currentRecipes)
  displayFilteredRecipes(currentRecipes)
  updateSelectors(currentRecipes)

  return filteredRecipes
}

export { filterRecipes }