import type { CartItem } from "@/interfaces";
import Cookies from "js-cookie";

export class CartCookiesClient {
    static getcart(): CartItem[] {
        return JSON.parse(Cookies.get('cart') ?? '[]')
    
    }
    static additem(cartItem: CartItem): CartItem[]{
        const cart = CartCookiesClient.getcart();
        const item = cart.find(item => item.productId === cartItem.productId && item.size === cartItem.size);
        if(item){
            item.quantity += cartItem.quantity;
        }else{
            cart.push(cartItem);
        }
        Cookies.set('cart', JSON.stringify(cart));
        return cart;
    }
    static removeitem(productId: string, size: string): CartItem[]{
        const cart = CartCookiesClient.getcart();
        const updateCart = cart.filter(
            (item) => !(item.productId === productId && item.size === size)
        )
        Cookies.set('cart', JSON.stringify(updateCart));
        return updateCart;
    }
}