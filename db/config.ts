import { column, defineDb, defineTable } from 'astro:db';

const User= defineTable({
  columns:{
    id: column.text({primaryKey:true,unique:true}),
    name: column.text(),
    email: column.text({unique:true}),
    password: column.text(),
    role: column.text({references:() =>Role.columns.id}),
  }
})
const Role = defineTable({
  columns:{
    id: column.text({primaryKey:true, unique:true}),
    name: column.text(),
    createdAt: column.date({default:new Date()})
  }
})
const Product = defineTable({
  columns:{
    id: column.text({primaryKey:true, unique:true}),
    stock: column.number(),
    slug: column.text({unique:true}),
    price: column.number(),
    sizes: column.text(),
    type: column.text(),
    tags: column.text(),
    title: column.text(),
    description: column.text(),
    gender: column.text(),
    user: column.text({references:() =>User.columns.id}),
  }
})
const ProductImage = defineTable({
  columns:{
    id: column.text({primaryKey:true, unique:true}),
    image: column.text(),
    productId: column.text({references:() =>Product.columns.id}),
  }
})
// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Role,
    Product,
    ProductImage
  }
});
