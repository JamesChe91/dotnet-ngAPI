import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from './empleados';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class EmpleadosService {
  http: HttpClient;
  baseUrl: string;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;

  }
  GetEmpleados() {
    return this.http.get<Empleado[]>(this.baseUrl + 'api/Empleado');
  }
  GetEmpleadosByPage(PageIndex: number, PageSize: number) {
    return this.http.get<Empleado[]>(this.baseUrl + 'api/Empleado/' + PageIndex + '/' + PageSize);
  }
  DeleteEmpleado(IdEmpleado: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete(this.baseUrl + 'api/Empleado/' + IdEmpleado, httpOptions);
  }
  SaveEmpleado(Empleado: Empleado) {
    let body = JSON.stringify(Empleado);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + 'api/Empleado/' ,body, httpOptions);
  }
  UpdateEmpleado(Empleado: Empleado) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete(this.baseUrl + 'api/Empleado/' + Empleado, httpOptions);
  }
}
