import GraphemeSplitter from 'grapheme-splitter'

const splitter = new GraphemeSplitter()


export const customEmojis = [
  { name: '0', short_names: ['000'], imageUrl: '/images/icons/000.svg' },
  { name: '1', short_names: ['001'], imageUrl: '/images/icons/001.svg' },
  { name: '2', short_names: ['002'], imageUrl: '/images/icons/002.svg' },
  { name: '3', short_names: ['003'], imageUrl: '/images/icons/003.svg' },
  { name: '4', short_names: ['004'], imageUrl: '/images/icons/004.svg' },
  { name: '5', short_names: ['005'], imageUrl: '/images/icons/005.svg' },
  { name: '6', short_names: ['006'], imageUrl: '/images/icons/006.svg' },
  { name: '7', short_names: ['007'], imageUrl: '/images/icons/007.svg' },
  { name: '8', short_names: ['008'], imageUrl: '/images/icons/008.svg' },
  { name: '9', short_names: ['009'], imageUrl: '/images/icons/009.svg' },
  { name: '*', short_names: ['010'], imageUrl: '/images/icons/010.svg' },
  { name: '/', short_names: ['011'], imageUrl: '/images/icons/011.svg' },
  { name: '[', short_names: ['013'], imageUrl: '/images/icons/013.svg' },
  { name: ']', short_names: ['014'], imageUrl: '/images/icons/014.svg' },
  { name: '(', short_names: ['015'], imageUrl: '/images/icons/015.svg' },
  { name: ')', short_names: ['016'], imageUrl: '/images/icons/016.svg' },
  { name: '<', short_names: ['017'], imageUrl: '/images/icons/017.svg' },
  { name: '>', short_names: ['018'], imageUrl: '/images/icons/018.svg' },
  { name: '{', short_names: ['019'], imageUrl: '/images/icons/019.svg' },
  { name: '}', short_names: ['020'], imageUrl: '/images/icons/020.svg' },
  { name: '?', short_names: ['021'], imageUrl: '/images/icons/021.svg' },
  { name: '@', short_names: ['022'], imageUrl: '/images/icons/022.svg' },
  { name: '~', short_names: ['023'], imageUrl: '/images/icons/023.svg' },
  { name: '!', short_names: ['024'], imageUrl: '/images/icons/024.svg' },
  { name: '%', short_names: ['025'], imageUrl: '/images/icons/025.svg' },
  { name: ' ', short_names: ['026'], imageUrl: '/images/icons/026.svg' },
  { name: ',', short_names: ['027'], imageUrl: '/images/icons/027.svg' },
]

export const recentEmojis = ['000','001','002','003','004','005','006','007','008','009','010','011','013','014','015','016','017','018','019','020','021','022','023','024','025','026','027']

export const includeEmojis = ['recent','people','nature','foods','activity','places','objects']

export const i18nEmojis = { search: 'Filter', categories: { recent: 'Nums & Operators' } }

export let emojiArray = (str) => {
  return splitter.splitGraphemes(str)
}


const emojis = '😍😎👌🖐️🕑🌗💊👺😿🙀👏💣💪😂🤣😃🤗🤩😴😲🤢👿👹👺👾💩😺😹😻👽💔💚💜🐵🐭🦏🐸🦎🦀🐬🐦🐷🍉🍆🍾🍅🥝🎆🌝🌜🌚🌗❄️☂️🎉🍌'

export const alphaEmoji = splitter.splitGraphemes(emojis)

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

export let randomPattern = ()=>{
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
