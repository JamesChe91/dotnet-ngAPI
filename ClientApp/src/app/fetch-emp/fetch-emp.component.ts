import { Component, OnInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-fetch-emp',
  templateUrl: './fetch-emp.component.html',
  styleUrls: ['./fetch-emp.component.css']
})
export class FetchEmpComponent implements OnInit {
  public empleados: Empleado[];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Empleado[]>(baseUrl + 'api/Empleado').subscribe(result => {
      console.log(result);
      this.empleados = result;
    }, error => console.error(error));
  }
  ngOnInit() {
  }

}
interface Empleado {
  EMPLEADO: string;
  NOMBRE: string;
  APELLIDO: string;
  DOCTO_IDENT: string;
  ESTADO: string;
}
