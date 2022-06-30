import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];
  private apiKey = 'K3ChYvytTbTjaUcDWFGwYVNBSDlAfzzU';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  public resultado: Gif[] = [];


  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  buscarGifs(consulta:string){

    consulta = consulta.trim().toLocaleLowerCase();
   
    if(!this._historial.includes(consulta)){
      this._historial.unshift(consulta);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', consulta);

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search?`, {params})
      .subscribe( (resp) => {
        this.resultado= resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultado));
      })
  }
}
