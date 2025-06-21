
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
    let mergedCells: Array<{row: number, col: number}> = []

    switch(direction) {
        case 'left':
            const leftResult = matrixOperationWithMerge(matrix, direction='P')
            resultMatrix = leftResult.matrix
            mergedCells = leftResult.mergedCells
            break
        case 'right':
            const rightResult = matrixOperationWithMerge(matrix, direction='N')
            resultMatrix = rightResult.matrix
            mergedCells = rightResult.mergedCells
            break
        case 'up':
            const upResult = matrixOperationWithMerge(swapMatrix(matrix), direction='P')
            resultMatrix = swapMatrix(upResult.matrix)
            mergedCells = upResult.mergedCells.map(cell => ({row: cell.col, col: cell.row}))
            break
        case 'down':
            const downResult = matrixOperationWithMerge(swapMatrix(matrix), direction='N')
            resultMatrix = swapMatrix(downResult.matrix)
            mergedCells = downResult.mergedCells.map(cell => ({row: cell.col, col: cell.row}))
            break
        case 'Start':
            resultMatrix = matrix
            break    
    }

    // Check if any movement occurred by comparing matrices
    const hasMovement = !matricesEqual(matrix, resultMatrix)

    Empty = getEmptyIndex(resultMatrix)

    if( Empty.length == 0) {
        return 'GameOver'
    } else{
        const randomPosi = getRandomInt(0, Empty.length)
        const enterId = Empty[randomPosi]
        resultMatrix[enterId[0]][enterId[1]] = 2
        return {
            matrix: resultMatrix,
            mergedCells: mergedCells,
            newTilePosition: {row: enterId[0], col: enterId[1]},
            hasMovement: hasMovement
        }
    }
}

export default matrixHandler

const matrixOperationWithMerge = (inputMatrix:number[][], dir:string) => {  
    let newMatrix: number[][] =[]
    let mergedCells: Array<{row: number, col: number}> = []
    
    for( let row=0; row<inputMatrix.length; row++) {
        if(dir == 'P') {
            const result = positiveMoveWithMerge(inputMatrix[row], row)
            inputMatrix[row] = result.row
            mergedCells = mergedCells.concat(result.mergedCells)
        } else if (dir == 'N') {
            const result = negativeMoveWithMerge(inputMatrix[row], row)
            inputMatrix[row] = result.row
            mergedCells = mergedCells.concat(result.mergedCells)
        }
        newMatrix.push(inputMatrix[row])
    }
    return {matrix: newMatrix, mergedCells}
}

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

const positiveMoveWithMerge = (posiMatrix:number[], rowIndex: number) => {
    posiMatrix = clearZero(posiMatrix)
    let mergedCells: Array<{row: number, col: number}> = []
    
    for( let i=0; i<posiMatrix.length; i++) {
        if(posiMatrix[i] == posiMatrix[i+1] && posiMatrix[i] !== 0){
            posiMatrix[i] = posiMatrix[i] + posiMatrix[i+1]
            posiMatrix[i+1] = 0
            mergedCells.push({row: rowIndex, col: i})
        }
    }
    posiMatrix = clearZero(posiMatrix)
    return {row: posiMatrix, mergedCells}
}

const negativeMoveWithMerge = (negaMatrix: number[], rowIndex: number) => {
    let reverMatrix = negaMatrix.reverse()
    const result = positiveMoveWithMerge(reverMatrix, rowIndex)
    negaMatrix = result.row.reverse()
    const mergedCells = result.mergedCells.map(cell => ({
        row: cell.row,
        col: negaMatrix.length - 1 - cell.col
    }))
    return {row: negaMatrix, mergedCells}
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

const matricesEqual = (matrix1: number[][], matrix2: number[][]) => {
    if (matrix1.length !== matrix2.length) return false
    for (let i = 0; i < matrix1.length; i++) {
        if (matrix1[i].length !== matrix2[i].length) return false
        for (let j = 0; j < matrix1[i].length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) return false
        }
    }
    return true
}
