import { ApiMethod, request } from "./axiosConfig";
import { getUrlParams } from "./helpers";

const CALORIES_ROUTES = {
    LOOKUP: "/calories/lookup",
    DAILY: "/calories/daily",
}

export type ProductLookup = {
    found: boolean
    name: string
    source?: string | null
    category?: string | null
    calories_per_100g?: number | null
    protein_per_100g?: number | null
    carbs_per_100g?: number | null
    fat_per_100g?: number | null
}

export async function lookupFood(name: string): Promise<ProductLookup> {
    const url = getUrlParams({ name }, CALORIES_ROUTES.LOOKUP)

    return await request({ method: ApiMethod.GET, url })
}

export type ExerciseSummary = {
    id: number
    name: string | null
    date: string
    repetition: number | null
    minutes: number | null
    calories: number
}

export type FoodSummary = {
    id: number
    name: string | null
    date: string
    grams: number
    calories: number
    protein: number
    carbs: number
    fat: number
}

export type DailySummary = {
    start: string
    end: string
    calories_consumed: number
    calories_burned: number
    macros: {
        protein: number
        carbs: number
        fat: number
    }
    food_entries: number
    foods: FoodSummary[]
    exercises: ExerciseSummary[]
}

// Filters (all inclusive, YYYY-MM-DD). Omit everything for today, pass `day`
// for a single day, or `start`/`end` for a range (either bound optional).
export type DailySummaryFilters = {
    day?: string
    start?: string
    end?: string
}

export async function getDailySummary(
    filters: DailySummaryFilters = {}
): Promise<DailySummary> {
    const url = getUrlParams({ ...filters }, CALORIES_ROUTES.DAILY)

    return await request({ method: ApiMethod.GET, url })
}
