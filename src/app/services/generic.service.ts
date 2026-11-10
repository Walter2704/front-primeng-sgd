import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(protected http: HttpClient, @Inject(String) protected url:string) { }

  findAll(){
    return this.http.get<T[]>(this.url);
  }

  findById(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  add(t: T) {
    return this.http.post(this.url, t);
  }

  update(t: T) {
    return this.http.put(this.url, t);
  }

  deleteById(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
