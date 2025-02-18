
let allRecipes = []
const initRecipes = async() => {
  const recipes = await getData('./assets/data/recipes.json')
  if (recipes) allRecipes = recipes
  return recipes
}

initRecipes().then((data)=> {
  displayFilteredRecipes(data)
  displaySelectors(data)
})