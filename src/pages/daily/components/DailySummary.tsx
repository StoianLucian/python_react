import { useTranslation } from 'react-i18next'
import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import dayjs from 'dayjs'
import { type FoodSummary, type ExerciseSummary } from '../../../api/caloriesApi'
import { translations } from '../../../../i18n'

type DailySummaryProps = {
    foods: FoodSummary[]
    exercises: ExerciseSummary[]
}

type EntryRowProps = {
    icon: React.ReactNode
    primary: string
    secondary: string
    value: string
}

function EntryRow({ icon, primary, secondary, value }: EntryRowProps) {
    return (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 1 }}>
            <Avatar sx={{ bgcolor: 'action.hover', color: 'text.secondary' }}>{icon}</Avatar>
            <Stack sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={600} noWrap>
                    {primary}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {secondary}
                </Typography>
            </Stack>
            <Typography fontWeight={700} whiteSpace="nowrap">
                {value}
            </Typography>
            <ChevronRightRoundedIcon color="disabled" />
        </Stack>
    )
}

export default function DailySummary({ foods, exercises }: DailySummaryProps) {
    const { t } = useTranslation()

    return (
        <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <RestaurantRoundedIcon color="action" />
                    <Typography variant="h6" fontWeight={700}>
                        {t(translations.dailyPage.foodEntries)}
                    </Typography>
                </Stack>
                {foods.length === 0 ? (
                    <Typography color="text.secondary">—</Typography>
                ) : (
                    <Stack divider={<Divider flexItem />}>
                        {foods.map((food) => (
                            <EntryRow
                                key={food.id}
                                icon={<RestaurantRoundedIcon fontSize="small" />}
                                primary={`${food.name ?? '—'} · ${food.grams} g`}
                                secondary={[
                                    `${t(translations.dailyPage.protein)} ${food.protein} g`,
                                    `${t(translations.dailyPage.carbs)} ${food.carbs} g`,
                                    `${t(translations.dailyPage.fat)} ${food.fat} g`,
                                ].join(' · ')}
                                value={`${food.calories} kcal`}
                            />
                        ))}
                    </Stack>
                )}
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <FitnessCenterRoundedIcon color="action" />
                    <Typography variant="h6" fontWeight={700}>
                        {t(translations.dailyPage.exercises)}
                    </Typography>
                </Stack>
                {exercises.length === 0 ? (
                    <Typography color="text.secondary">{t(translations.dailyPage.noExercises)}</Typography>
                ) : (
                    <Stack divider={<Divider flexItem />}>
                        {exercises.map((exercise) => (
                            <EntryRow
                                key={exercise.id}
                                icon={<FitnessCenterRoundedIcon fontSize="small" />}
                                primary={exercise.name ?? '—'}
                                secondary={[
                                    exercise.repetition != null ? `${exercise.repetition} reps` : null,
                                    exercise.minutes != null ? `${exercise.minutes} min` : null,
                                    dayjs(exercise.date).format('MMM D'),
                                ]
                                    .filter(Boolean)
                                    .join(' · ')}
                                value={`${exercise.calories} kcal`}
                            />
                        ))}
                    </Stack>
                )}
            </Paper>
        </Stack>
    )
}
