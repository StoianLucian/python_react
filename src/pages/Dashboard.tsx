import { Box, Stack } from "@mui/material"
import { APP_PATHS } from "../routing/routes";
import Icon, { IconsEnum } from "../components/Icons/Icon";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const gradients = [
    "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)",
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
];

const getRandomGradient = () => {
    // Pick a random index
    const index = Math.floor(Math.random() * gradients.length);

    // Remove the element from the array and get it
    const [removed] = gradients.splice(index, 1);


    console.log(gradients)


    console.log(removed)

    return removed;
}

const items = [{
    title: "settings",
    route: APP_PATHS.PROFILE,
    icon: IconsEnum.COG
}, {
    title: "profile",
    route: APP_PATHS.PROFILE,
    icon: IconsEnum.PROFILE
},
{
    title: "home",
    route: APP_PATHS.PROFILE,
    icon: IconsEnum.HOME
},
{
    title: "PDF",
    route: APP_PATHS.FILES,
    icon: IconsEnum.PDF
},
]

const newItems = items.map(item => ({ ...item, gradient: getRandomGradient() }))

function Dashboard() {
    const { t } = useTranslation()
    return (
        <Box
            className="w-screen min-h-screen flex flex-wrap justify-center content-center gap-4  "
            sx={{
                backgroundImage: 'url("/src/assets/images/background.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {newItems.map((item) => (
                <Link key={item.title} to={item.route}>
                    <Stack className="justify-center items-center" direction="column" spacing={2} >
                        <Box
                            className="flex items-center justify-center h-50 w-75 rounded-lg"
                            sx={{ background: item.gradient }}
                        >
                            <Icon size={120} iconName={item.icon} />
                        </Box>
                        <div> {t(`dashboard.${item.title}`)}</div>
                    </Stack>
                </Link>
            ))}
        </Box >
    )
}

export default Dashboard