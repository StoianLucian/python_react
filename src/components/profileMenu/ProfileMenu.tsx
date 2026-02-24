import { Button, FormControlLabel, Menu, Radio, RadioGroup } from "@mui/material"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../routing/routes";

function ProfileMenu() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(i18n.language);

    function handleClick(event: any) {
        setAnchorEl(event.currentTarget); // anchor the menu to this button
    }

    function handleClose() {
        setAnchorEl(null); // close menu
    }

    function handleLanguageChange(event: string) {
        setValue(event); // anchor the menu to this button
        i18n.changeLanguage(event);
    }

    function logout() {
        navigate(APP_PATHS.LOGIN)
    }

    return (
        <div style={{ position: "absolute", top: "0", right: "0", padding: "1rem" }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                Stoian Lucian
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <RadioGroup value={value} onChange={(e) => { handleLanguageChange(e.target.value) }} style={{ padding: "1rem" }}>
                    <FormControlLabel value="ro" control={<Radio />} label={t("profileMenu.ro")} />
                    <FormControlLabel value="en" control={<Radio />} label={t("profileMenu.en")} />
                    <Button onClick={logout}>{t("profileMenu.logout")}</Button>
                </RadioGroup>
            </Menu>

        </div>
    )
}

export default ProfileMenu