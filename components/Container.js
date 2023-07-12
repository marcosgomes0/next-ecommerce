
import styled from "styled-components";

const GlobalContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;
export default function Container({children}) {

  return (
    <GlobalContainer>
      {children}
    </GlobalContainer>
  )
}

