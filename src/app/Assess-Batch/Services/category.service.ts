import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../Models/Category";



@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  url = "http://localhost:9090/all/category/all";
  getUrl = "http://localhost:9090/all/category/"
//   ourCategories: Category[] = [];
//   categories = new EventEmitter<Category[]>();

  
  
   
  getCategories(): Observable<[Category]> {
    return this.http.get<[Category]>(this.url);
  }

  getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(this.getUrl+id);
  }

//   storeCategories(entry: Category[]) {
//     this.ourCategories = entry;
//     console.log(this.ourCategories);
//   }

//   returnCategories(): Category[] {
//     return this.ourCategories;
//   }
}