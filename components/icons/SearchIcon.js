
import Link from 'next/link';
import React from 'react'
import styled from 'styled-components';

const SearchStyle = styled(Link)`
  cursor: pointer;
 svg {width: 25px;
  height: 25px;
  color: #aaa;
  display: none;
  z-index: 10;
  display: block;}
`;

export default function SearchIcon() {
  return (
    <SearchStyle href={"/search"}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </SearchStyle>
  )
}

