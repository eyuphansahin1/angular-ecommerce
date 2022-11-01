import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap, delay } from "rxjs";
import { Product } from "../models/product";

// local service
@Injectable()
export class ProductService {
    private url = "https://ng-shopapp-d4ef5-default-rtdb.firebaseio.com/";

    constructor(private http: HttpClient) {}

    getProducts(categoryId: number): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.url + "products.json")
            .pipe(
                map(data => {
                    const products: Product[] = [];

                    for(const key in data) {
                        if(categoryId) {
                            if(categoryId == data[key].categoryId) {
                                products.push({ ...data[key], id: key });
                            }
                        }
                        else {
                            products.push({ ...data[key], id: key });
                        }
                    }

                    return products;
                }),
                tap(data => console.log(data)),
                delay(1000)
            );
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(this.url + "products/" + id + ".json").pipe(delay(1000));
    }

    createProduct(product: Product): Observable<Product> {
        const token: string = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjMzdkNTkzNjVjNjIyOGI4Y2NkYWNhNTM2MGFjMjRkMDQxNWMxZWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmctc2hvcGFwcC1kNGVmNSIsImF1ZCI6Im5nLXNob3BhcHAtZDRlZjUiLCJhdXRoX3RpbWUiOjE2NjcyOTI0NjcsInVzZXJfaWQiOiJZeXNtTnYzYVZtWnJnN01kTUVreEpmZ1dXT3gyIiwic3ViIjoiWXlzbU52M2FWbVpyZzdNZE1Fa3hKZmdXV094MiIsImlhdCI6MTY2NzI5MjQ2NywiZXhwIjoxNjY3Mjk2MDY3LCJlbWFpbCI6ImluZm9AY2luYXJ0dXJhbi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiaW5mb0BjaW5hcnR1cmFuLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.XUk94gR9kB26i4_nwc4vOOfP31s2QetpLi7JkG8aAE-icDOYelttuCeibrjwyaiCSUlws5l-d6vUb4_QVpY5kyh5pofBBHtSxJ6z8LwEgtU7-uW405M8s5Dyf4qBzfDoGgDT9xgZ8px3cKtZWnYTv8DT_SqIXfaHtWTwp0zOl1haMIIt9pa94Kl8hwJUcWemF9nbMLQIjeIPNBNRQdrWa_-RMIgA1veJJTzWI_HTB31UQF3t2Y4TSS5sE9lZ9MO1DxOd9LtIEY4k8rdU-7cOvWIB2QGbbubH0I5QkN2ehIGSFnR7KVrCyZ1a9Qdom3e7LggY136G13iUutQi2BUDHw"

        return this.http.post<Product>(this.url + "products.json?auth=" + token, product);
    }
}