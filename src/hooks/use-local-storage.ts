import {useEffect, useState} from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (e) {
            console.error(e);
            return initialValue;
        }
    })
    useEffect( () => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (e) {
            console.error(e);
        }
    }, [key, storedValue]);
    return [storedValue, setStoredValue] as const;
}