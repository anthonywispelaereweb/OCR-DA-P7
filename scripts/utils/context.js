let allRecipes = []
let currentRecipes = []
const updateAllRecipes = (newRecipes) => {
  allRecipes = newRecipes
  return allRecipes
}

const setCurrentRecipes = (newRecipes) => {
  currentRecipes = newRecipes
  return currentRecipes
}
const getCurrentRecipes = () => {
  return currentRecipes
}

export { allRecipes, currentRecipes, updateAllRecipes, setCurrentRecipes, getCurrentRecipes }