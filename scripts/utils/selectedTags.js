const selectedTags = {
  ingredients: [],
  ustensils: [],
  appliances: []
}

const updateSelectedTags = (tag, type) => {
  if (selectedTags[type].includes(tag)) {
    selectedTags[type] = selectedTags[type].filter(item => item !== tag)
    // Remove tag from list select
    let tagToRemove = document.querySelector(`.dropdownMenu-panel-option[data-key="${type}-${tag}"]`)
    tagToRemove.setAttribute('aria-selected', 'false')
  } else {
    selectedTags[type].push(tag)
  }
}

export { selectedTags, updateSelectedTags }