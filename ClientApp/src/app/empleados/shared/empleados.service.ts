import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  // GetEmpleados() {
  //   this.http.get<Empleado[]>(this.baseUrl + 'api/Empleado').subscribe(result => {
  //     console.log(result);
  //     return result;

  //   }, error => console.error(error));
  // }
}
