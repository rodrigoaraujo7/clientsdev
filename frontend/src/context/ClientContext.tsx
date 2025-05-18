import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

import { api } from "../services/api";

import type { Client } from "../types/Client"

type ClientContextProps = {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ClientContext = createContext<ClientContextProps | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchClients = async () => {
    try {
      const response = await api.get("/customers")

      setClients(response.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <ClientContext.Provider value={{
      clients,
      setClients,
      loading,
      setLoading
    }}>
      {children}
    </ClientContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useClientContext = () => {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error("useClientContext must be used in ClientProvider")
  }

  return context;
}