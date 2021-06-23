import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { ResponseBase } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor( private http: HttpClient ) { }

  get( module: string) {
    return this.http.get<ResponseBase>(`${ environment.URL }${ module }`);
  }

  getFilter( module: string, params: string ) {
    return this.http.get<ResponseBase>(`${ environment.URL }${ module }?${ params }`);
  }

  getFilterSubModule( module: string, subModule:string, params: string ) {
    return this.http.get<ResponseBase>(`${ environment.URL }${ module }/${ subModule }?${ params }`);
  }

  post( module: string, parameters: any) {
    return this.http.post<ResponseBase>(`${ environment.URL }${ module }`, parameters);
  }

  postRange( module: string, parameters: any[] ) {
    return this.http.post<ResponseBase>(`${ environment.URL }${ module }`, parameters);
  }

  delete( module: string, id: number) {
    return this.http.delete<ResponseBase>(`${ environment.URL }${ module }?id = ${ id }`);
  }

  update( module: string, parameters: any) {
    return this.http.put<ResponseBase>(`${ environment.URL }${ module }`, parameters);
  }

}
