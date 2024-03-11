import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/module/Product';
import { PRODUCTS_BY_CATEGORY_URL, PROMOCODE_URL,PRODUCTS_BY_SEARCH_URL, PRODUCTS_CATEGORY_URL, PRODUCTS_URL, PRODUCT_BY_ID_URL, PROMOCODE_URL_BY_NAME, CREATE_ORDER_URL } from '../shared/constants/urls';
import { Category} from '../shared/module/Category';
import { PromoCode } from '../shared/module/PromoCode';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(PRODUCTS_URL, newProduct);
  }
  
  getProductById(productId:string):Observable<Product>{
    return this.http.get<Product>(PRODUCT_BY_ID_URL + productId);
  }

  deleteProductById(productId: string): Observable<void> {
    return this.http.delete<void>(PRODUCT_BY_ID_URL + productId);
  }

  editProductById(productId: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(PRODUCT_BY_ID_URL + productId, updatedProduct);
  }

  getAllTags(): Observable<Category[]> {
    return this.http.get<Category[]>(PRODUCTS_CATEGORY_URL);
  }

  getAllProductsByCategory(category: string): Observable<Product[]> {
    return category === "All" ?
      this.getAll() :
      this.http.get<Product[]>(PRODUCTS_BY_CATEGORY_URL + category);
  }

  getAllProductsBySearchTerm(searchTerm: string) {
    return this.http.get<Product[]>(PRODUCTS_BY_SEARCH_URL + searchTerm);
  }

  getPromoCode(promoCode: string): Observable<any> {
    return this.http.get(PROMOCODE_URL);
  }

  getPromoCodeByName(promoCode: string): Observable<any> {
    return this.http.get<PromoCode[]>(PROMOCODE_URL_BY_NAME + promoCode);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(CREATE_ORDER_URL, orderData);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(CREATE_ORDER_URL);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(CREATE_ORDER_URL+'/'+orderId);
  }
}
