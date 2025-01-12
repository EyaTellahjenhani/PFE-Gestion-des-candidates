import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './Hooks/AuthContext.jsx'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
         <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
