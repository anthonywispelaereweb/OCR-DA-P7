import { selectedTags, updateSelectedTags } from './selectedTags.js'

const translateFormat = valueToTranslate => {
  let translatedFormat = ''
  switch (valueToTranslate) {
    case 'ingredients':
      translatedFormat = 'ingrédients'
      break
    case 'ustensils':
      translatedFormat = 'ustensiles'

      break
    case 'appliances':
      translatedFormat = 'appareils'
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
      tag.title = `Supprimer le tag ${translateFormat(key)} ${value}`
      const itag = document.createElement('i')
      itag.classList.add('fas', 'fa-times', 'close-icon')
      tag.classList.add('tag')
      tag.innerHTML = `<span class="tag-label">${value}</span>`
      tag.addEventListener('click', () => {
        updateSelectedTags(value, key)
        displayTags(selectedTags)
      })
      tag.appendChild(itag)
      tagsCtn.appendChild(tag)
    })
  })
}

// Event handler for open/close dropdown menu
const handleOpenClick = (panel, headerSelect) => {
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
    panel.querySelector('input').focus()
  }
}
 
const setSelectors = (recipes) => {
  let currentSelectors = {
    ingredients: new Set(),
    ustensils: new Set(),
    appliances: new Set()
  }
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredientInfo => currentSelectors.ingredients.add(capitalizeFirstLetter(ingredientInfo.ingredient)))
    recipe.ustensils.forEach(ustencil => currentSelectors.ustensils.add(capitalizeFirstLetter(ustencil)))
    currentSelectors.appliances.add(capitalizeFirstLetter(recipe.appliance))
  })
  let sortedSelectors = {
    ingredients: Array.from(currentSelectors.ingredients).sort((a, b) => a.localeCompare(b)),
    ustensils: Array.from(currentSelectors.ustensils).sort((a, b) => a.localeCompare(b)),
    appliances: Array.from(currentSelectors.appliances).sort((a, b) => a.localeCompare(b))
  }
  return sortedSelectors
}

const getElements = (key) => {
  const selectorHtmlParent = document.querySelector(`.custom-select.${key}`)
  const panel = selectorHtmlParent.querySelector('.dropdownMenu-panel')
  const optionsCtn = panel.querySelector('.dropdownMenu-panel-options-ctn')
  const headerSelect = selectorHtmlParent.querySelector('.dropdownMenu-header-select')
  return {selectorHtmlParent, panel, optionsCtn, headerSelect}
}
const displaySelectors = recipes => {

  let sortedSelectors = setSelectors(recipes)

  Object.entries(sortedSelectors).forEach(([key, values]) => {
    const { selectorHtmlParent, panel, headerSelect} = getElements(key)
    
    //Manage open/close panel
    selectorHtmlParent.addEventListener('click', e => {
      e.preventDefault()
      if (e.target.classList.contains('dropdownMenu-header-select') || e.target.classList.contains('fa-chevron-down')) {
        handleOpenClick( panel, headerSelect)
      }
    })
    const selector = selectorHtmlParent.querySelector('.dropdownMenu-panel')

    //insert input search
    const searchOptionCtn = document.createElement('div')
    searchOptionCtn.classList.add('dropdownMenu-panel-search-ctn')
    searchOptionCtn.innerHTML = `<form role="search" class="search-input-ctn search-input-ctn-${key}">
      <input id="searchInput${key}"
             aria-label="Rechercher un ${translateFormat(key)}" 
             type="search" 
             name="search-ustensils"
             placeholder="Rechercher un ${translateFormat(key)}" 
             class="search-${key}" />
      <i class="fas fa-search search-input-icon"></i>
    </form>`
    selector.appendChild(searchOptionCtn)

    const searchInputCtn = document.querySelector(`.search-input-ctn-${key}`)
    searchInputCtn.addEventListener('submit', e => e.preventDefault())
    const optionsCtn = document.createElement('div')
    optionsCtn.classList.add('dropdownMenu-panel-options-ctn')
    searchInputCtn.classList.add('search-input-ctn')
    const searchInput = document.querySelector(`#searchInput${key}`)

    // Search input event
    searchInput.addEventListener('input', e => {
      const searchValue = e.target.value
      const options = selector.querySelectorAll('.dropdownMenu-panel-option')

      options.forEach(option => {
        if (option.textContent.toLowerCase().includes(searchValue.trim().toLowerCase())) {
          option.style.display = 'flex'
        } else {
          option.style.display = 'none'
        }
      })
    })

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
        panel.querySelector('.search-input-ctn').reset()
        panel.classList.toggle('open')
        headerSelect.classList.toggle('open')
        displayTags(selectedTags)
      })
      optionsCtn.appendChild(option)
    })
    panel.appendChild(optionsCtn)
  })

  // Close dropdown menu when click outside
  document.addEventListener('click', event => {
    if (!event.target.closest('.dropdownMenu') && document.querySelector('.dropdownMenu-panel.open')) {
      document.querySelector('.dropdownMenu-panel.open').classList.remove('open')
      document.querySelector('.dropdownMenu-header-select.open').classList.remove('open')
      document.querySelectorAll('.search-input-ctn').forEach(el => el.reset())
    }
  })
  return sortedSelectors
}

const updateSelectors = (recipes) => {
  
  let sortedSelectors = setSelectors(recipes)

  Object.entries(sortedSelectors).forEach(([key, values]) => {
    const { panel, optionsCtn, headerSelect} = getElements(key)

    optionsCtn.innerHTML = ''
    values.forEach(valueOption => {
      const option = document.createElement('a')
      const iClose = document.createElement('i')
      iClose.classList.add('fas', 'fa-times-circle', 'close-icon')

      option.dataset.value = valueOption
      option.textContent = valueOption
      option.dataset.key = `${key}-${valueOption}`
      option.classList.add('dropdownMenu-panel-option')
      // Check selected tags
      if (selectedTags[key].includes(valueOption)) {
        option.setAttribute('aria-selected', true)
      } else {
        option.setAttribute('aria-selected', false)
      }

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
        // Reset search input
        document.querySelector(`.search-input-ctn-${key}`).reset()
        displayTags(selectedTags)
      })
      optionsCtn.appendChild(option)
    })

  })


}
export { displaySelectors, updateSelectors, translateFormat }
