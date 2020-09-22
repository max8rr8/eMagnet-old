import { useState, useEffect, useContext, createContext } from 'react'

export class FirebaseDatabaseEntry {
  constructor(ref) {
    this.lastValue = null;
    this.resolved = false;
    this.listens = false;
    this.ref = ref
    this.subscribers = [];
    this.handler = null
  }

  subscribe(handler) {
    let id = this.subscribers.push(handler) - 1;
    if(!this.listens){
      this.handler = snapshot=>{
        this.resolved = true;
        this.lastValue = snapshot.val()
        this.subscribers.forEach(e=>e())
      }
      this.ref.on('value', this.handler)
      this.listens = true;
    }
    return id
  }

  unsubscribe(id) {
    this.subscribers.splice(id, 1)
    if(this.subscribers.length == 0){
      this.listens = false;
      this.red.off('value', this.handler)
    }
  }

  wait() {
    if(this.resolved) return Promise.resolve()
    return new Promise(resolve=>{
      this.ref.once('value', snapshot=>{
        this.resolved = true
        this.lastValue = snapshot.val()
        this.subscribers.forEach((e) => e())
        resolve()
      })
    })
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
      data: this.getEntry(ref).lastValue,
    }
  }

  wait(ref) {
    return this.getEntry(ref).wait()
  }
}

export const FirebaseDatabaseContext = createContext(new FirebaseDatabaseProvider())

export function useFirebaseDatabase(ref) {
  const provider = useContext(FirebaseDatabaseContext)
  if(!provider.read(ref).ready)
    throw provider.wait(ref)
  
  const [state, setState] = useState(provider.read(ref))
  useEffect(()=>{
    let id = provider.subscribe(ref, ()=>{
      setState(provider.read(ref))
    })
    return ()=>provider.unsubscribe(ref, id)
  }, [ref])
  return state
}