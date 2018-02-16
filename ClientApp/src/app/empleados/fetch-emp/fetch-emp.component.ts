import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadosService } from '../shared/empleados.service';
import { Empleado } from '../shared/empleados';

@Component({
  selector: 'app-fetch-emp',
  templateUrl: './fetch-emp.component.html',
  styleUrls: ['./fetch-emp.component.css']
})
export class FetchEmpComponent implements OnInit {
  public empleados: Empleado[];
  constructor(private EmpleadoSerivce: EmpleadosService, @Inject('BASE_URL') baseUrl: string) {

  }
  ngOnInit() {
    this.EmpleadoSerivce.GetEmpleados().subscribe(result => {
      this.empleados = result;
    }, error => console.error(error));
  }

  DeleteEmpleado(idEmpleado: string): void {
    this.EmpleadoSerivce.DeleteEmpleado(idEmpleado).subscribe(res => console.log(res));
  }


}
