const selectors = document.querySelectorAll('.custom-select')
selectors.forEach(selector => {
  let selectOptions = selector.querySelectorAll('select option')
  
  selector.addEventListener('change', (e)=> {
    e.preventDefault()
    console.log("🚀 ~ selector.addEventListener ~ e.target.value:", e.target)
    console.log("🚀 ~ selector.addEventListener ~ e.target.value:", e.target.value)
  })
})