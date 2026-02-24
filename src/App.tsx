import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routing/AppRoutes";
import "../i18n"
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import ProfileMenu from "./components/profileMenu/ProfileMenu";


function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget); // anchor the menu to this button
  };

  const handleClose = () => {
    setAnchorEl(null); // close menu
  };
  return (
    <BrowserRouter>
      <AppRoutes />
      <ProfileMenu />
    </BrowserRouter>
  )
}

export default App
