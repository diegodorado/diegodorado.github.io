/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {useState} from "react"

const Card = ({card,style}) => {
  const [marks, setMarks] = useState([])
  
  const onCellClick = (c) => {
    if(c>0){
      if(marks.includes(c))
        setMarks(marks.filter(x => x!==c))
      else
        setMarks([...marks, c])
    }
  }

  return (
    <div className={`card ${style}` }>
      {card.map((row,i)=>{
        return (
          <div key={i} className="row">
          {row.map((c,j) => {
             return (
               <div 
                 key={j}
                 className={` cell ${marks.includes(c)? 'marked' : ''} ${(c===0)? 'free' : ''}`}
                 onClick={()=> onCellClick(c)}
                 >
                  <svg viewBox="0 0 10 10">
                    <text x="5" y="6.66">{c}</text>
                  </svg>
               </div>
             )
            }
          )}
        </div>
        )
      })}
    </div>
  )
}

export default Card
