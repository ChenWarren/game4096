import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import Cell from '../../comps/Cell'
import Arrow from '../../comps/Arrow'
import matrixHandler from './model/matrixHandler'
import getHighestNumber from './model/getRecord'
import create2DArray from './model/create2DArray'

const initMatrix: number[][] = create2DArray(3, 0)

const Game4096: NextPage = () => {

  const [gameMatrix, setGameMatrix] = useState(initMatrix)
  const [arrowHited, setArrowHited] = useState(false)
  const [win, setWin] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [notice, setNotice] = useState(true)
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)

  useEffect(()=> {
      setGameMatrix(initMatrix)
  }, [gameOver])

  const startGame = () => {
      if(gameOver) {
        setGameOver(false)
      }
      if(win) {
        setWin(false)
      }
      setNotice(true)
      setGameMatrix(initMatrix)
      setRecord(0)
  }

  const checkGameStatus = (result:any) => {
    if(result != 'GameOver'){
      setGameMatrix(result)
      let maxNumber = getHighestNumber(result)
      setRecord(maxNumber)
      if(maxNumber==4096){
          setWin(true)
      }
    } else {
      setGameOver(true)
    }
  }

  const leftHandler = () => {
      if(notice){
        setNotice(false)
      }
      let direction = 'left'
      setArrowHited(!arrowHited)
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      checkGameStatus(res)
  }

  const rightHandler = () => {
      if(notice){
        setNotice(false)
      }
      let direction = 'right'
      setArrowHited(!arrowHited)
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      checkGameStatus(res)
  }

  const upHandler = () => {
      if(notice){
        setNotice(false)
      }
      let direction = 'up'
      setArrowHited(!arrowHited)
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      checkGameStatus(res)
  }

  const downHandler = () => {
      if(notice){
        setNotice(false)
      }
      let direction = 'down'
      setArrowHited(!arrowHited)
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      checkGameStatus(res)
  }

  
  return (
    <div className='container'>

      <div className='navbar'>
        <div className='title'>4096</div>
        {gameOver || win?
            <Arrow text='&#x21BB;' handler={startGame}/>
            :
            null
        }
      </div>
      { gameOver? 
        <div className='game-over'>Game Over</div>
        :
        win? 
          <div className='game-over'>
            <div>You win!</div>
            <div className='win-font'>Record: {record}</div>
          </div> 
          : 
          <div className='game-board'>


              { gameMatrix.map((row, r)=>(
                  <div key={r} className='row'>
                      {
                        row.map((num, i) => (
                          <div 
                            key={i}
                            className='cell-box' 
                            >
                            <Cell cellNum={num} bgColor={`cell bg-${num.toString()}`}/>
                          </div>
                        ))
                        
                      }
                  </div>
              ))
              }
          </div>
        
      }


      <div className='notice'>
          { notice?
            <p>Click any arrow to start the game.</p>
            :
            null
          }
      </div>

      <div className='button-wrapper'>

          <div>
              <Arrow text='&#x2190;' handler={leftHandler}/>
          </div>
          <div>
              <Arrow text = '&#x2191;' handler={upHandler}/>
              <div style={{width: 70, height: 50}}></div>
              <Arrow text = '&#x2193;' handler={downHandler}/>
          </div>
          <div>
              <Arrow text = '&#x2192;' handler={rightHandler}/>

          </div>
      </div>

    </div>
  )
}

export default Game4096
