import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import HeartBorderIcon from "./icons/HeartBorderIcon";
import HeartFillIicon from "./icons/HeartFillIicon";
import axios from "axios";

const Card = styled.div`
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: black;
  position: relative;
  flex: 1;
  ${(props) => (props.noExpand ? "flex: 0" : "")}
`;

const CardImage = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 160px;
  margin: 12px auto;
  img {
    max-height: 100%;
  }
`;

const ProductBox = styled.div`
  flex: 1;
  display: grid;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 8px;
`;
const ProductPrice = styled.span`
  align-self: end;
  justify-self: end;
  font-weight: bold;
`;

const Button = styled.button`
  border: none;
  background-color: #5542f6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 3px;
  border-radius: 2px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  svg {
    height: 1.4rem;
    width: 1.4rem;
  }
`;

const IconPosition = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default function ProductCard({
  title,
  _id,
  price,
  images,
  setSrc,
  setEvent,
  verifyWish,
  remove,
  handleRemove,
  noExpand,
}) {
  const { addToCart } = useContext(CartContext);
  const [wish, setWish] = useState(false);

  async function toggleWished() {
    setWish(!wish);
    await axios.put("/api/wished", { _id });
  }

  function removeCard() {
    if (remove) {
      handleRemove(_id);
    }
  }

  useEffect(() => {
    setWish(verifyWish);
  }, [verifyWish]);

  return (
    <Card noExpand={noExpand ? noExpand : ""}>
      <IconPosition
        onClick={() => {
          toggleWished();
          removeCard();
        }}
      >
        {wish ? <HeartFillIicon /> : <HeartBorderIcon />}
      </IconPosition>
      <CardImage href={`/product/${_id}`}>
        <img src={images?.[0]} alt={title} />
      </CardImage>
      <ProductBox>
        <ProductTitle>{title}</ProductTitle>
        <ProductPrice>${price}</ProductPrice>
      </ProductBox>
      <Button
        onClick={(e) => {
          addToCart(_id);
          setSrc(images?.[0]);
          setEvent(e);
        }}
      >
        Add to cart
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </Button>
    </Card>
  );
}
