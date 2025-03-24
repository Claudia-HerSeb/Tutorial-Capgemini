import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthorEditComponent } from '../author-edit/author-edit.component';
import { AuthorService } from '../author.service';
import { Author } from '../model/Author';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-author-list',
    standalone: true,
    imports: [
        MatButtonModule, 
        MatIconModule, 
        MatTableModule, 
        MatPaginatorModule, 
        CommonModule
    ],
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
    // Variables para la paginación
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    // Fuente de datos para la tabla
    dataSource = new MatTableDataSource<Author>();
    displayedColumns: string[] = ['id', 'name', 'nationality', 'action'];

    // Inyección de dependencias
    constructor(private authorService: AuthorService, public dialog: MatDialog) {}

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
        this.loadPage();
    }

    // Método para cargar la página de autores
    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };
    
        // Actualizar la paginación si hay un evento
        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }
    
        // Llamada al servicio para obtener los autores
        this.authorService.getAuthors(pageable).subscribe(
            (data) => {
                this.dataSource.data = data.content;
                this.pageNumber = data.pageable.pageNumber;
                this.pageSize = data.pageable.pageSize;
                this.totalElements = data.totalElements;
            },
            (error) => {
                console.error('Error loading authors:', error);
                alert('Error loading authors: ' + error.message);
            }
        );
    }

    // Método para crear un nuevo autor
    createAuthor() {
        const dialogRef = this.dialog.open(AuthorEditComponent, {
            data: {},
        });

        // Recargar la página después de cerrar el diálogo
        dialogRef.afterClosed().subscribe((result) => {
            this.loadPage();
        });
    }

    // Método para editar un autor existente
    editAuthor(author: Author) {
        const dialogRef = this.dialog.open(AuthorEditComponent, {
            data: { author: author },
        });

        // Recargar la página después de cerrar el diálogo
        dialogRef.afterClosed().subscribe((result) => {
            this.loadPage();
        });
    }

    // Método para eliminar un autor
    deleteAuthor(author: Author) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar autor',
                description:
                    'Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?',
            },
        });

        // Eliminar el autor si se confirma la acción
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.authorService.deleteAuthor(author.id).subscribe((result) => {
                    this.loadPage();
                });
            }
        });
    }
}
