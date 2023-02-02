const colors = {
  orange: '#fbcf34',
  mango: '#d20d42',
  pinapple: '#047251',
}

const updateActiveButton = () => {
  const hash = window.location.hash
  const path = hash.slice(1)

  const buttonGroup = document.querySelector('.button-group')
  const children = buttonGroup.children
  Array.from(children).forEach((child) => {
    if (!path && child.dataset.linkTo === 'orange') {
      document.body.style.backgroundColor = colors.orange
      child.classList.add('active')
      return
    }
    if (child.dataset.linkTo === path) {
      console.log(colors[path])
      document.body.style.backgroundColor = colors[path]
      child.classList.add('active')
    } else {
      child.classList.remove('active')
    }
  })
}

updateActiveButton()

let isScrolling = false
let isHashChanging = false
const leafDegrees = []

const getLeafDegrees = () => {
  const leafs = document.querySelectorAll('.leaf')
  leafs.forEach((leaf) => {
    const rotation = window.getComputedStyle(leaf).getPropertyValue('transform')
    const angle = rotation.split('(')[1].split(')')[0].split(',')[0]
    //convert to degrees
    const angleDeg = (angle * 180) / Math.PI
    leafDegrees.push(angleDeg)
  })
}

getLeafDegrees()

const animate = () => {
  if (!isScrolling) {
    requestAnimationFrame(animate)
    return
  }

  leafDegrees.forEach((degree, index) => {
    const leaf = document.querySelectorAll('.leaf')[index]
    const newDegree = degree + 1 + Math.random()
    leaf.style.transform = `rotate(${newDegree}deg)`
    leafDegrees[index] = newDegree
  })

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

window.addEventListener('scroll', () => {
  if (isHashChanging && !isScrolling) {
    isScrolling = true
  }

  clearTimeout(isScrolling)
  isScrolling = setTimeout(() => {
    isScrolling = false
  }, 66)
})

window.addEventListener('hashchange', () => {
  isHashChanging = true
  setTimeout(() => {
    isHashChanging = false
  }, 66)

  updateActiveButton()
})
