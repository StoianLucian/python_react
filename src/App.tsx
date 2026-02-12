import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"


function App() {
  const navigate = useNavigate();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
