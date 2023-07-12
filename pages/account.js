import Container from "@/components/Container";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { authOp } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { mongooseConnect } from "@/lib/mongoose";
import Wished from "@/models/WishedProduct";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import css from "styled-jsx/css";
import AnimationImage from "@/components/AnimationImage";
import Order from "@/models/Orders";
import Title from "@/components/Title";

const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
  margin: 10px 0px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const UserDetails = styled.h2`
  margin-bottom: 10px;
`;

const Box = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid #aaa;
  border-radius: 10px;
  ${(props) => (props.border ? "border:none" : "")};
  ${(props) =>
    props.start &&
    css`
      align-self: start;
    `}
`;

const CartForm = styled.form`
  display: grid;
  gap: 6px;
  input {
    width: 100%;
    display: block;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
  }
  input:focus,
  input:hover {
    outline: 1px solid #aaa;
  }
  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  button {
    border: none;
    padding: 8px 4px;
    cursor: pointer;
    color: white;
    background-color: #5542f6;
    border-radius: 5px;
    font-size: 0.8rem;
  }
`;

const WishedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonToggle = styled.button`
  background-color: white;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  margin-bottom: 15px;
  color: #aaa;
  ${(props) =>
    props.toggleActive
      ? "font-weight: bold; color: black; border-bottom: 3px solid #333"
      : ""}
`;

const Orders = styled.div`
  display: grid;
  gap: 20px;
`;

const OrderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 8px;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const OrderDetails = styled.div`
  color: #aaa;
  font-size: 0.8rem;
`;

const OrderItems = styled.div`
  font-size: 0.8rem;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function Account({ allProducts, allOrders }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loanding, setLoading] = useState(false);
  const [wish, setWish] = useState(allProducts || []);
  const [event, setEvent] = useState();
  const [src, setSrc] = useState("");
  const [toggle, setToggle] = useState("wishes");

  const { data: session } = useSession();

  function handleRemove(_id) {
    const newWishProducts = wish.filter((w) => {
      return w._id !== _id;
    });
    setWish(newWishProducts);
  }

  async function saveAddress(e) {
    e.preventDefault();
    const dataAddress = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
    };
    await axios.put("/api/address", dataAddress);
  }

  useEffect(() => {
    async function getUser() {
      if (session) {
        setLoading(true);
        const { data } = await axios.get("/api/address");
        if (data) {
          setName(data.name);
          setEmail(data.email);
          setCity(data.city);
          setPostalCode(data.postalCode);
          setStreetAddress(data.streetAddress);
          setCountry(data.country);
          setLoading(false);
        } else {
          setLoading(false);
          return;
        }
      }
    }
    getUser();
  }, [session]);

  return (
    <>
      <Header />
      <Container>
        <Title>Account</Title>
        {session && (
          <AccountGrid>
            <Box start={1}>
              <Buttons>
                <ButtonToggle
                  toggleActive={toggle === "wishes" ? true : false}
                  onClick={() => setToggle("wishes")}
                >
                  Wishlist
                </ButtonToggle>
                <ButtonToggle
                  toggleActive={toggle === "orders" ? true : false}
                  onClick={() => setToggle("orders")}
                >
                  Orders
                </ButtonToggle>
              </Buttons>
              {toggle === "wishes" && (
                <div>
                  {wish.length <= 0 && <p>Add products for you wishlist.</p>}
                  <WishedGrid>
                    {wish?.length > 0 &&
                      wish.map((p) => {
                        return (
                          <ProductCard
                            key={p._id}
                            verifyWish={true}
                            {...p}
                            remove={true}
                            handleRemove={handleRemove}
                            setEvent={setEvent}
                            setSrc={setSrc}
                          />
                        );
                      })}
                  </WishedGrid>
                </div>
              )}
              {toggle === "orders" && (
                <Orders>
                  {allOrders?.length > 0 &&
                    allOrders.map((order) => {
                      return (
                        <OrderBox key={order._id}>
                          <OrderDetails>
                            {new Date(order.createdAt).toLocaleString()}
                            <br />
                            {order.name}
                            {order.email}
                            <br />
                            {order.streetAddress}
                            <br />
                            {`${order.postalCode} ${order.city}, ${order.country}`}
                          </OrderDetails>
                          <OrderItems>
                            {order.line_items.length > 0 &&
                              order.line_items.map((itens) => {
                                return (
                                  <div key={itens.price_data.product_data.name}>
                                    {`${itens.quantity}x ${itens.price_data.product_data.name}`}
                                  </div>
                                );
                              })}
                          </OrderItems>
                        </OrderBox>
                      );
                    })}
                </Orders>
              )}
            </Box>
            <Box start={1}>
              <UserDetails>Account details</UserDetails>
              {!loanding && (
                <CartForm onSubmit={saveAddress}>
                  <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    type="email"
                    placeholder="Email"
                  />
                  <div>
                    <input
                      value={city}
                      onChange={({ target }) => setCity(target.value)}
                      type="text"
                      placeholder="City"
                    />
                    <input
                      value={postalCode}
                      onChange={({ target }) => setPostalCode(target.value)}
                      type="text"
                      placeholder="Postal Code"
                    />
                  </div>
                  <input
                    value={streetAddress}
                    onChange={({ target }) => setStreetAddress(target.value)}
                    type="text"
                    placeholder="Street Address"
                  />
                  <input
                    value={country}
                    onChange={({ target }) => setCountry(target.value)}
                    type="text"
                    placeholder="Country"
                  />
                  <button>{loanding ? "Waiting..." : "Save"}</button>
                </CartForm>
              )}
              {loanding && <Loading />}
            </Box>
          </AccountGrid>
        )}
        <AnimationImage event={event} src={src} />
      </Container>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  await mongooseConnect();
  const response = await getServerSession(req, res, authOp);
  const user = response?.user;

  const getOrders = await Order.find({ userEmail: user?.email });

  const wishedList = JSON.parse(
    JSON.stringify(await Wished.findOne({ userEmail: user?.email }))
  );
  const products = wishedList?.products;
  let allproducts = [];
  if (products) {
    allproducts = await Product.find({ _id: products });
  }
  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allproducts)),
      allOrders: JSON.parse(JSON.stringify(getOrders)),
    },
  };
}
