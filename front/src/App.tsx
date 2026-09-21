import { AuthContextProvider } from "./contexts/AuthContext"
import { WebRoutes } from "./routes"


function App() {


  return (
    <AuthContextProvider>
      <WebRoutes />
    </AuthContextProvider>
  )
}

export default App
