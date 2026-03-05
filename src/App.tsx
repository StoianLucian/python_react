import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routing/AppRoutes";

import ProfileMenu from "./components/profileMenu/ProfileMenu";


function App() {
  return (
    <BrowserRouter>
      <ProfileMenu />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
