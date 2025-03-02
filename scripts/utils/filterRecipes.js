import { allRecipes, setCurrentRecipes } from './context.js'
import { displayFilteredRecipes, displayTotalRecipes } from './../display/recipes.js'
import { updateSelectors } from './../display/select.js'
const filterRecipes = selectedTags => {
  let allTags = []
  for(let i = 0; i < Object.values(selectedTags).length; i++) {
    if(Object.values(selectedTags)[i].length) {
      allTags.push(String(Object.values(selectedTags)[i]).toLowerCase())
    }
  }

  if (allTags.length === 0) {
    setCurrentRecipes(allRecipes)
    displayTotalRecipes(allRecipes)
    displayFilteredRecipes(allRecipes)
    updateSelectors(allRecipes)
    return allRecipes
  }
  let filteredRecipes = []
  for(let i = 0; i < allRecipes.length; i++) {
    let recipesElement = []
    recipesElement.push(allRecipes[i].appliance.toLowerCase())
    for(let y = 0; y < allRecipes[i].ingredients.length; y++ ) {
      recipesElement.push(allRecipes[i].ingredients[y].ingredient.toLowerCase())
    }
    for(let x = 0; x < allRecipes[i].ustensils.length; x++ ) {
      recipesElement.push(allRecipes[i].ustensils[x].toLowerCase())
    }
    if (allTags.every(tag => recipesElement.includes(tag))) {
      filteredRecipes.push(allRecipes[i])
    }
  }

  setCurrentRecipes(filteredRecipes)
  displayTotalRecipes(filteredRecipes)
  displayFilteredRecipes(filteredRecipes)
  updateSelectors(filteredRecipes)

  return filteredRecipes
}

const filterRecipeWithSearhValue = (recipes, value) => {
  const lowerValue = value.toLowerCase()
  let filteredRecipes = []
  for(let i = 0; i < recipes.length;i++) {
    if (
      recipes[i].name.toLowerCase().includes(lowerValue) ||
      recipes[i].ingredients.some(ing => ing.ingredient.toLowerCase().includes(lowerValue)) ||
      recipes[i].appliance.toLowerCase().includes(lowerValue) ||
      recipes[i].description.toLowerCase().includes(lowerValue)
    ) {
      filteredRecipes.push(recipes[i])
    }
  }

  setCurrentRecipes(filteredRecipes)
  displayTotalRecipes(filteredRecipes)
  displayFilteredRecipes(filteredRecipes)
  updateSelectors(filteredRecipes)
  return filteredRecipes
}
export { filterRecipes, filterRecipeWithSearhValue }
