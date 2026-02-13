import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { APP_PATHS } from './routes';
import { useAuthContext } from '../authContext/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {

    const { isAuthenticated } = useAuthContext();

    return (
        isAuthenticated ? children : <Navigate to={APP_PATHS.LOGIN} replace />
    )
}

export default PrivateRoute