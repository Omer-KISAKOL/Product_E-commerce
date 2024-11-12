// Function that shortens the text according to the given length
export const trimText = (text, length) => {
    if (text){
        return text.length > length ? text.substring(0, length) + '...' : text;
    }
};