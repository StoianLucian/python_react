import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import useGetDailySummary from '../../api/hooks/tanstack/calories/useGetDailySummary'
import { translations } from '../../../i18n'

function DailyPage() {
    const { t } = useTranslation()

    // Draft values bound to the inputs; only promoted to `filters` on Apply so
    // the query refetches on button click, not on every keystroke.
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [filters, setFilters] = useState<{ start: string; end: string }>({ start: '', end: '' })

    // Empty strings are dropped by getUrlParams, so with no dates the endpoint
    // defaults to today; providing start/end filters by that inclusive range.
    const { data, isLoading, isError } = useGetDailySummary(filters)

    const handleApply = (e: FormEvent) => {
        e.preventDefault()
        setFilters({ start, end })
    }

    return (
        <Box sx={{ maxWidth: 640, mx: 'auto', my: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4" fontWeight={800}>
                {t(translations.dailyPage.title)}
            </Typography>

            <Stack
                component="form"
                onSubmit={handleApply}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ sm: 'flex-end' }}
            >
                <TextField
                    type="date"
                    label={t(translations.dailyPage.from)}
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: end || undefined } }}
                />
                <TextField
                    type="date"
                    label={t(translations.dailyPage.to)}
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: start || undefined } }}
                />
                <Button type="submit" variant="contained" disabled={isLoading}>
                    {t(translations.dailyPage.apply)}
                </Button>
            </Stack>

            {isLoading && <CircularProgress />}
            {isError && (
                <Typography color="error">{t(translations.dailyPage.error)}</Typography>
            )}

            {data && !isLoading && !isError && (
                <>
                    <Stack direction="row" spacing={3} flexWrap="wrap">
                        <Typography><strong>{t(translations.dailyPage.caloriesConsumed)}:</strong> {data.calories_consumed}</Typography>
                        <Typography><strong>{t(translations.dailyPage.caloriesBurned)}:</strong> {data.calories_burned}</Typography>
                        <Typography><strong>{t(translations.dailyPage.foodEntries)}:</strong> {data.food_entries}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={3} flexWrap="wrap">
                        <Typography><strong>{t(translations.dailyPage.protein)}:</strong> {data.macros.protein} g</Typography>
                        <Typography><strong>{t(translations.dailyPage.carbs)}:</strong> {data.macros.carbs} g</Typography>
                        <Typography><strong>{t(translations.dailyPage.fat)}:</strong> {data.macros.fat} g</Typography>
                    </Stack>

                    <Typography variant="h6" fontWeight={700}>
                        {t(translations.dailyPage.exercises)}
                    </Typography>
                    {data.exercises.length === 0 ? (
                        <Typography color="text.secondary">{t(translations.dailyPage.noExercises)}</Typography>
                    ) : (
                        <List dense>
                            {data.exercises.map((exercise) => (
                                <ListItem key={exercise.id} disableGutters>
                                    <ListItemText
                                        primary={exercise.name ?? '—'}
                                        secondary={[
                                            exercise.repetition != null ? `${exercise.repetition} reps` : null,
                                            exercise.minutes != null ? `${exercise.minutes} min` : null,
                                            `${exercise.calories} kcal`,
                                            exercise.date,
                                        ]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </>
            )}
        </Box>
    )
}

export default DailyPage
