import AnimationImage from "@/components/AnimationImage";
import CardComment from "@/components/CardComment";
import { CartContext } from "@/components/CartContext";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Stars from "@/components/Stars";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Review from "@/models/Review";
import axios from "axios";
import { RevealWrapper } from "next-reveal";
import { useContext, useState } from "react";
import styled from "styled-components";

const ProductColumn = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  padding: 0 20px;
  gap: 30px;
  margin: 40px 0px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap:0px;
  }
`;

const ImageBox = styled.div`
  border: 1px solid #aaa;
  padding: 15px;
  border-radius: 10px;
  align-self: start;
`;

const InfosBox = styled.div`
  padding: 15px 0px ;
`;

const ImageCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const MainImage = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  img {
    max-height: 100%;
  }
`;

const Button = styled.button`
  padding: 9px;
  font-size: 1rem;
  border-radius: 5px;
  color: white;
  background-color: #5542f6;
  outline: none;
  border: none;
  display: inline-block;
  cursor: pointer;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  svg {
    height: 1.4rem;
    width: 1.4rem;
  }
`;

const ProductAction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    align-items:start;
    margin-top: 20px;
  }
  span {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
`;

const ImageButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border: 2px solid #ccc;
  ${props=> props.active ? 'border-color: #ccc' : 'border-color: transparent'};
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
    img {
      max-height: 100%;
    }
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  &>:nth-child(1){
    align-self: start;
  }
  &>:nth-child(2){
    max-height: 400px;
    overflow-y: scroll;
  }
  @media (max-width: 800px){
    grid-template-columns: 1fr;
  }
`;

const ReviewCollumn = styled.div`
  border: 1px solid #aaa;
  padding: 30px;
  border-radius: 10px;
  h3{
    margin-bottom: 10px;
  }
`;

const ReviewContainer = styled.div`
  margin-bottom: 20px;
  h2{
    margin-bottom: 10px;
  }
`;

const ReviewForm = styled.form`
  display: grid;
  gap:8px;
   input { 
    width: 100%;
    display: block;
    box-sizing: border-box;
    padding: 8px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 5px;
    font-size: 1rem;
    outline: none;}
    input:focus, input:hover{
      outline: 1px solid #aaa;
    }
    textarea{
      font-family: "roboto", Arial, Helvetica, sans-serif;
      box-sizing: border-box;
      width: 100%;
      font-size: 1rem;
      border-radius: 5px;
      resize: none;
      padding: 8px;
      &:focus, &:hover{
      outline: 1px solid #aaa;
    }
    }
`;

const InfosTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 12px;
`;
const InfosText = styled.p`
  font-size: 1rem;
  margin-bottom: 15px;
`;

export default function ProductPage({product: defaultProduct, reviews}) {

  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(defaultProduct || {});
  const [img, setImg] = useState(defaultProduct?.images?.[0] || '');
  const [event,setEvent] = useState()
  const [rate, setRate] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [allReviews, setAllReviews] = useState(reviews || [])

  async function submitComment (e){
    e.preventDefault()
    const {data} = await axios.post('/api/review', {rate, title, description, product: product._id})
    if (data){
      setAllReviews((r)=>{
        return ([ data,...r])
      })
    }
  }


  return (
    <>
      <Header />
      <Container>
        {product && (
          <ProductColumn>
            <RevealWrapper delay={150}>
              <ImageBox>
                <MainImage>
                  <img src={img ? img : product.images?.[0]} alt={img ? img : product.images?.[0]}/>
                </MainImage>
                <ImageCards>
                  {product.images &&
                    product.images.length > 0 &&
                    product.images.map((p) => {
                      return (
                        <ImageButton active={p===img} onClick={() => setImg(p)} key={p}>
                          <img src={p} alt={p} />
                        </ImageButton>
                      );
                    })}
                </ImageCards>
              </ImageBox>
            </RevealWrapper>
            <RevealWrapper delay={250}>
              <InfosBox>
                <InfosTitle>{product.title}</InfosTitle>
                <InfosText>{product.description}</InfosText>
                <ProductAction>
                  <span>${product.price}</span>
                  <Button onClick={(e) => {
                    addToCart(product._id)
                    setEvent(e)
                    }}>
                    add to Cart
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
                </ProductAction>
              </InfosBox>
            </RevealWrapper>
          </ProductColumn>
        )}
        <ReviewContainer>
          <h2>Review</h2>
          <ReviewGrid>
            <ReviewCollumn>
              <h3>Add review</h3>
              <ReviewForm onSubmit={submitComment}>
                <Stars reviewValue={(v)=> setRate(v)}/>
                <input placeholder="comment title" onChange={({target})=> setTitle(target.value)}/>
                <textarea rows={8} onChange={({target})=> setDescription(target.value)}/>
                <Button type="submit">Save comment</Button>
              </ReviewForm>
            </ReviewCollumn>
            <ReviewCollumn>
              <h3>Comments</h3>
              {allReviews?.length > 0 && allReviews.map(r=>{
                return(
                  <CardComment {...r} key={r._id}/>
                )
              })}
              {allReviews?.length <= 0 && <p style={{textAlign: "center"}}>No comments</p>}
            </ReviewCollumn>
          </ReviewGrid>
        </ReviewContainer>
      </Container>
      <AnimationImage event={event} src={defaultProduct?.images?.[0]}/>
    </>
  );
}

export async function getServerSideProps(context){
  await mongooseConnect()

  if(context.query.id){
    const product = await Product.findById(context?.query?.id)
    const reviews  = await Review.find({product: context?.query?.id}, null, {
      sort: { _id: -1 },
      limit: 10})
    return ({
      props: {
        product: JSON.parse(JSON.stringify(product)),
        reviews: JSON.parse(JSON.stringify(reviews))
      }
    })
  }
}