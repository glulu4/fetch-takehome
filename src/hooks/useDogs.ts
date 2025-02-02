import {useState, useEffect} from "react";
import {Dog, SearchDogsResponse, Match, Location, PAGE_SIZE} from "@/types/types";
import {getBreeds, searchDogs, getDogs, matchDog} from "@/lib/api/dogs";
import {searchLocations} from "@/lib/api/locations";

export type FilterOptions = {
    breed?: string;
    zipCodes?: string[];
    sort: "asc" | "desc";
    page: number;
};

export type LocationSearchParams = {
    city?: string;
    state?: string;
};

export const useDogs = () => {
    // Dogs & Favorites
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [totalDogs, setTotalDogs] = useState<number>(0);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<Dog[]>([]);
    const [match, setMatch] = useState<Dog | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Locations
    const [locations, setLocations] = useState<Location[]>([]);
    const [locationLoading, setLocationLoading] = useState<boolean>(false);
    const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);
    const [locationSearch, setLocationSearch] = useState<LocationSearchParams>({});

    useEffect(() => {fetchBreeds();}, []);

    useEffect(() => {fetchDogs({breed: "", zipCodes: selectedZipCodes, sort: "asc", page: 1});}, [selectedZipCodes]);

    useEffect(() => {
        if (locationSearch.city || locationSearch.state) {
            const timeout = setTimeout(() => fetchLocations(locationSearch), 300);
            return () => clearTimeout(timeout);
        }
    }, [locationSearch]);

    const fetchBreeds = async (): Promise<void> => {
        try {setBreeds(await getBreeds());}
        catch {console.error("Failed to fetch breeds");}
    };

    const fetchDogs = async (filters: FilterOptions): Promise<void> => {
        setLoading(true);
        try {
            const params = {
                breeds: filters.breed ? [filters.breed] : undefined,
                zipCodes: filters.zipCodes,
                size: PAGE_SIZE,
                from: ((filters.page - 1) * PAGE_SIZE).toString(),
                sort: `breed:${filters.sort}`
            };
            const response: SearchDogsResponse = await searchDogs(params);
            setDogs(await getDogs(response.resultIds));
            setTotalDogs(response.total);
        } catch {
            console.error("Failed to fetch dogs");
        }
        setLoading(false);
    };

    const fetchLocations = async (params: LocationSearchParams): Promise<void> => {
        if (!params.city && !params.state) return;
        setLocationLoading(true);
        try {
            const response = await searchLocations({city: params.city, states: params.state ? [params.state] : undefined, size: 25});
            setLocations(response.results);
        } catch {
            console.error("Failed to fetch locations");
        }
        setLocationLoading(false);
    };

    /**
     * Adds a dog to the favorites list if it is not already included.
     *
     * @param dog - The dog object to be added to the favorites list.
     * @returns void
     */
    const addToFavorites = (dog: Dog): void => {
        setFavorites(prev => !prev.includes(dog) ? [...prev, dog] : prev)
    };

    const findMatch = async (): Promise<void> => {
        if (!favorites.length) return;
        try {
            const matchResponse: Match = await matchDog(favorites.map(dog => dog.id));
            const matchedDog = await getDogs([matchResponse.match]);
            setMatch(matchedDog[0]);
        } catch {
            console.error("Failed to generate match");
        }
    };

    const toggleZipCode = (zip: string): void => {
        setSelectedZipCodes(prev => prev.includes(zip) ? prev.filter(z => z !== zip) : [...prev, zip]);
    };

    const removeFromFavorites = (dog: Dog): void => {
        setFavorites(prev => prev.filter(d => d.id !== dog.id));
    }

    return {
        dogs, breeds, favorites, match, loading,
        locations, locationLoading, selectedZipCodes, locationSearch,
        fetchDogs, fetchLocations, addToFavorites, findMatch, setLocationSearch, toggleZipCode,
        removeFromFavorites,
        totalDogs
    };
};
