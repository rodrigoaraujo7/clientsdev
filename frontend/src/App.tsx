import { useState, type FormEvent } from "react"
import { api } from "./services/api"

import type { Client } from "./types/Client"
import { useClientContext } from "./context/ClientContext"

function App() {
  const {
    clients,
    setClients,
    loading,
    setLoading
  } = useClientContext()

  const [inputNameValue, setInputNameValue] = useState<string>("")
  const [inputEmailValue, setInputEmailValue] = useState<string>("")

  const createClient = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await api.post("/customer", {
        name: inputNameValue,
        email: inputEmailValue
      })

      setClients(clients => [...clients, response.data])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteClient = async (id: string) => {
    try {
      await api.delete("/customer", {
        params: {
          id
        }
      })

      const updatedClients: Client[] = clients.filter(client => client.id !== id)

      setClients(updatedClients)
    } catch (error) {
      console.log(error)
    }
  }

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
        {clients.map((client) => (
          <li key={client.id} onClick={() => deleteClient(client.id)}>{client.name} - {client.id}</li>
        ))}

        {loading && <h1>carregando ....</h1>}
      </ul>
    </div>
  )
}

export default App
