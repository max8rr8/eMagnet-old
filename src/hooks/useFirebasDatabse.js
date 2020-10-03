import { useState, useEffect, useContext, createContext } from 'react'

export class FirebaseDatabaseEntry {
  constructor(ref) {
    this.lastValue = null
    this.resolved = false
    this.listens = false
    this.ref = ref
    this.subscribers = []
    this.handler = null
  }

  subscribe(handler) {
    const id = this.subscribers.push(handler) - 1
    if (!this.listens) {
      this.handler = (snapshot) => {
        this.resolved = true
        this.lastValue = snapshot.val()
        this.subscribers.forEach((subscriber) => subscriber())
      }

      this.ref.on('value', this.handler)
      this.listens = true
    }

    return id
  }

  unsubscribe(id) {
    this.subscribers.splice(id, 1)
    if (this.subscribers.length === 0) {
      this.listens = false
      this.red.off('value', this.handler)
    }
  }

  wait() {
    if (this.resolved) return Promise.resolve()
    return new Promise((resolve) => {
      this.ref.once('value', (snapshot) => {
        this.resolved = true
        this.lastValue = snapshot.val()
        this.subscribers.forEach((subscriber) => subscriber())
        resolve()
      })
    })
  }

  read() {
    return {
      ready: this.resolved,
      data: this.lastValue
    }
  }

  serialize() {
    return this.read()
  }

  deserialize(ob) {
    this.lastValue = ob.data
    this.resolved = ob.ready
  }
}

export class FirebaseDatabaseProvider {
  constructor() {
    this.cache = new Map()
  }

  getEntry(ref) {
    const path = ref.path.toString()
    if (!this.cache.has(path))
      this.cache.set(path, new FirebaseDatabaseEntry(ref))
    return this.cache.get(path)
  }

  subscribe(ref, handl) {
    return this.getEntry(ref).subscribe(handl)
  }

  unsubscribe(ref, id) {
    return this.getEntry(ref).unsubscribe(id)
  }

  read(ref) {
    return {
      ready: this.getEntry(ref).resolved,
      data: this.getEntry(ref).lastValue
    }
  }

  wait(ref) {
    return this.getEntry(ref).wait()
  }

  serialize() {
    const result = {}

    this.cache.forEach((v, k) => {
      result[k] = v.serialize()
    })

    return JSON.stringify(result)
  }

  deserialize(db, ob) {
    Object.entries(ob).forEach(([path, value]) => {
      const entry = new FirebaseDatabaseEntry(db.ref(path))
      entry.deserialize(value)
      this.cache.set(path, entry)
    })
  }
}

export const FirebaseDatabaseContext = createContext(
  new FirebaseDatabaseProvider()
)

export function useFirebaseDatabase(ref) {
  const provider = useContext(FirebaseDatabaseContext)
  if (!provider.read(ref).ready) throw provider.wait(ref)

  const [state, setState] = useState(provider.read(ref))
  useEffect(() => {
    const id = provider.subscribe(ref, () => {
      setState(provider.read(ref))
    })
    return () => provider.unsubscribe(ref, id)
  }, [ref, provider])
  return state
}
