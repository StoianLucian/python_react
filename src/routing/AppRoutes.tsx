import { Route, Routes } from 'react-router-dom'
import { APP_PATHS } from './routes'
import PrivateRoute from './PrivateRoute'
import HomePage from '../pages/homePage'
import RegisterPage from '../pages/registerPage'
import LoginPage from '../pages/loginPage'

const routes = [{
    path: APP_PATHS.LOGIN,
    element: <LoginPage />,
    isPrivate: false
},
{
    path: APP_PATHS.REGISTER,
    element: <RegisterPage />,
    isPrivate: false
}
    ,
{
    path: APP_PATHS.HOME,
    element: <HomePage />,
    isPrivate: true
}]

const returnRoutes = () => {
    const appRoutes = routes.map((route) => {
        const element = route.isPrivate ? (<PrivateRoute>{route.element}</PrivateRoute>) : (route.element)

        return (<Route key={route.path} path={route.path} element={element} />)
    })

    return appRoutes
}

function AppRoutes() {
    return (
        <Routes>
            {returnRoutes()}
        </Routes>
    )
}

export default AppRoutes