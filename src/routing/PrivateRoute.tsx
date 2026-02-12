import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { APP_PATHS } from './routes';

function PrivateRoute({ children }: { children: React.ReactNode }) {

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        isAuthenticated ? children : <Navigate to={APP_PATHS.LOGIN} replace />
    )
}

export default PrivateRoute