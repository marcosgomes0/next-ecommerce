import React from 'react'
import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'

const LoadingStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

export default function Loading() {
  return (
    <LoadingStyle>
      <MoonLoader color='#5542f6' size={60}/>
    </LoadingStyle>
  )
}

