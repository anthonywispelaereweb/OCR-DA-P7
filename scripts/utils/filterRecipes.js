import { allRecipes, setCurrentRecipes } from './context.js'
import { displayFilteredRecipes, displayTotalRecipes } from './../display/recipes.js'
import { updateSelectors } from './../display/select.js'
const filterRecipes = selectedTags => {
  let allTags = []
  Object.values(selectedTags).forEach(tag => {
    return tag.map(itemTag => {
      allTags.push(itemTag.toLowerCase())
    })
  })
  if (allTags.length === 0) {
    setCurrentRecipes(allRecipes)
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

  setCurrentRecipes(filteredRecipes)
  displayTotalRecipes(filteredRecipes)
  displayFilteredRecipes(filteredRecipes)
  updateSelectors(filteredRecipes)

  return filteredRecipes
}

const filterRecipeWithSearhValue = (recipes, value) => {
  const lowerValue = value.toLowerCase()
  let filteredRecipes = recipes.filter(recipe => {
    if (
      recipe.name.toLowerCase().includes(lowerValue) ||
      recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(lowerValue)) ||
      recipe.appliance.toLowerCase().includes(lowerValue) ||
      recipe.description.toLowerCase().includes(lowerValue)
    ) {
      return recipe
    }
  })
  setCurrentRecipes(filteredRecipes)
  displayTotalRecipes(filteredRecipes)
  displayFilteredRecipes(filteredRecipes)
  updateSelectors(filteredRecipes)
  return filteredRecipes
}
export { filterRecipes, filterRecipeWithSearhValue }
