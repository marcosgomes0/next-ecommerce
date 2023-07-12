import { CartContext } from "@/components/CartContext";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Title from "@/components/Title";
import axios from "axios";
import { useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import css from "styled-jsx/css";

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 20px;
  margin: 20px 0px;
  @media (max-width: 800px){
    grid-template-columns: 1fr;
  }
`;

const OrderTitle = styled.h2`
  margin-bottom: 10px
`;

const Box = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid #aaa;
  border-radius: 10px;
  ${props=> props.border ? "border:none" : ''};
  ${props => props.start && css`
  align-self: start;
  `}`;

const Table = styled.table`
  width: 100%;
  th{
    text-align: start;
  }
  thead{
    th{
      padding-bottom: 10px
    }
  }
  tbody{
    td{
      border-top: 1px solid rgba(0,0,0, 0.1);
      padding: 10px 0px;
    }
  }
`;

const CartImage = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  img{
    max-height: 100%;
 
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Button = styled.button`
  padding: 4px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.1);
`;

const CartForm = styled.form`
  display: grid;
  gap: 6px;
  input{
    width: 100%;
    display: block;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
  }
    input:focus, input:hover{
      outline: 1px solid #aaa;
    }
  div{
    display: flex;
    align-items: center;
    gap: 4px;
  } 
  button{
    border: none;
    padding: 8px 4px;
    cursor: pointer;
    color: white;
    background-color: #5542f6;
    border-radius: 5px;
    font-size: .8rem;
  }
`;


export default function Cart() {

  const {data: session} = useSession()

  useEffect(()=>{
    async function getUser(){
      if(session){
        setLoading(true)
        const {data} = await axios.get('/api/address')
        if(data){
        setName(data.name)
        setEmail(data.email)
        setCity(data.city)
        setPostalCode(data.postalCode)
        setStreetAddress(data.streetAddress)
        setCountry(data.country)
        setLoading(false)
       } else{
        setLoading(false)
        return
       }
      }
    }
    getUser()
  },[session])  

  const { cartProducts, addToCart, removeCart, clearCart } = useContext(CartContext)
  const [allCartProducts, setAllCartProducts] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode,setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country,setCountry] = useState('')
  const [total, setTotal] = useState(0)
  const [loanding, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [border, setBorder] = useState(false)

  async function submitPayment(e){
    e.preventDefault()
    setLoading(true)
    const data = {name, email, city, postalCode, streetAddress, country, cartProducts}
    const res = await axios.post('api/checkout', data) 
    if(res.data.url){
      setLoading(false)
      window.location = res.data.url
    } else {
      setLoading(false)
    }
  }


  useEffect(()=>{
    async function getProducts(){
      if(cartProducts.length === 0){
        setBorder(true)
      }
      if (cartProducts.length > 0){
        setBorder(false)
        const {data} = await axios.post('/api/cart', {ids:cartProducts})
        setAllCartProducts(data)
      } else {
        return 
      }
    }
   getProducts()

  },[cartProducts])

useEffect(()=>{
  let total = 0
  function returnTotal(){
    if (allCartProducts){
      allCartProducts.forEach((product)=>{
        const productsQuantity = cartProducts.filter((p)=>{
          return p === product._id
        })
        total += productsQuantity.length * product.price
      })
    }
    return total
  }
  setTotal(returnTotal())
},[cartProducts,allCartProducts])

useEffect(()=>{
  if (typeof window === "undefined"){
    return
  } 
  if (window?.location.href.includes('success')){
    setIsSuccess(true)
    clearCart()
  }
},[])

if(isSuccess)
  return (
    <>
      <Header/>
      <Container>
          <CartGrid>
            <Box>
              <h2>
                Thank you for you order!
              </h2>
              <p>
                You will receive a email when you order will be sent.
              </p>
            </Box>
          </CartGrid>
      </Container>
    </>
  )

  return (
    <>
      <Header/>
      <Container>
      <Title>Cart</Title>
        <CartGrid>
          <RevealWrapper delay={150}>
            <Box border={border}>
              {!cartProducts.length && <h2>
                Your cart is empty.</h2>}
              {cartProducts?.length > 0 &&
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCartProducts?.length > 0 && allCartProducts.map((product)=>{
                      return (
                        <tr key={product._id}>
                          <td>
                            <CartImage>
                              <img src={product.images?.[0]} alt={product.title}></img>
                            </CartImage>
                              {product.title}
                          </td>
                          <td>
                            <Quantity>
                              <Button onClick={()=>{removeCart(product._id)}}>-</Button>
                              {cartProducts?.length > 0 && <div>{cartProducts.filter((p)=>{
                                return p === product._id
                              }).length}</div>}
                                <Button onClick={()=>{addToCart(product._id)}}>+</Button>
                            </Quantity>
                          </td>
                          <td>
                            {cartProducts?.length > 0 && <div>${cartProducts.filter((p)=>{
                              return p === product._id
                            }).length * product.price}</div>}
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      <td></td>
                      <td>Total</td>
                      <td>${total && total}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>}
            </Box>
          </RevealWrapper>
          {cartProducts?.length > 0 && <RevealWrapper delay={250}>
            <Box start="1">
              <OrderTitle>Order information</OrderTitle>
              <CartForm onSubmit={submitPayment}>
                <input value={name} onChange={({target})=> setName(target.value)} type="text" placeholder="Name"/>
                <input value={email} onChange={({target})=> setEmail(target.value)} type="email" placeholder="Email"/>
                <div>
                  <input value={city} onChange={({target})=> setCity(target.value)} type="text" placeholder="City"/>
                  <input value={postalCode} onChange={({target})=> setPostalCode(target.value)} type="text" placeholder="Postal Code"/>
                </div>
                <input value={streetAddress} onChange={({target})=> setStreetAddress(target.value)} type="text" placeholder="Street Address"/>
                <input value={country} onChange={({target})=> setCountry(target.value)} type="text" placeholder="Country"/>
                <button>{loanding? "Waiting..." : "Continue to payment"}</button>
              </CartForm>
            </Box>
          </RevealWrapper>}
        </CartGrid>
      </Container>
    </>
  )
}



