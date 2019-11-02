
export const encodeSysEx = (inData) =>{
    let outLength  = 0
    let count      = 0
    const outSysEx = []
    let outSysExIndex = 0

    for (let i = 0; i < inData.length; i++) {

        const data = inData[i]
        const msb  = data >> 7
        const body = data & 0x7f

        outSysEx[outSysExIndex] |= (msb << (6 - count))
        outSysEx[outSysExIndex + 1 + count] = body

        if (count++ === 6) {
            outSysExIndex  += 8
            outLength  += 8
            outSysEx[outSysExIndex] = 0
            count       = 0
        }
    }

    //return outLength + count + (count != 0 ? 1 : 0);
    return outSysEx
}


export const decodeSysEx = (inSysEx) =>{
    const outData = []
    let msbStorage = 0
    let byteIndex  = 0

    for (let i = 0; i < inSysEx.length; i++)
    {
        if ((i % 8) === 0)
        {
            msbStorage = inSysEx[i]
            byteIndex  = 6
        }
        else
        {
            const body = inSysEx[i]
            const msb  = ((msbStorage >> byteIndex--) & 1) << 7
            outData.push( msb | body)
        }
    }
    return outData
}
