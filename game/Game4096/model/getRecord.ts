
const getHighestNumber = (Max: number[][]) => {

    let highestNum = 0

    for(let r=0; r<Max.length; r++){
        for(let c=0; c<Max[r].length; c++){
            if(Max[r][c]>highestNum){
                highestNum=Max[r][c]
            }
        }
    }
    return highestNum
}

export default getHighestNumber