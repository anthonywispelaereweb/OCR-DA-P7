import { allRecipes, setCurrentRecipes, getCurrentRecipes } from './../utils/context.js'
import { filterRecipeWithSearhValue, filterRecipes } from './../utils/filterRecipes.js'
import { displayFilteredRecipes, displayTotalRecipes } from './../display/recipes.js'
import { updateSelectors } from './../display/select.js'
import { getSelectedTags } from './../utils/selectedTags.js'

const initSearchInput = () => {
  const searchInputGlobal = document.querySelector('#search')
  searchInputGlobal.addEventListener('input', e => {
    e.preventDefault()
    const searchValue = e.target.value
    let updatingRecipes = getCurrentRecipes()
    if (searchValue.length >= 3) {
      filterRecipeWithSearhValue(updatingRecipes.length !== allRecipes.length ? updatingRecipes : allRecipes, searchValue)
    } else {
      let currentTag = getSelectedTags()
      if (!!currentTag.appliances.length || !!currentTag.ingredients.length || !!currentTag.ustensils.length) {
        filterRecipes(currentTag)
      } else {
        setCurrentRecipes(allRecipes)
        displayTotalRecipes(allRecipes)
        displayFilteredRecipes(allRecipes)
        updateSelectors(allRecipes)
      }
    }
  })
}

export { initSearchInput }
