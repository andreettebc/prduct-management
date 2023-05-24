import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'authorId': '2019'
    })
  };
  

  constructor(private http:HttpClient) { }

  private getQuery(query: string): string {
    const urlService = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
    return urlService + query;
  }


  public getProducts() {
    return this.http.get(this.getQuery('/bp/products'),this.httpOptions);
  }

  public deleteProducts(idProduct:number){
    return this.http.delete(this.getQuery('/bp/products?id' + `${idProduct}`),this.httpOptions);
  } 


 public updateProducts(product:IProduct){
  return this.http.put(this.getQuery('/bp/products'),product,this.httpOptions);
  } 

  public postProduct(product:IProduct){
    return this.http.post<any>(this.getQuery('/bp/products'), product, this.httpOptions)
  }
}
