import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Documento } from '../model/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService extends GenericService<Documento>  {

  private subjectCambio = new Subject<Documento[]>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}documentos`)
  }

  getChange(){
    return this.subjectCambio.asObservable();
  }

  setChange(lista:Documento[]){
    this.subjectCambio.next(lista);
  }

  findByDocumentoOficinaDestino(oficinaId:number){
    return this.http.get(`${environment.HOST}documentos/findByDocumentoOficinaDestino/${oficinaId}`);
  }
}
