import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import AppRoutes from "./routing/AppRoutes";
import "../i18n"


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
