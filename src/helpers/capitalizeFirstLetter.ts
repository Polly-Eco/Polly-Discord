export const capitalizeFirstLetter = (word: string) => {
    const firstLetter = word.slice(0, 1);
    const rest = word.slice(1, word.length);
    return firstLetter.toUpperCase() + rest;
};