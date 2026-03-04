import { Route, Routes } from 'react-router-dom'
import { APP_PATHS } from './routes'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import { useAuthContext } from '../authContext/AuthContext'
import Dashboard from '../pages/Dashboard'
import FilesPage from '../pages/FilesPage'

const routes = [
    { path: APP_PATHS.LOGIN, element: <LoginPage />, isPrivate: false },
    { path: APP_PATHS.REGISTER, element: <RegisterPage />, isPrivate: false },
    { path: APP_PATHS.HOME, element: <Dashboard />, isPrivate: true },
    { path: APP_PATHS.FILES, element: <FilesPage />, isPrivate: true },
    { path: "*", element: <>Page not found</>, isPrivate: false },
];

const returnRoutes = () => {



    const { isAuthenticated, loading } = useAuthContext()

    if (!loading) {
        const appRoutes = routes.map((route) => {
            const element = route.isPrivate ? (<PrivateRoute>{route.element}</PrivateRoute>) : (route.element)
            if (route.path === APP_PATHS.LOGIN && isAuthenticated) {
                return
            }

            return (<Route key={route.path} path={route.path} element={element} />)
        })
        return appRoutes
    } else {
        return [<Route key="loading" path="*" element={<>Loading...</>} />]
    }
}

function AppRoutes() {
    return (
        <Routes>
            {returnRoutes()}
        </Routes>
    )
}

export default AppRoutes