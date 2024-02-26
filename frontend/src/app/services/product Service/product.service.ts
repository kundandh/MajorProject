import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  saveProductDetails(product:any)
  {
    return this.http.post("http://localhost:4000/addProduct",product);
  }
}
