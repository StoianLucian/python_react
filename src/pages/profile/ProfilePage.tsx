import { Box } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import DailyPage from '../daily/DailyPage'

// Profile is a sidebar-driven layout; DailyPage is its default content pane.
// The sidebar lives here (not in App) so it only shows inside the profile area.
function ProfilePage() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
                <DailyPage />
            </Box>
        </Box>
    )
}

export default ProfilePage
