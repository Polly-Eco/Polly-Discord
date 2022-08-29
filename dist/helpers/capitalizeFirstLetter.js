"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = void 0;
const capitalizeFirstLetter = (word) => {
    const firstLetter = word.slice(0, 1);
    const rest = word.slice(1, word.length);
    return firstLetter.toUpperCase() + rest;
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
//# sourceMappingURL=capitalizeFirstLetter.js.map