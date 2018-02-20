import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadosService } from '../shared/empleados.service';
import { Empleado } from '../shared/empleados';
import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';

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
  displayDialog: boolean;
  selectedEmpleado: Empleado;
  newEmpleado: boolean;
  empleado: Empleado = {};
  EstadosEMP: SelectItem[];
  EstadoSeleccioadoEMP: EstadoEMP;
  constructor(private EmpleadoSerivce: EmpleadosService, @Inject('BASE_URL') baseUrl: string) {

  }
  ngOnInit() {
    this.GetEmpleados();
    this.cols = [
      { field: 'EMPLEADO', header: 'Código', itemClass: '' },
      { field: 'NOMBRE', header: 'Nombre', itemClass: '' },
      { field: 'APELLIDO', header: 'Apellido', itemClass: '' },
      { field: 'F_NACE', header: 'F. Nacimiento (dd/mm/yyyy)', itemClass: 'centerText' },
      { field: 'DOCTO_IDENT', header: 'Documento', itemClass: '' },
      { field: 'ESTADO', header: 'Estado', itemClass: '' }
    ];
    this.loading = true;
    this.EstadosEMP = [
      { label: 'Activo', value: '' },
      { label: 'Retirado', value: 'R' }
    ];
    
  }

  GetEmpleados(): void {
    this.EmpleadoSerivce.GetEmpleados().subscribe(result => {
      this.empleados = result;
      this.datasource = result;
      this.totalRecords = this.datasource.length;
    }, error => console.error(error));
  }

  sFecha(sFecha: string): string {    
    var splitted = sFecha.split("/", 3);
    return splitted[2] + splitted[1] + splitted[0];
  }

  DeleteEmpleado(idEmpleado: string): void {
    this.EmpleadoSerivce.DeleteEmpleado(idEmpleado).subscribe(res => { this.GetEmpleados() });
  }
  SaveEmpleado(Empleado: Empleado): void {
    this.EmpleadoSerivce.SaveEmpleado(Empleado).subscribe(res => { console.log(res); this.GetEmpleados() });
  }
  UpdateEmpleado(Empleado: Empleado): void {
    this.EmpleadoSerivce.UpdateEmpleado(Empleado).subscribe(res => { this.GetEmpleados() });
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
  showDialogToAdd() {
    this.newEmpleado = true;
    this.empleado = {};
    this.displayDialog = true;
  }

  save() {
    let empleados = [...this.empleados];
    this.empleado.F_NACE=this.sFecha(this.empleado.F_NACE);
    if (this.newEmpleado)
      // empleados.push(this.empleado);
      this.SaveEmpleado(this.empleado);
    else
      empleados[this.empleados.indexOf(this.selectedEmpleado)] = this.empleado;
    this.empleados = empleados;
    this.empleado = null;
    this.displayDialog = false;
  }

  delete() {
    this.DeleteEmpleado(this.selectedEmpleado.EMPLEADO);
    // let index = this.empleados.indexOf(this.selectedEmpleado);
    // this.empleados = this.empleados.filter((val, i) => i != index);
    this.empleado = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newEmpleado = false;
    this.empleado = this.cloneEmpleado(event.data);
    this.displayDialog = true;
  }

  cloneEmpleado(c: Empleado): Empleado {
    let empleado = {};
    for (let prop in c) {
      empleado[prop] = c[prop];
    }
    return empleado;
  }
}
interface EstadoEMP {
  name: string;
  code: string;
}


