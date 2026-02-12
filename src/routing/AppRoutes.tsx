import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { APP_PATHS } from './routes'
import LoginPage from '../pages/loginPage'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={APP_PATHS.LOGIN} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes