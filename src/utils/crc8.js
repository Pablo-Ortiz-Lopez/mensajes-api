export default class CRC8 { // 'Class' for calculating CRC8 checksums

    constructor() {
        let polynomial = 0x07
        this.table = this.generateTable(polynomial)
    }

    checksum = function (text) {
        const byte_array = text.split('').map(function (x) {
            return x.charCodeAt(0)
        })

        let c = 0;

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
}
