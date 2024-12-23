import { defineAction } from "astro:actions";
import { db, eq, Product, ProductImage } from "astro:db";
import { z } from "astro:schema";

export const getProductBySlug = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (slug) => {
        console.log({slug});
        
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