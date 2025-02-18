const displayFilteredRecipes = (recipes) => {
  console.log("🚀 ~ displayFilteredRecipes ~ recipes:", recipes)
  for(let i = 0; i < recipes.length; i++) {
    displayRecipe(recipes[i])
  }
}

const displayRecipe = (recipes) => {
  const galery = document.querySelector('.recipe-galery')
  const article = document.createElement('article')
  article.classList.add('card-recipe')
  let template = `
    <div class="card-image">
      <img src="./assets/images/recettes/${recipes.image}"/>
    </div>
    <div class="card-content">
      <div class="card-title">
        ${recipes.name}
      </div>
      <p class="card-sub-title">Recette</p>
      <div class="card-description">
        ${recipes.description}
      </div>
      <p class="card-sub-title">Ingrédients</p>
    </div>
  `
  article.innerHTML = template
  let tagTime = document.createElement('span')
  tagTime.classList.add('card-time')
  tagTime.innerHTML = `${recipes.time}min`

  article.appendChild(tagTime)

  const listIngredient = document.createElement('ul')
  listIngredient.classList.add('card-content-ingredient')
  let sortedIngrident= recipes.ingredients
  console.log("🚀 ~ displayRecipe ~ recipes.ingredients:", recipes.ingredients)
  sortedIngrident.forEach(ingredient => {
    const ingredientItem = document.createElement('li')
    ingredientItem.innerHTML = `
      <span class="card-ingredient">${ingredient.ingredient}</span>
      <span class="card-ingredient-quantity">
        ${ingredient?.quantity ?? '-'}
        ${ingredient?.unit ?? ''}
      </span>
    `
    listIngredient.appendChild(ingredientItem)
  })
  article.appendChild(listIngredient)

  
  galery.appendChild(article)
}

const capitalizeFirstLetter = word => `${word.charAt(0).toUpperCase()}${word.substring(1)}`

const displaySelectors = (recipes) => {

  let selectors = {
    ingredients: new Set(),
    ustensils: new Set(),
    appliances: new Set()
  }
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredientInfo => selectors.ingredients.add(capitalizeFirstLetter(ingredientInfo.ingredient)) )
    recipe.ustensils.forEach(ustencil => selectors.ustensils.add(capitalizeFirstLetter(ustencil)) )
    selectors.appliances.add(capitalizeFirstLetter(recipe.appliance))
  })
  let sortedSelectors = {
    ingredients: Array.from(selectors.ingredients).sort((a, b) => a.localeCompare(b)),
    ustensils: Array.from(selectors.ustensils).sort((a, b) => a.localeCompare(b)),
    appliances: Array.from(selectors.appliances).sort((a, b) => a.localeCompare(b))
  }

  Object.entries(sortedSelectors).forEach(([key, values]) => {
    const selectorHtmlParent = document.querySelector(`.custom-select.${key}`)

    const selector = selectorHtmlParent.querySelector('select')
    values.forEach(valueOption => {
      const option = document.createElement('option')
      option.value= valueOption
      option.textContent = valueOption
      selector.appendChild(option)

    })
  })

  return sortedSelectors
}