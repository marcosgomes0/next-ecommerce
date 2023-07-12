import styled from "styled-components"


const ContentTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 25px;
`;

export default function Title({children}){
  return(
    <ContentTitle>
      {children}
    </ContentTitle>
  )
}