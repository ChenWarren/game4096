
const matrixHandler = ({
    matrix,
    direction,
    score,
    setScore,
}: { 
    matrix: number[][], 
    direction: string,
    score: number,
    setScore: Function
}) => {

    let resultMatrix: number[][] = []
    let processMatrix: number[][] = []
    let Empty: number[][] =[]

    switch(direction) {
        case 'Left':
            resultMatrix = matrixOperation(matrix, direction='P')
            break
        case 'Right':
            resultMatrix = matrixOperation(matrix, direction='N')
            break
        case 'Up':
            processMatrix = matrixOperation(swapMatrix(matrix), direction='P')
            resultMatrix = swapMatrix(processMatrix)
            break
        case 'Down':
            processMatrix = matrixOperation(swapMatrix(matrix), direction='N')
            resultMatrix = swapMatrix(processMatrix)
            break
        case 'Start':
            resultMatrix = matrix
            break    
    }

    Empty = getEmptyIndex(resultMatrix)

    if( Empty.length == 0) {
        return 'GameOver'
    } else{
 
        const randomPosi = getRandomInt(0, Empty.length)
        const enterId = Empty[randomPosi]
        resultMatrix[enterId[0]][enterId[1]] = 2

        return resultMatrix

    }

}

export default matrixHandler

const matrixOperation = (inputMatrix:number[][], dir:string) => {
    
    let newMatrix: number[][] =[]

    for( let row=0; row<inputMatrix.length; row++) {
        if(dir == 'P') {
            inputMatrix[row] = positiveMove(inputMatrix[row])
        } else if (dir == 'N') {
            inputMatrix[row] = negativeMove(inputMatrix[row])
        }
        newMatrix.push(inputMatrix[row])
    }

    return newMatrix
}

const positiveMove = (posiMatrix:number[]) => {
    posiMatrix = clearZero(posiMatrix)

    for( let i=0; i<posiMatrix.length; i++) {
        if(posiMatrix[i] == posiMatrix[i+1]){
            posiMatrix[i] = posiMatrix[i] + posiMatrix[i+1]
            posiMatrix[i+1] =0
        }
    }

    posiMatrix = clearZero(posiMatrix)

    return posiMatrix
}

const negativeMove = (negaMatrix: number[]) => {
    let reverMatrix = negaMatrix.reverse()
    reverMatrix = positiveMove(reverMatrix)
    negaMatrix = reverMatrix.reverse()
    return negaMatrix
}

const clearZero =(clearMatrix:number[])=> {

    let resultM: number[]=[]

    for( let i=0; i<clearMatrix.length; i++) {
        if(clearMatrix[i] != 0) {
            resultM.push(clearMatrix[i])
        }
    }
    while( resultM.length < clearMatrix.length) {
        resultM.push(0)
    }
    return resultM
}

const swapMatrix = (swapMatrix:number[][]) => {
    let resMatrix: number[][] = [[],[],[],[],[],[],[]]

    for( let r=0; r<swapMatrix.length; r++){
        for( let c=0; c<swapMatrix[r].length; c++) {
            resMatrix[c].push(swapMatrix[r][c])
        }
    }
    return resMatrix
}

const getEmptyIndex = (scanMatrix: number[][]) => {

    let allList: number[][] = []

    for( let i=0; i<scanMatrix.length; i++){
        for ( let j=0; j<scanMatrix[i].length; j++) {
            if( scanMatrix[i][j] == 0) {
                allList.push([i, j])
            }
        }
    }

    return allList
}

const getRandomInt = (min:number, max:number) => {
    return Math.floor(Math.random()*(max-min)) + min
}
