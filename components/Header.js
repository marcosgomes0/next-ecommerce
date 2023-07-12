import Link from "next/link";
import styled from "styled-components";
import Container from "./Container";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarIcon from "./icons/BarIcon";
import SearchIcon from "./icons/SearchIcon";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";


const HeaderContainer = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 8;
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.4rem;
`;
const NavLinks = styled(Link)`
  text-decoration: none;
  color: #aaa;
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  transition: all 0.3s;
  @media (max-width: 780px){
    flex-direction: column;
    justify-content: center;
    gap:40px;
    border-left: 1px solid #aaa;
    position: fixed;
    top: 0;
    right: 0;
    width: 50vw;
    height: 100vh;
    background-color: #222;
    ${props=> props.menuActive ? "right: 0" : "right: -100%"};
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0px;
  box-sizing: border-box;
`;

const SideLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px;
  border-radius: 2px;
  font-size: .8rem;
  color: white;
  border: 1px solid #5542f6;
  cursor: pointer;
`;

const UserHeader = styled.button`
  display: flex;
  background-color: transparent;
  align-items: center;
  gap: 3px;
  padding: 3px;
  border-radius: 3px;
  border: 1px solid #aaa;
  font-size: .8rem;
  color: white;
  cursor: pointer;
  img{
    width: 22px;
    height: 22px;
    border-radius: 2px;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
`;

const Modal = styled.div`
  width: 300px;
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: grid;
  gap: 15px;
  a, button{
  padding: 9px;
  box-sizing: border-box;
  font-size: 1rem;
  border-radius: 5px;
  color: white;
  background-color: #5542f6;
  outline: none;
  border: none;
  display: inline-block;
  cursor: pointer;
  gap: 5px;
  display: block;
  text-align: center;
  width: 100%;
  }
  h3{
    margin-bottom: 5px;
  }
`;


const Close = styled.span`
  display: block;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5542f6;
  color: white;
  border: 2px solid white;
  border-radius: 50%;
  position: absolute;
  right: -15px;
  top: -15px;
  cursor: pointer;
`;

export default function Header() {

  const { cartProducts } = useContext(CartContext)
  const [ handleMenu, setHandleMenu ] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const { pathname } = useRouter()
  const { data: session } = useSession();

  async function login() {
    await signIn("google");
  }

  async function logout() {
    await signOut({ callbackUrl: process.env.PUBLIC_URL });
  }

  function closeModal(e){
    if (e.currentTarget === e.target){
      setActiveModal(false)
    }
  }

 
  return (
    <HeaderContainer>
      <Container>
        <Menu>
          <Logo
            href={"/"}
            className="flex flex-1 justify-center md:justify-start"
          >
            Ecommerce
          </Logo>
          <NavMenu menuActive={handleMenu}>
            <NavLinks href={"/"}>Home</NavLinks>
            <NavLinks href={"/products"}>All Products</NavLinks>
            <NavLinks href={"/categories"}>Categories</NavLinks>
            {!session && <LoginButton onClick={login}>Login</LoginButton>}
            {session && <UserHeader onClick={()=> setActiveModal(!activeModal)}>
              {session.user?.name}
              <img src={session.user?.image}/>
              </UserHeader>}
            <NavLinks href={"/cart"}>Cart ({cartProducts?.length})</NavLinks>
          </NavMenu>
          <SideLinks>
            {!pathname.includes('/search') && <SearchIcon/>}
            <BarIcon handleMenu={setHandleMenu}/>
          </SideLinks>
        </Menu>
        {activeModal && 
        <ModalContainer onClick={closeModal}>
          <Modal>
            <Close onClick={()=> setActiveModal(!activeModal)}>X</Close>
            {!pathname?.includes('/account') &&<div>
               <h3>Account</h3>
               <Link href={'/account'}>Account</Link>
            </div>}
            <div>
              <h3>Logout</h3>
              <button onClick={logout}>Logout</button>     
            </div>
          </Modal>
        </ModalContainer>}
      </Container>
    </HeaderContainer>
  );
}
