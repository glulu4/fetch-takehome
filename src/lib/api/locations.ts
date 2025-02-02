import {LocationSearchParams, LocationSearchResponse} from "@/types/types";

export const getLocations = async (zipCodes: string[]): Promise<Location[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/locations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(zipCodes),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch locations');
    }

    return response.json();
};

export const searchLocations = async (params: LocationSearchParams): Promise<LocationSearchResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/locations/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error('Location search failed');
    }

    return response.json();
};