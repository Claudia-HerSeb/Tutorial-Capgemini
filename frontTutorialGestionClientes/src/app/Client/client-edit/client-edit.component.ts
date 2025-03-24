import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-client-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './client-edit.component.html',
    styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
    // Variable para almacenar los datos del cliente
    client: Client;

    // Inyección de dependencias
    constructor(
        public dialogRef: MatDialogRef<ClientEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {client: Client},
        private clientService: ClientService
    ) {}

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
        // Inicializa client con los datos inyectados o una nueva instancia
        this.client = this.data.client || new Client();
    }

    // Método para guardar los datos del cliente
    onSave() {
        this.clientService.saveClient(this.client).subscribe(() => {
            // Cerrar el diálogo después de guardar
            this.dialogRef.close();
        });
    }

    // Método para cerrar el diálogo sin guardar
    onClose() {
        this.dialogRef.close();
    }
}