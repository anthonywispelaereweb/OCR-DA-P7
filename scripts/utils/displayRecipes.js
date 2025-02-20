

const displayFilteredRecipes = (recipes) => {
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

const displayTotalRecipes = (recipes) => {
  const totalRecipes = document.querySelector('.total-recipes')
  totalRecipes.textContent = `${recipes.length} recette${recipes.length > 1 ? 's' :''}`
}

export { displayFilteredRecipes, displayTotalRecipes }