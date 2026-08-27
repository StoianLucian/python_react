import { ApiMethod, request } from "./axiosConfig";
import { getUrlParams } from "./helpers";

const CALORIES_ROUTES = {
    LOOKUP: "/calories/lookup",
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
