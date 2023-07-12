import Container from "./Container";
import ProductGrid from "./ProductGrid";
import Title from "./Title";

export default function NewProducts({products}) {

  return (
    <Container>
      <Title>New products</Title>
      <ProductGrid products={products}/>
    </Container>
  )
}

