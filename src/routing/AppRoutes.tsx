import { Navigate, Route, Routes } from 'react-router-dom'
import { APP_PATHS } from './routes'
import PrivateRoute from './PrivateRoute'
import { useAuthContext } from '../authContext/AuthContext'
import Dashboard from '../pages/Dashboard'
import LoginPage from '../pages/login/LoginPage'
import RegisterPage from '../pages/register/RegisterPage'
import ChatPage from '../pages/chat/ChatPage'
import BotPage from '../pages/bot/BotPage'

const routes = [
    { path: APP_PATHS.LOGIN, element: <LoginPage />, isPrivate: false },
    { path: APP_PATHS.REGISTER, element: <RegisterPage />, isPrivate: false },
    { path: APP_PATHS.HOME, element: <Dashboard />, isPrivate: true },
    { path: `${APP_PATHS.CHAT}/:id`, element: <ChatPage />, isPrivate: true },
    { path: APP_PATHS.BOT, element: <BotPage />, isPrivate: true },
    { path: "*", element: <>Page not found</>, isPrivate: false },
];

const returnRoutes = () => {
    const { isAuthenticated, loading } = useAuthContext()

    if (loading) {
        return [<Route key="loading" path="*" element={<>Loading...</>} />]
    }

    return routes.map((route) => {
        if (isAuthenticated && (route.path === APP_PATHS.LOGIN || route.path === APP_PATHS.REGISTER)) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<Navigate to={APP_PATHS.HOME} replace />}
                />
            )
        }

        const element = route.isPrivate ? <PrivateRoute>{route.element}</PrivateRoute> : route.element

        return <Route key={route.path} path={route.path} element={element} />
    })
}

function AppRoutes() {
    return (
        <Routes>
            {returnRoutes()}
        </Routes>
    )
}

export default AppRoutes