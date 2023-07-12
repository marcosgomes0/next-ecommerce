import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Settings from "@/models/Settings";

export default function Home({ product, products }) {
  return (
    <>
      <Header />
      <Featured {...product} />
      <NewProducts products={products} />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProduct = await Settings.findOne({ name: "featured" }).populate('featured');
  const productFeatured = featuredProduct?.featured
  const featuredProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10
  });
  return {
    props: {
      product: JSON.parse(JSON.stringify(productFeatured)),
      products: JSON.parse(JSON.stringify(featuredProducts)),
    },
  };
}
