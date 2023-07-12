import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ProductCard from "./ProductCard";
import { RevealWrapper } from "next-reveal";
import AnimationImage from './AnimationImage';
import axios from 'axios';

const ProductList = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px 0px;
  @media (max-width: 800px){
    grid-template-columns: 1fr 1fr
  }
  @media (max-width: 450px){
    grid-template-columns: 1fr 
  }
  &>div{
    display: flex;
  }
`;

export default function ProductGrid({products}) {

  const [event, setEvent] = useState()
  const [src, setSrc] = useState('')
  const [wish, setWish] = useState([])

  useEffect(()=>{
    async function getWishes(){
      const {data} = await axios.get('/api/wished')
      if(data?.products?.length > 0){
        setWish(data.products)
      }
    }
    getWishes()
  },[])

  return (
    <ProductList>
        {products?.length > 0 && products.map((product,index)=>{
        return  (
          <RevealWrapper delay={70*index} key={product._id}>
            <ProductCard verifyWish={wish.includes(product._id) ? true : false} {...product} setEvent={setEvent} setSrc={setSrc}/>
          </RevealWrapper>
        )
        })}
      <AnimationImage src={src} event={event}/>
      </ProductList>
  )
}