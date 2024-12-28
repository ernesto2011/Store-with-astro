import { defineAction } from "astro:actions";
import { db, eq, Product, ProductImage } from "astro:db";
import { z } from "astro:schema";

const newProduct= {
    id: '',
    title: 'Nuevo Producto',
    description: 'Nueva descripción',
    gender: 'men',
    price: 1,
    sizes: 'XS,S,M',
    slug: 'slug-product',
    stock: 1,
    tags: 'tag1,tag2',
    type: 'shirts',
    user: ''
}
export const getProductBySlug = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (slug) => {
        if(slug === 'new'){
            return {
                product: newProduct,
                images: [] 
            }
        }
        const [product] = await db.select().from(Product).where(eq(Product.slug, slug))
        if(!product){
            throw new Error('Producto no encontrado')
        }
        const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id));
        return {
            product,
            images: images.map(img => img.image)
        }
    }
})