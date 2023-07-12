import AnimationImage from "@/components/AnimationImage";
import Container from "@/components/Container";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Wished from "@/models/WishedProduct";
import { RevealWrapper } from "next-reveal";
import Link from "next/link";
import { useRef, useState } from "react";
import styled from "styled-components";

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0px;
  @media (max-width: 650px){
    justify-content: center;
  }
`;

const ShowMore = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  background-color: #ccc;
  padding: 10px;
  width: 150px;
  border-radius: 5px;
  font-weight: bold;
`;

const ImageAnime = styled.div`
  color: red;
  position: absolute;
  z-index: 200;
  opacity: 0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props=> props.animation && 'animation: cartAnimation 0.3s'};
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

export default function CategoriesPage({categories: defaultCategories, categoriesProduct, productsWisheds}) {

  const [categories, setCategories] = useState(defaultCategories || {})
  const [event, setEvent] = useState()
  const [src, setSrc] = useState('')
  const [wish, setWish] = useState(productsWisheds?.[0]?.products || [])

  return (
    <>
      <Header/>
      <Container>
        {categories?.length > 0 && categories.map((c, index)=>{
         return(
          <RevealWrapper delay={80*index} origin="left" key={c.name}>
            <Title>
              {c.name}
            </Title>
            <ProductList>
            {categoriesProduct?.[c._id]?.length > 0 && categoriesProduct[c._id].map((p)=>{
             return (<ProductCard noExpand={true} verifyWish={wish.includes(p._id) ? true : false} key={p._id} {...p} setEvent={setEvent} setSrc={setSrc}/>)
            })}
            <ShowMore href={`/category/${c._id}`}>
              Show more...
            </ShowMore>
            </ProductList>
          </RevealWrapper>
        )})}
        <AnimationImage event={event} src={src}/>
      </Container>
    </>
  )
}

export async function getServerSideProps(){

  await mongooseConnect()
  const categories = await Category.find()
  const productsWisheds = await Wished.find()

  let categoriesProduct = {}
  if (categories){
    for (const categorie of categories){
    const response = await Product.find({category: categorie._id}, null, {sort: {'_id': -1}, limit: 3})
    categoriesProduct[categorie._id] = response}}
  return{
    props: {
      productsWisheds: JSON.parse(JSON.stringify(productsWisheds)),
      categories: JSON.parse(JSON.stringify(categories)),
      categoriesProduct: JSON.parse(JSON.stringify(categoriesProduct)),
    }
  }
}
