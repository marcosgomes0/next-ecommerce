import { useEffect, useRef, useState } from "react"
import styled from "styled-components";


const ImageAnime = styled.div`
  color: red;
  position: absolute;
  z-index: 200;
  opacity: 0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  ${props=> props.animation && 'animation: cartAnimation .5s'};
  @keyframes cartAnimation {
    0%{
      opacity: 1;
      height: 100px;
    } 100%{
      top: 5%;
      opacity: 0;
      height: 50px;
    }
  }
  img{
    max-height: 100%;
  }
`;

export default function AnimationImage({src: defaultImage, event: defaultEvent}) {

  const imageRef = useRef()
  const [animation, setAnimation] = useState(false)

useEffect(()=>{
    if (defaultEvent){
    const y = defaultEvent.pageY - 120
    const x = defaultEvent.pageX - 50
    imageRef.current.style.top = y + "px"
    imageRef.current.style.left = x + "px"
    imageRef.current.style.display = "block"
    setAnimation(true)
    setTimeout(()=>{
      setAnimation(false)
      imageRef.current.style.display = "none"
    },500)
    }

}, [defaultEvent])
  
  return (
      <ImageAnime animation={animation} ref={imageRef}>
        {defaultImage && <img src={defaultImage} alt={defaultImage}/>}
      </ImageAnime>
  )
}
