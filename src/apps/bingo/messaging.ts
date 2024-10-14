//const socket = new WebSocket('ws://localhost:8080/')
const socket = new WebSocket('wss://bin-go.apps.diegodorado.com/')

const connect = new Promise<void>((resolve, reject) => {
  socket.onerror = () => reject()
  socket.onopen = () => resolve()
})

type Subscriber = {
  topic: string
  callback: (data: object) => void
}
const subscribers: Subscriber[] = []

const send = (
  type: 'pub' | 'sub' | 'unsub',
  topic: string,
  content?: object
) => {
  socket.send(
    JSON.stringify({
      type,
      topic,
      content: content !== undefined ? JSON.stringify(content) : undefined,
    })
  )
}

const pub = (topic: string, content: object) => {
  const dispatch = async () => {
    await connect
    console.log('pub', topic, content)
    send('pub', topic, content)
  }
  dispatch()
}

const sub = (topic: string, callback: Subscriber['callback']) => {
  subscribers.push({ topic, callback })

  const dispatch = async () => {
    await connect
    console.log('sub', topic)
    send('sub', topic)
  }
  dispatch()
}

const unsub = (topic: string) => {
  const dispatch = async () => {
    await connect
    console.log('unsub', topic)
    send('unsub', topic)
  }
  const index = subscribers.findIndex((s) => s.topic === topic)
  if (index > -1) {
    dispatch()
    subscribers.splice(index, 1)
  }
}

socket.onmessage = function (e) {
  const data = JSON.parse(e.data)

  if (data.type === 'pub') {
    const content = JSON.parse(data.content)
    subscribers.forEach((s) => {
      if (s.topic === data.topic) {
        s.callback(content)
      }
    })
  }
}

socket.onclose = function () {
  console.log('closed')
}

const client = {
  sub,
  pub,
  unsub,
}

export { client }
