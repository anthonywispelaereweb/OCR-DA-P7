import { selectedTags, updateSelectedTags } from './selectedTags.js'

const translateFormat = valueToTranslate => {
  let translatedFormat = ''
  switch (valueToTranslate) {
    case 'ingredients':
      translatedFormat = 'Ingrédients'
      break
    case 'ustensils':
      translatedFormat = 'Ustensiles'

      break
    case 'appliances':
      translatedFormat = 'Appareils'
      break

    default:
      translatedFormat = valueToTranslate
      break
  }
  return translatedFormat
}

const capitalizeFirstLetter = word => `${word.charAt(0).toUpperCase()}${word.substring(1)}`

const displayTags = tags => {
  const tagsCtn = document.querySelector('.tags-ctn')
  tagsCtn.innerHTML = ''
  Object.entries(tags).forEach(([key, values]) => {
    values.forEach(value => {
      const tag = document.createElement('div')
      const itag = document.createElement('i')
      itag.classList.add('fas', 'fa-times', 'close-icon')
      tag.classList.add('tag')
      tag.textContent = value
      tag.addEventListener('click', () => {
        updateSelectedTags(value, key)
        displayTags(selectedTags)
      })
      tag.appendChild(itag)
      tagsCtn.appendChild(tag)
    })
  })
}

const displaySelectors = recipes => {
  let selectors = {
    ingredients: new Set(),
    ustensils: new Set(),
    appliances: new Set()
  }
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredientInfo => selectors.ingredients.add(capitalizeFirstLetter(ingredientInfo.ingredient)))
    recipe.ustensils.forEach(ustencil => selectors.ustensils.add(capitalizeFirstLetter(ustencil)))
    selectors.appliances.add(capitalizeFirstLetter(recipe.appliance))
  })
  let sortedSelectors = {
    ingredients: Array.from(selectors.ingredients).sort((a, b) => a.localeCompare(b)),
    ustensils: Array.from(selectors.ustensils).sort((a, b) => a.localeCompare(b)),
    appliances: Array.from(selectors.appliances).sort((a, b) => a.localeCompare(b))
  }

  Object.entries(sortedSelectors).forEach(([key, values]) => {
    const selectorHtmlParent = document.querySelector(`.custom-select.${key}`)
    const panel = selectorHtmlParent.querySelector('.dropdownMenu-panel')
    const headerSelect = selectorHtmlParent.querySelector('.dropdownMenu-header-select')

    //Manage open/close panel
    selectorHtmlParent.addEventListener('click', e => {
      e.preventDefault()

      if (e.target.classList.contains('dropdownMenu-header-select') || e.target.classList.contains('fa-chevron-down')) {
        panel.classList.toggle('open')
        headerSelect.classList.toggle('open')
        let panels = document.querySelectorAll('.dropdownMenu-panel')
        // Close other panels
        panels.forEach(panelItem => {
          if (panelItem !== panel) {
            panelItem.classList.remove('open')
            panelItem.parentElement.querySelector('.dropdownMenu-header-select').classList.remove('open')
            panelItem.setAttribute('aria-expanded', false)
          }
        })
        if (panel.getAttribute('aria-expanded') === 'true') {
          panel.setAttribute('aria-expanded', false)
        } else {
          panel.setAttribute('aria-expanded', true)
        }
      }
    })
    const selector = selectorHtmlParent.querySelector('.dropdownMenu-panel')
    //insert input search
    const searchOptionCtn = document.createElement('div')
    searchOptionCtn.classList.add('dropdownMenu-panel-search-ctn')
    const searchInputCtn = document.createElement('div')
    searchInputCtn.classList.add('search-input-ctn')
    const searchInput = document.createElement('input')
    const searchOptioIcon = document.createElement('i')
    searchOptioIcon.classList.add('fas', 'fa-search', 'search-input-icon')
    searchInput.setAttribute('aria-label', `Rechercher un ${translateFormat(key)}`)
    searchInput.type = 'search'
    searchInput.placeholder = `Rechercher un ${translateFormat(key)}`
    searchInput.classList.add('search-input')
    searchInput.addEventListener('input', e => {
      const searchValue = e.target.value
      const options = selector.querySelectorAll('.dropdownMenu-panel-option')

      options.forEach(option => {
        if (option.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
          option.style.display = 'block'
        } else {
          option.style.display = 'none'
        }
      })
    })
    searchInputCtn.appendChild(searchInput)
    searchInputCtn.appendChild(searchOptioIcon)
    searchOptionCtn.appendChild(searchInputCtn)
    selector.appendChild(searchOptionCtn)

    // Insert options
    values.forEach(valueOption => {
      const option = document.createElement('a')
      const iClose = document.createElement('i')
      iClose.classList.add('fas', 'fa-times-circle', 'close-icon')

      option.dataset.value = valueOption
      option.textContent = valueOption
      option.dataset.key = `${key}-${valueOption}`
      option.classList.add('dropdownMenu-panel-option')
      option.setAttribute('aria-selected', false)

      option.role = 'listbox'
      option.appendChild(iClose)
      option.addEventListener('click', () => {
        if (option.getAttribute('aria-selected') === 'true') {
          option.setAttribute('aria-selected', false)
        } else {
          option.setAttribute('aria-selected', true)
        }
        updateSelectedTags(valueOption, key)

        panel.classList.toggle('open')
        headerSelect.classList.toggle('open')
        displayTags(selectedTags)
      })
      selector.appendChild(option)
    })
  })

  // Close dropdown menu when click outside
  document.addEventListener('click', event => {
    if (!event.target.closest('.dropdownMenu') && document.querySelector('.dropdownMenu-panel.open')) {
      document.querySelector('.dropdownMenu-panel.open').classList.remove('open')
      document.querySelector('.dropdownMenu-header-select.open').classList.remove('open')
    }
  })
  return sortedSelectors
}
export { displaySelectors }
