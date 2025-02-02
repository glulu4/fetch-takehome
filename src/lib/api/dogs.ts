

import {Dog, Match, SearchDogsResponse} from "@/types/types";


export const getBreeds = async (): Promise<string[]> => {
    try {
        console.log("fetching breeds");
        console.log(process.env.NEXT_PUBLIC_BACKEND_ADDRESS);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/dogs/breeds`, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch breeds');
        }

        return response.json(); 
    } catch (error) {
        throw new Error('Failed to fetch breeds');
    }

};

export const searchDogs = async (params: {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: string;
    sort?: string;
}): Promise<SearchDogsResponse> => {
    const queryParams = new URLSearchParams();

    if (params.breeds?.length) {
        params.breeds.forEach(breed => queryParams.append('breeds', breed));
    }
    if (params.zipCodes?.length) {
        params.zipCodes.forEach(zipCode => queryParams.append('zipCodes', zipCode));
    }
    if (params.ageMin !== undefined) queryParams.append('ageMin', params.ageMin.toString());
    if (params.ageMax !== undefined) queryParams.append('ageMax', params.ageMax.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.from) queryParams.append('from', params.from);
    if (params.sort) queryParams.append('sort', params.sort);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/dogs/search?${queryParams}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Dog search failed');
    }

    return response.json();
};

export const getDogs = async (dogIds: string[]): Promise<Dog[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/dogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dogIds),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch dogs');
    }

    return response.json();
};

export const matchDog = async (dogIds: string[]): Promise<Match> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/dogs/match`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dogIds),
    });

    if (!response.ok) {
        throw new Error('Dog matching failed');
    }

    return response.json();
};
