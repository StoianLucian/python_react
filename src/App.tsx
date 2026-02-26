import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routing/AppRoutes";
import "../i18n"
import ProfileMenu from "./components/profileMenu/ProfileMenu";


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ProfileMenu />
    </BrowserRouter>
  )
}

export default App
