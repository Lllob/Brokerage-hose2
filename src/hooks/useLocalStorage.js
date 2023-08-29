import { useState } from 'react';
                              //('user', {} )
export const useLocalStorage = (key, defaultValue) => { 
    
    const [value, setData] = useState(() => {
        const storageData = localStorage.getItem(key);
        return storageData ? JSON.parse(storageData) : defaultValue;
    });   
    
    const setLocalStorageValue = (storageData) => { 
        localStorage.setItem(key, JSON.stringify(storageData));
        setData(storageData);
    };

    return [
        value,
        setLocalStorageValue,
    ];
}
