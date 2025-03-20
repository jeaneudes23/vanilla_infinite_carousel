const cards = document.querySelectorAll('.card')
const cardWidth = parseFloat(cards[0].getBoundingClientRect().width)
const total = cards.length


const prev = () => {
  cards.forEach((card, index) => {
    const offset = parseFloat(card.dataset.offset)
    const start = parseFloat(card.dataset.start)
    const newOffset = offset + cardWidth
    card.dataset.offset = newOffset
    card.style['z-index'] = 1
    card.style.transform = `translateX(${newOffset}px)`
    if ((cardWidth*(total - 1) - start) == (newOffset) ) {
      const wrapoffset = (start + cardWidth) * - 1
      card.dataset.offset = wrapoffset
      card.style['z-index'] = -1
      card.style.transform = `translateX(${wrapoffset}px)`
    }
  })
}

const next = () => {
  cards.forEach((card, index) => {
    const offset = parseFloat(card.dataset.offset)
    const start = parseFloat(card.dataset.start)
    const newOffset = offset - cardWidth
    card.dataset.offset = newOffset
    card.style['z-index'] = 1
    card.style.transform = `translateX(${newOffset}px)`
    if (newOffset < start && (Math.abs(newOffset) - (cardWidth * 2)) == start) {
      const wrapoffset = cardWidth * (total - 2) - start
      card.dataset.offset = wrapoffset
      card.style['z-index'] = -1
      card.style.transform = `translateX(${wrapoffset}px)`
    }
  })
}

const setLastCardInitialoffset = () => {
  const lastCard = cards[total - 1]
  const lastCardoffset = parseFloat(lastCard.dataset.start) + cardWidth
  lastCard.dataset.offset = lastCardoffset * - 1
  lastCard.style['z-index'] = -1
  lastCard.style.transform = `translateX(-${lastCardoffset}px)`
}

const initializeCards = () => {
  cards.forEach((card, index) => {
    card.dataset.start = index * cardWidth
    card.dataset.offset = 0
  })

  setLastCardInitialoffset()
}

initializeCards()

setInterval(() => {
  prev()
}, 1000);