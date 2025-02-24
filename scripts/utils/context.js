let allRecipes = []
let currentRecipes = []
const updateAllRecipes = (newRecipes) => {
  allRecipes = newRecipes
  return allRecipes
}

const updateCurrentRecipess = (newRecipes) => {
  currentRecipes = newRecipes
  return currentRecipes
}
export { allRecipes, currentRecipes, updateAllRecipes, updateCurrentRecipess }