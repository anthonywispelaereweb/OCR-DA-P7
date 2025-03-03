# OCR-DA-P7
Projet 7 du parcours Développeur d'application JavaScript React - Développez un algorithme de recherche en JavaScript


Used jsben.ch to compare the different javascript loop methods : https://jsben.ch/Wm697

SetUp : 
```
const recipes = [
  {
    "id": 1,
    "image": "Recette01.jpg",
    "name": "Limonade de Coco",
    "servings": 1,
    "ingredients": [
      {
        "ingredient": "Lait de coco",
        "quantity": 400,
        "unit": "ml"
      },
      {
        "ingredient": "Jus de citron",
        "quantity": 2
      },
      {
        "ingredient": "Crème de coco",
        "quantity": 2,
        "unit": "cuillères à soupe"
      },
      {
        "ingredient": "Sucre",
        "quantity": 30,
        "unit": "grammes"
      },
      {
        "ingredient": "Glaçons"
      }
    ],
    "time": 10,
    "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
    "appliance": "Blender",
    "ustensils": ["cuillère à Soupe", "verres", "presse citron"]
  },
  ...
]

let newRecipes = []

```

Use while
```
let count = 0;
while(newRecipes.length === recipes.length) {
  newRecipes.push(recipes[count])
  count++
}
```

Use forEach
```
recipes.forEach(recipe => newRecipes.push(recipe))
```

Use for
```
for (let index = 0; index < recipes.length; index++) {
  newRecipes.push(recipes[index])
}
```

Use map
```
newRecipes = recipes.map(recipe => recipe)
```

Use for in
```
for (let recipe in recipes) {
  newRecipes.push(recipe)
}
```