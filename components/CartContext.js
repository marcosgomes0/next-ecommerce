
import { createContext, useEffect, useState } from "react"



export const CartContext = createContext({})

export default function CartContextProvider({children}) {
  const [cartProducts, setCartProducts] = useState([])

  function addToCart(productId){
    setCartProducts((cartProducts)=>{
    return ([...cartProducts, productId])})
  }
  function removeCart(productId){
    const productIndex = cartProducts.indexOf(productId)
    if (productIndex != -1){
    const newArray = cartProducts.filter((product, index)=>{
      return index !== productIndex
    })
    setCartProducts(newArray)
  } else{
    return
    }
  }
  
  function clearCart(){
    setCartProducts([])
    localStorage.setItem('cart', JSON.stringify([]))
  }

  useEffect(()=>{
    if (cartProducts?.length > 0){
      window?.localStorage.setItem('cart', JSON.stringify(cartProducts))
    }
  },[cartProducts])

  useEffect(()=>{    
  if (window && window.localStorage.getItem('cart')){
    setCartProducts(JSON.parse(localStorage.getItem('cart')))
  }
},[])

  return (
    <CartContext.Provider value={{cartProducts, addToCart, removeCart, setCartProducts, clearCart}}>{children}</CartContext.Provider>
  )
}

