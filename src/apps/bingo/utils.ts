const fullUrl = (uri: string) =>
  !window ? '' : `${window.location.origin}${uri}`

const copy2clip = (text: string) => {
  const dummy = document.createElement('input')
  document.body.appendChild(dummy)
  dummy.value = text
  dummy.select()
  document.execCommand('copy')
  document.body.removeChild(dummy)
}

const copyLink = (url: string, el) => {
  copy2clip(url)
  el.classList.add('copied')
  setTimeout(() => {
    el.classList.remove('copied')
  }, 1000)
}

const shuffle = (b: number[]) => {
  const a = [...b]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const random75Card = () => {
  const c: number[][] = []
  const first15 = [...Array(15).keys()]
  for (let i = 0; i < 5; i++) {
    let col = first15.map((a) => 15 * i + a + 1)
    col = shuffle(col)
    col = col.slice(0, 5)
    col = col.sort((a, b) => a - b)
    if (i === 2) col[2] = 0
    c.push(col)
  }
  //transpose
  return c[0].map((_, i) => c.map((r) => r[i]))
}

const random90Card = () => {
  const c: number[][] = []
  // select which cells have data
  for (let i = 0; i < 3; i++) c.push(shuffle([1, 1, 1, 1, 1, 0, 0, 0, 0]))

  for (let i = 0; i < 9; i++) {
    let numbers = [...Array(9).keys()]
      .map((x) => i * 10 + x)
      .filter((x) => x !== 0)
    if (i === 8) numbers.push(90)

    // select 3 random numbers, sorted
    numbers = shuffle(numbers).slice(0, 3).sort()

    for (let j = 0; j < 3; j++) if (c[j][i]) c[j][i] = numbers[j]
  }

  return c
}

export { fullUrl, random90Card, random75Card, copy2clip, copyLink }
