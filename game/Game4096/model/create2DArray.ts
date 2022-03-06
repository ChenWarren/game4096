
const create2DArray = (len: number, value: number) => {
    const arr = new Array(len)
    for( let i=0; i<len; i++){
        arr.fill(new Array(len).fill(value))
    }
    return arr
}

export default create2DArray