import { useEffect, useState, type FormEvent } from "react"
import { api } from "./services/api"

import type { Client } from "./types/Client"

function App() {
  const [clients, setClients] = useState<Client[]>([])
  const [inputNameValue, setInputNameValue] = useState<string>("")
  const [inputEmailValue, setInputEmailValue] = useState<string>("")

  const fetchClients = async () => {
    try {
      const response = await api.get("/customers")

      setClients(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const createClient = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.post<Client>("/customer", {
        name: inputNameValue,
        email: inputEmailValue
      })

      setClients([...clients, response.data])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div>
      <form onSubmit={createClient}>
        <input
          type="text"
          placeholder="name"
          name="name"
          id="name"
          value={inputNameValue} onChange={(e) => setInputNameValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          id="email"
          value={inputEmailValue} onChange={(e) => setInputEmailValue(e.target.value)}
        />
        <button type="submit">Criar cliente</button>
      </form>

      <ul>
        {clients.map((clients) => (
          <li>{clients.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
