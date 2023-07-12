import Container from '@/components/Container'
import Header from '@/components/Header'
import Loading from '@/components/Loading';
import ProductGrid from '@/components/ProductGrid';
import Title from '@/components/Title';
import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: none;
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  background-color: transparent;
`;

const Search = styled.form`
  display: flex;
  border: 2px solid #aaa;
  overflow: hidden;
  border-radius: 5px;
  position: sticky;
  margin-top: 10px;
  top: 115px;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 5;
  &:hover{
    border: 2px solid #222;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  svg{
    width: 30px;
    height: 30px;
    color: #aaa;
    &:hover{
      color: #333;
    }
  }
`;

export default function SearchPage() {

  const [ search, setSearch ] = useState('')
  const [ products, setProducts ] = useState([])
  const [ firstSearch, setFirstSearch ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

 async function submitSearch(e){
  e.preventDefault()
  setProducts([])
  setFirstSearch(false)
  setIsLoading(true)
    if (search?.length > 0 && search !== '' && search.trim().length !== 0){
      const {data} = await axios.get(`/api/products?search=${encodeURIComponent(search)}`)
      if (data?.length > 0){
          setProducts(data)
          setFirstSearch(true)
          setIsLoading(false)
      } else{
        setProducts([])
        setFirstSearch(true)
        setIsLoading(false)
      }
    } else {
      setProducts([])
      setFirstSearch(true)
      setIsLoading(false)
    }
  }


  return (
    <>
      <Header/>
      <Container>
        <Search onSubmit={submitSearch}>
          <SearchInput placeholder='Search you product' onChange={({target})=>{
            setSearch(target.value)
          }}/>
          <SearchButton>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </SearchButton>
        </Search>
        {isLoading && <Loading/>}
        {products?.length > 0 && <ProductGrid products={products}/>}
        {products.length === 0 && firstSearch && <Title>No Products found.</Title>}
      </Container>
    </>
  )
}

