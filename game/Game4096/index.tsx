import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import Cell from '../../comps/Cell'
import Arrow from '../../comps/Arrow'
import matrixHandler from './model/matrixHandler'

const initMatrix: number[][] = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

const Game4096: NextPage = () => {

  const [gameMatrix, setGameMatrix] = useState(initMatrix)
  const [gameOver, setGameOver] = useState(false)
  const [notice, setNotice] = useState(true)
  const [score, setScore] = useState(0)

  useEffect(()=> {
      setGameMatrix(initMatrix)
  }, [gameOver])

  const startGame = () => {
      if(gameOver) {
        setGameOver(false)
      }
      setNotice(true)
      setGameMatrix(initMatrix)
  }

  const leftHandler = () => {
      if(notice){
        setNotice(false)
      }
      let direction = 'Left'
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      if(res != 'GameOver'){
        setGameMatrix(res)
      } else {
        setGameOver(true)
      }
  }

  const rightHandler = () => {
      if(notice){
        setNotice(false)
      }
      let direction = 'Right'
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      if(res != 'GameOver'){
        setGameMatrix(res)
      } else {
        setGameOver(true)
      }
  }

  const upHandler = () => {
      if(notice){
        setNotice(false)
      }
      let direction = 'Up'
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      if(res != 'GameOver'){
        setGameMatrix(res)
      } else {
        setGameOver(true)
      }
  }

  const downHandler = () => {
      if(notice){
        setNotice(false)
      }
      let direction = 'Down'
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      if(res != 'GameOver'){
        setGameMatrix(res)
      } else {
        setGameOver(true)
      }
  }

  return (
    <div className='container'>

      <div className='navbar'>
        <div className='title'>Game 4096</div>
        {gameOver?
            <Arrow text='Start' handler={startGame}/>
            :
            // <div>Score: {score}</div>
            null
        }
      </div>
      
      { gameOver? 
        <div className='game-over'>Game Over</div> 
        : 
        <div className='game-board'>


            { gameMatrix.map((row, r)=>(
                <div key={r} className='row'>
                    {
                      row.map((num, i) => (
                        <div key={i}>
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
              <Arrow text='&#11013;' handler={leftHandler}/>
          </div>
          <div>
              <Arrow text = '&#11014;' handler={upHandler}/>
              <div style={{width: 70, height: 50}}></div>
              <Arrow text = '&#11015;' handler={downHandler}/>
          </div>
          <div>
              <Arrow text = '&#10145;' handler={rightHandler}/>

          </div>
      </div>

    </div>
  )
}

export default Game4096
