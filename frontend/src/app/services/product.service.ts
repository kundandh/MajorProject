import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/module/Product';
import { PRODUCTS_BY_CATEGORY_URL, PROMOCODE_URL,PRODUCTS_BY_SEARCH_URL, PRODUCTS_CATEGORY_URL, PRODUCTS_URL, PRODUCT_BY_ID_URL } from '../shared/constants/urls';
import { Category} from '../shared/module/Category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'your_backend_api_url';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getProductById(productId:string):Observable<Product>{
    return this.http.get<Product>(PRODUCT_BY_ID_URL + productId);
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
    return this.http.get(PROMOCODE_URL + promoCode);
  }
}
