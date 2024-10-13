import { MultiClient } from 'nkn-sdk'
// @ts-ignore
import nkn from '../../../node_modules/nkn-sdk/dist/nkn.min.js'

const nknClient: MultiClient = new nkn.MultiClient()

let connectPromise: Promise<void>
const connect = async () => {
  if (connectPromise === undefined) {
    connectPromise = new Promise<void>((resolve, reject) => {
      nknClient.onConnect(() => resolve())
      nknClient.onConnectFailed(reject)
    })
  }
  try {
    await connectPromise
  } catch (e) {
    console.error(e)
  }
}

type Subscriber = {
  key: string
  topic: string
  callback: (sender: string, data: object) => void
}
const subscribers: Subscriber[] = []

const randomKey = () => Math.floor(Math.random() * Date.now()).toString(16)

const pub = (topic: string, message: Record<string, string | number>) => {
  const dispatch = async () => {
    await connect()
    message.topic = topic
    console.log('pub', topic, message)
    await nknClient.publish(topic, JSON.stringify(message))
    console.log('published')
  }
  dispatch()
}

const sub = (topic: string, callback: Subscriber['callback']) => {
  const key = randomKey()
  subscribers.push({ key, topic, callback })

  const dispatch = async () => {
    await connect()
    console.log('sub', topic)
    await nknClient.subscribe(topic, 100)
    console.log('subscribed')
  }
  dispatch()

  // returns an ussub function that removes the subscriber
  return () => {
    const index = subscribers.findIndex((s) => s.key === key)
    if (index > -1) {
      subscribers.splice(index, 1)
    }
  }
}

nknClient.onMessage((message) => {
  const data = JSON.parse(message.payload as string)
  const sender = message.src
  console.log('got message', data.topic, sender, data)
})

const client = {
  sub,
  pub,
}

export { client }
