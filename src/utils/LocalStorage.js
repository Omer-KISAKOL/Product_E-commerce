export const getLocal = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue;
};

export const setLocal = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocal = (key) => {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from local storage:", error);
    }
};

export const clearLocal = () => {
    try {
        window.localStorage.clear();
    } catch (error) {
        console.error("Error clearing local storage:", error);
    }
};
