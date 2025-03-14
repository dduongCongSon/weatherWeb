import {useLocalStorage} from "@/hooks/use-local-storage.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

interface FavoriteCity {
    id: string;
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    addedAt: number;
}

export function useFavorite() {
    const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>("favorites", []);
    const queryClient = useQueryClient();
    const favoritesQuery = useQuery({
        queryKey:["favorites"],
        queryFn: ()=> favorites,
        initialData: favorites,
        staleTime: Infinity,
    })
    const addToFavorites = useMutation({
        mutationFn:async (city: Omit<FavoriteCity, "id"|"addedAt">) => {
            const newFavorite: FavoriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now(),
            }
            const exists = favorites.some((fav) => fav.id === newFavorite.id);
            if(exists) return favorites;
            const newFavorites = [...favorites, newFavorite].slice(0,10);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["favorites"]});
        }
    })

    const removeFavorites = useMutation({
        mutationFn:async (cityId: string) => {
            const newFavorites = favorites.filter((city) => city.id !== cityId);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["favorites"]});
    }
    })
    return{
        favorites: favoritesQuery.data??[],
        addToFavorites,
        removeFavorites,
        isFavorite: (lat: number, lon: number) => favorites.some((city) => city.lat === lat && city.lon === lon),
    }
}