import '@/styles/globals.css'
import styled, { createGlobalStyle } from 'styled-components'
import { Roboto } from 'next/font/google'
import CartContextProvider from '@/components/CartContext';
import { SessionProvider } from 'next-auth/react'


const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }
  body {
  text-decoration: none;
  list-style: none;};
  background-color: #aaa;
  img{
    max-width: 100%;
  };
  a {
    text-decoration: none;
  };
  input{
    width: 100%;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
    
        <GlobalStyles/>
        <SessionProvider session={session}>
          <CartContextProvider>
            <div className={roboto.className}>
              <Component {...pageProps} />
            </div>
          </CartContextProvider>
        </SessionProvider>
    </>
  )
}
