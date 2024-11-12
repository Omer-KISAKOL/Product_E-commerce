export const getLocal = (key, defaultValue) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error("Error loading from local storage", error);
        return defaultValue;
    }
};

export const setLocal = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to local storage", error);
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
