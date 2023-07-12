import styled from "styled-components";
import StarBorderIcon from "./icons/StarBorderIcon";
import { useState } from "react";
import StarFillIcon from "./icons/StarFillIcon";


const StarsStyle = styled.div`
  display: flex;
  align-items: center;
`;

const StarsNumber = [1,2,3,4,5]

export default function Stars({reviewValue, defaultValue}){

  const [starsActive, setStarsActive] = useState(defaultValue || 1)

  function handleValue(value){
   if (defaultValue) {
    return
   } else{
    setStarsActive(value)
    reviewValue(value)
   }
  }

  return(
     <StarsStyle>
      {StarsNumber.map(s=>{
        return(
       <div key={s}>
        {starsActive  >= s ? <StarFillIcon notActive={defaultValue} key={s} starValue={s}  handleValue={handleValue} /> : <StarBorderIcon notActive={defaultValue} key={s} starValue={s} handleValue={handleValue}/>}
      </div>
       )
      })}
    </StarsStyle>
  )
}