import { mongooseConnect } from "@/lib/mongoose"
import Product from "@/models/Product"

export default async function handle (req, res){

  await mongooseConnect()

  const {method} = req


  if (method === "GET"){
    const { search } = req.query
    if (search?.length > 0) {
    const result = await Product.find({$or: [{title: {$regex: search, $options: 'i'}}, {description: {$regex: search, $options: 'i'}}]})
    res.json(result)
    }
  }

  if (method === "POST") {
    const { category, properties, price } = req.body
      let queries = {}
      properties?.forEach((p)=>{
        if(p !== null){
      queries = {...queries, [`properties.${p.name}`]:p.value}
      }})
      const query = Object.keys(queries).length > 0 ? {category, ...queries} : {category}

      if (price){
        const [sortField, sortOrder] = price.split('-')
        const productResult = await Product.find(query, null, {sort: {[sortField]: sortOrder}})
        res.json(productResult)
      } else { 
      const productResult = await Product.find(query)
      res.json(productResult)
    }
  }
}