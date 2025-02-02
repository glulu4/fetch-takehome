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

/**
 * Custom hook to manage dog-related data and operations.
 *
 * @returns {Object} An object containing the following properties and functions:
 * - `dogs`: An array of `Dog` objects representing the fetched dogs.
 * - `breeds`: An array of strings representing the available dog breeds.
 * - `favorites`: An array of `Dog` objects representing the user's favorite dogs.
 * - `match`: A `Dog` object representing the matched dog, or `null` if no match is found.
 * - `loading`: A boolean indicating whether the dog data is currently being fetched.
 * - `locations`: An array of `Location` objects representing the fetched locations.
 * - `locationLoading`: A boolean indicating whether the location data is currently being fetched.
 * - `selectedZipCodes`: An array of strings representing the selected zip codes for filtering dogs.
 * - `locationSearch`: An object containing the search parameters for locations.
 * - `fetchDogs`: A function to fetch dogs based on the provided filter options.
 * - `fetchLocations`: A function to fetch locations based on the provided search parameters.
 * - `addToFavorites`: A function to add a dog to the favorites list.
 * - `findMatch`: A function to find a match from the favorites list.
 * - `setLocationSearch`: A function to update the location search parameters.
 * - `toggleZipCode`: A function to add or remove a zip code from the selected zip codes.
 * - `removeFromFavorites`: A function to remove a dog from the favorites list.
 * - `totalDogs`: A number representing the total count of fetched dogs.
 */
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
