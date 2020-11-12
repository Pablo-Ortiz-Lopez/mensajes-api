
// "Class" for calculating CRC8 checksums...
export default class CRC8 { // constructor takes an optional polynomial type from CRC8.POLY

    constructor(poly,initial) {
        let polynomial
        polynomial = poly ? poly : this.POLY.CRC8_CCITT
        this.table = this.generateTable(polynomial)
        this.initial_value = initial
    }

    checksum = function (text) {
        const byte_array = text.split('').map(function (x) {
            return x.charCodeAt(0)
        })

        let c = this.initial_value;

        for (let i = 0; i < byte_array.length; i++)
            c = this.table[(c ^ byte_array[i]) % 256]

        return c;
    }

    generateTable = function (polynomial) {
        const csTable = []; // 256 max len byte array

        for (let i = 0; i < 256; ++i) {
            let curr = i;
            for (let j = 0; j < 8; ++j) {
                if ((curr & 0x80) !== 0) {
                    curr = ((curr << 1) ^ polynomial) % 256
                } else {
                    curr = (curr << 1) % 256
                }
            }
            csTable[i] = curr
        }

        return csTable
    }

    POLY = {
        CRC8: 0xd5,
        CRC8_CCITT: 0x07,
        CRC8_DALLAS_MAXIM: 0x31,
        CRC8_SAE_J1850: 0x1D,
        CRC_8_WCDMA: 0x9b,
    }
}
