import { Box, Stack } from "@mui/material"
import { APP_PATHS } from "../routing/routes";
import Icon, { IconsEnum } from "../components/Icons/Icon";

const gradients = [
    "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)",
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
];

const getRandomGradient = () => {

    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
}

const items = [{
    title: "Profile",
    routes: APP_PATHS.PROFILE,
    icon: IconsEnum.HOME
}, {
    title: "Profile",
    routes: APP_PATHS.PROFILE,
    icon: IconsEnum.PROFILE
},
{
    title: "Profile",
    routes: APP_PATHS.PROFILE,
    icon: IconsEnum.HOME
}]

const newItems = items.map(item => ({ ...item, gradient: getRandomGradient() }))

function Dashboard() {
    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: "100vh",
                backgroundImage: 'url("/src/assets/images/background.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
                gap: 4,
            }}
        >

            {newItems.map((item, index) => (
                <>
                    <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center", mb: 4 }} key={index}>
                        <Box
                            sx={{
                                background: item.gradient,
                                height: 200,
                                width: 300,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 2,
                            }}
                        >
                            <Icon size={120} iconName={IconsEnum.HOME} />
                        </Box>
                        <div>{item.title}</div>
                        <div></div>
                    </Stack>
                </>
            ))}
        </Box >
    )
}

export default Dashboard