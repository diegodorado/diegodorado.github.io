const emojis = '💩😃😂😍😎👿💚👌🖐️🐵🐱🕑🌗💊👺😿🙀👏💜💣💪'
const patterns = [
  'a b',
  'a b ~ c',
  'a*x? c',
  '[a*2 a*2?] b',
  'a b*2 c d*4',
  '[a b a c]/2',
  '<a b*2 c*4>',
  'a(x,8)',
  'a(<x y>, 8)',
]

let shuffle = (a) => {
  for (var i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }
}

let random = (min,max) => {
  return Math.floor(Math.random()*(max-min))+min
}

let randomPattern = ()=>{
  let p = patterns[random(0,patterns.length)]
  let r = []
  for(let e of emojis){
    if(e.length>1) r.push(e)
  }
  shuffle(r)
  for (const [i, v] of ['a','b','c','d'].entries()) {
    p = p.split(v).join(r[i])
  }
  for (const i of ['x','y']) {
    p = p.split(i).join(random(2,7))
  }
  return p
}

export randomPattern
