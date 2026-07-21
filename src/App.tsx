import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routing/AppRoutes";

import ProfileMenu from "./components/profileMenu/ProfileMenu";
import { ChatContextProvider } from "./api/context/chatContext/ChatContext";


function App() {
  return (
    <BrowserRouter>
      <ChatContextProvider>
        <ProfileMenu />
        <AppRoutes />
      </ChatContextProvider>
    </BrowserRouter>
  )
}

export default App
