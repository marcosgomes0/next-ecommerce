import styled from "styled-components"

const BarStyle = styled.svg`
  width: 35px;
  height: 35px;
  color: white;
  display: none;
  cursor: pointer;
  @media (max-width: 780px){
    display: block;
  }
  
`;

export default function BarIcon({handleMenu}) {
  return (
    <>
         <BarStyle onClick={()=>{handleMenu((m)=>{
        return !m
       })}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </BarStyle>
    </>
  )
}
