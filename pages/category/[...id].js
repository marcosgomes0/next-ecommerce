import Container from "@/components/Container";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PropertiesBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  h2{
    margin-bottom: 10px;
  }
`;

const Properties = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const Property = styled.div`
  background-color: #ccc;
  padding: 5px;
  border-radius: 5px;
  span{
    font-size: .8rem;
  }
  select{
    background-color: #ccc;
    border: none;
    padding: 2px;
  }
`;

const NotFound = styled.p`
  font-size: 1.5rem;
  margin-top: 20px;
`;

export default function CategoryPage({products: defaultProducts, category}){

const [products, setProducts] = useState(defaultProducts || [])
const [price, setPrice] = useState('')
const [properties, setProperties] = useState([])
const [change, setChange] = useState(false)

 function mountProperties(value, name, index){
  setProperties((p)=>{
    const newProperty = [...p]
    if(value === "All") {
    newProperty[index] = {}
    return newProperty
  } else {
    newProperty[index] = {name, value}
    return newProperty
  }
  })
}

useEffect(()=>{
  if (change){
  async function getFiltedProducts(){
    const {data} = await axios.post(`/api/products`, {category: category._id, properties, price})
    if(data){
      setProducts(data)
    }  
  }
  getFiltedProducts()
  }
},[properties, category._id, price, change])


  return (
    <>
      <Header/>
      <Container>
        {products && category && (
        <div>
          <PropertiesBox>
            <h2>{category.name}</h2>
            <Properties>{category.properties?.length > 0 && category.properties.map((c,index)=> {return (
              <Property key={c.name}>
                <span>{c.name[0].toUpperCase() +  c.name.substring(1)}:</span>
                <select onChange={({target})=> {
                  mountProperties(target.value, c.name, index)
                  setChange(true)}}>
                  <option value={'All'}>All</option>
                {c.value?.length > 0 && c.value.map((v)=>{
                  return <option value={`${v}`} key={v}>{v}</option>
                })}
                </select>
              </Property>
            )})}
            <Property>
              <span>Price:</span>
              <select onChange={({target})=>{
                setPrice(target.value) 
                setChange(true)}}>
                <option value="">
                  Select
                </option>
                <option value="price-asc">
                  Lowest
                </option>
                <option value="price-desc">
                  Highest
                </option>
              </select>
            </Property>
            </Properties>
          </PropertiesBox>
          {products?.length > 0 ? <ProductGrid products={products}/> : <NotFound>Products not found.</NotFound>}
        </div>
        )}
      </Container>
    </>
  )
}

export async function getServerSideProps(context){

  await mongooseConnect()
  const { id } = context.query
  const products  = await Product.find({category: id})
  const category = await Category.findById(id)
  return{
    props: {
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(category))
    }
  }
} 