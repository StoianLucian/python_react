import { useTranslation } from 'react-i18next'
import { Box, Paper, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine'
import dayjs from 'dayjs'
import { type DailySummary as DailySummaryData } from '../../../api/caloriesApi'
import { translations } from '../../../../i18n'
import { BURNED_COLOR, CONSUMED_COLOR } from './palette'

type DailyChartProps = {
    data: DailySummaryData
    activeDate: string | null
    onSelectDate: (date: string) => void
}

export default function DailyChart({ data, activeDate, onSelectDate }: DailyChartProps) {
    const { t } = useTranslation()

    // The x-axis is keyed by the row date, so a click hands us the date directly
    // via `axisValue`; `valueFormatter` handles the display label.
    const dates = data.rows.map((row) => row.date)
    const consumed = data.rows.map((row) => row.calories_consumed)
    const burned = data.rows.map((row) => row.calories_burned)

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="caption" color="text.secondary">
                {activeDate
                    ? t(translations.dailyPage.showing, { date: dayjs(activeDate).format('MMM D, YYYY') })
                    : t(translations.dailyPage.selectDay)}
            </Typography>
            {/* No fixed width: BarChart fills the parent responsively and shrinks
                with it at every breakpoint. minWidth:0 lets the flex parent
                actually shrink below the chart's intrinsic size. */}
            <Box sx={{ width: '100%', minWidth: 0 }}>
                <BarChart
                    height={320}
                    onAxisClick={(_event, axis) => {
                        if (axis?.axisValue != null) onSelectDate(String(axis.axisValue))
                    }}
                    xAxis={[
                        {
                            data: dates,
                            scaleType: 'band',
                            valueFormatter: (date: string) => dayjs(date).format('MMM D'),
                            tickLabelStyle: { angle: -45, textAnchor: 'end' },
                        },
                    ]}
                    margin={{ bottom: 40 }}
                    series={[
                        { data: consumed, label: t(translations.dailyPage.caloriesConsumed), color: CONSUMED_COLOR },
                        { data: burned, label: t(translations.dailyPage.caloriesBurned), color: BURNED_COLOR },
                    ]}
                    sx={{ cursor: 'pointer' }}
                >
                    {activeDate && (
                        <ChartsReferenceLine
                            x={activeDate}
                            lineStyle={{ stroke: '#111', strokeDasharray: '4 4', strokeOpacity: 0.35 }}
                        />
                    )}
                </BarChart>
            </Box>
        </Paper>
    )
}
