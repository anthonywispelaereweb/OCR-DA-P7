import { filterRecipes, filterRecipeWithSearhValue } from './filterRecipes.js'
import { allRecipes, getCurrentRecipes } from './../utils/context.js'

const selectedTags = {
  ingredients: [],
  ustensils: [],
  appliances: []
}
const getSelectedTags = () => {
  return selectedTags
}
const setSelectedTags = (tag, type) => {
  if (selectedTags[type].includes(tag)) {
    selectedTags[type] = selectedTags[type].filter(item => item !== tag)
    // Remove tag from list select
    let tagToRemove = document.querySelector(`.dropdownMenu-panel-option[data-key="${type}-${tag}"]`)

    if (tagToRemove) tagToRemove.setAttribute('aria-selected', 'false')
  } else {
    selectedTags[type].push(tag)
  }

  filterRecipes(selectedTags)
  let updatingRecipes = getCurrentRecipes()
  const searchValue = document.querySelector('#search').value
  filterRecipeWithSearhValue(updatingRecipes.length !== allRecipes.length ? updatingRecipes : allRecipes, searchValue.trim())
}

export { selectedTags, setSelectedTags, getSelectedTags }
