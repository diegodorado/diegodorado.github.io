import MidiWorker from './midi.worker.js'

const midiWorker = typeof window === 'object' && new MidiWorker()

export default midiWorker
