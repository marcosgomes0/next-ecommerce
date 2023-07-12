import styled from "styled-components"
import Stars from "./Stars";


const Card = styled.div`
  border-top: 1px solid rgba(0,0,0, 0.1);
  padding: 10px;
  h4{
    margin-bottom: 10px;
  }
`;

const RateStyle = styled.div`
  display: flex;
  justify-content: space-between;
  span{
    font-size: 0.8rem;
    color: #aaa;
  }
`;

export default function CardComment({title, rate, createdAt, description}){

  return(
      <Card>
        <RateStyle>
          <span>{createdAt}</span>
          <Stars defaultValue={rate}/>
        </RateStyle>
        <h4>{title}</h4>
        <p>
          {description}
        </p>
      </Card>
  )
}