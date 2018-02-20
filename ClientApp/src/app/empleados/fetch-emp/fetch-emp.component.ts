import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadosService } from '../shared/empleados.service';
import { Empleado } from '../shared/empleados';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-fetch-emp',
  templateUrl: './fetch-emp.component.html',
  styleUrls: ['./fetch-emp.component.css']
})
export class FetchEmpComponent implements OnInit {
  public empleados: Empleado[];
  datasource: Empleado[];
  totalRecords: number;
  cols: any[];
  loading: boolean;
  constructor(private EmpleadoSerivce: EmpleadosService, @Inject('BASE_URL') baseUrl: string) {
 
  }
  ngOnInit() {
    this.GetEmpleados();
    this.cols = [
      { field: 'EMPLEADO', header: 'Código' },
      { field: 'NOMBRE', header: 'Nombre' },
      { field: 'APELLIDO', header: 'Apellido' },
      { field: 'DOCTO_IDENT', header: 'Documento' }
  ];
  this.loading = true;
  }

  GetEmpleados(): void {
    this.EmpleadoSerivce.GetEmpleados().subscribe(result => {
      this.empleados=result;
      this.datasource = result;
      this.totalRecords = this.datasource.length;
    }, error => console.error(error));
  }
  DeleteEmpleado(idEmpleado: string): void {
    this.EmpleadoSerivce.DeleteEmpleado(idEmpleado).subscribe(res => { this.GetEmpleados() });
  }
  loadEmpleadosLazy(event: LazyLoadEvent) {
    this.loading = true;
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      if (this.datasource) {
        this.empleados = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }
}
