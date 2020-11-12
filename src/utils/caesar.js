
// "Class" for calculating CRC8 checksums...
export default class Caesar { // constructor takes an optional polynomial type from CRC8.POLY

    constructor() {
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    }

    cypher = function (text, factor) {
        let out = ''
        for(let i = 0; i< text.length; i++){
            const len = this.alphabet.length
            const upperCase = text[i] !== text[i].toLowerCase()
            const index = this.alphabet.findIndex(letter => letter === text[i].toLowerCase())
            const shiftIndex = (len + ((index + factor) % len)) % len
            const shifted = this.alphabet[shiftIndex]
            out += index >= 0 ? (upperCase ? shifted.toUpperCase() : shifted) : text[i]
        }
        return out;
    }
}
