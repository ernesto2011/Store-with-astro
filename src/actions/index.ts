import { loginUser, logout, registerUser } from './auth';
import { getProductBySlug } from './products/get-product-by-slug.action';
import { getProductsByPage } from './products/get-products-by-page.action';
import { updateProduct } from './products/update-product.action';

export const server = {
  // actions

  // Auth
  loginUser,
  logout,
  registerUser,

  //products
  getProductsByPage,
  getProductBySlug,
  updateProduct
};
