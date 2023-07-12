import Container from "@/components/Container";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import React from "react";

export default function products({ products }) {
  return (
    <>
      <Header />
      <Container>
        <Title>All products</Title>
        <ProductGrid products={products} />
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}
