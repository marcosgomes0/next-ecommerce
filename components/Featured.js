import styled from "styled-components";
import Container from "@/components/Container";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { RevealWrapper } from "next-reveal";
import AnimationImage from "./AnimationImage";

const GridCollumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0px 0px 30px 0px;
  & > div:nth-child(2){
    align-self: center;
  }
  @media (max-width: 600px){
    grid-template-columns: 1fr;
    gap: 10px;
    & > div:nth-child(2){
      order: -1;
    }
  }
`;

const Collumn = styled.div`
  padding: 40px 20px;
  color: white;
  @media (max-width: 600px){
    padding: 10px 20px;
  }
`;

const Intro = styled.div`
  background-color: #222;
`;

const ImgCollumn = styled.div`
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px){
    padding: 10px 20px;
    img{
      max-width: 250px;
    }
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 12px;
`;

const Description = styled.p`
  color: #aaa;
  margin-bottom: 20px;
`;

const LinkFeatured = styled(Link)`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  color: white;
  border: 1px solid white;
`;

const ButtonFeatured = styled.button`
  padding: 9px;
  font-size: 1rem;
  border-radius: 5px;
  color: white;
  background-color: #5542f6;
  outline: none;
  border: none;
  display: inline-block;
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  svg {
    height: 1.4rem;
    width: 1.4rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function Featured(product) {

  const { addToCart } = useContext(CartContext)
  const [event, setEvent] = useState()

  return ( <>
    { product && <Intro>
        <Container>
          <GridCollumn>
            <RevealWrapper delay={100} origin="left">
            <Collumn>
              <Title>{product.title}</Title>
              <Description>{product.description}</Description>
              <ButtonContainer>
                <LinkFeatured href={`product/${product._id}`}>Read more</LinkFeatured>
                <ButtonFeatured onClick={(e)=> {
                  addToCart(product._id)
                  setEvent(e)
                  }}>add to Cart 
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
               </ButtonFeatured>
              </ButtonContainer>
            </Collumn>
            </RevealWrapper>
            <RevealWrapper delay={150} origin="top">
            <ImgCollumn>
              <img src={product?.images[1]} alt={product.images[1]}/>
            </ImgCollumn>
            </RevealWrapper>
          </GridCollumn>
        </Container>
        <AnimationImage event={event} src={product?.images[1]}/>
      </Intro>}
      </>
  )
}

 