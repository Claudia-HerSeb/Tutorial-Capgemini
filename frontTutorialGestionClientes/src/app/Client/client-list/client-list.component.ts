import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../model/Client';
import { ClientService } from '../client.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
    selector: 'app-Client-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './client-list.component.html',
    styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit{

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<Client>();

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'name', 'action'];

  // Inyección de dependencias
  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
  ) { }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Cargar los clientes al inicializar el componente
    this.clientService.getClient().subscribe(
      Client => this.dataSource.data = Client
    );
  }

  // Método para crear un nuevo cliente
  createClient() {    
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {}
    });

    // Recargar la lista de clientes después de cerrar el diálogo
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });    
  }  

  // Recargar la lista de clientes después de cerrar el diálogo
  editClient(client: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: { client }
    });

    // Recargar la lista de clientes después de cerrar el diálogo
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  // Método para eliminar un cliente
  deleteClient(client: Client) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar el cliente?" }
    });

    // Eliminar el cliente si se confirma la acción
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClients(client.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  }  
}