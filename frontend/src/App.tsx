import { useEffect, useState } from "react"
import { api } from "./services/api"

function App() {
  const [data, setData] = useState<any[]>([])

  const fetch = async () => {
    try {
      const fetch = await api.get("/customers")

      setData(fetch.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      {data.map((data) => (
        <p>{data.name}</p>
      ))}
    </div>
  )
}

export default App
