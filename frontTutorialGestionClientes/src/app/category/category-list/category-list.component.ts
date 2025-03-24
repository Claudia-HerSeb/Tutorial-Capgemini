import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../model/Category';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
    // Fuente de datos para la tabla
    dataSource = new MatTableDataSource<Category>();
    // Columnas que se mostrarán en la tabla
    displayedColumns: string[] = ['id', 'name', 'action'];

    // Inyección de dependencias
    constructor(
        private categoryService: CategoryService,
        public dialog: MatDialog,
    ) { }

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
        // Cargar las categorías al inicializar el componente
        this.categoryService.getCategories().subscribe(
            categories => this.dataSource.data = categories
        );
    }

    // Método para crear una nueva categoría
    createCategory() {    
        const dialogRef = this.dialog.open(CategoryEditComponent, {
            data: {}
        });
    
        // Recargar la lista de categorías después de cerrar el diálogo
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });    
    }  

    // Método para editar una categoría existente
    editCategory(category: Category) {
        const dialogRef = this.dialog.open(CategoryEditComponent, {
            data: { category }
        });
    
        // Recargar la lista de categorías después de cerrar el diálogo
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    // Método para eliminar una categoría
    deleteCategory(category: Category) {    
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: { 
                title: "Eliminar categoría", 
                description: "Atención si borra la categoría se perderán sus datos.<br> ¿Desea eliminar la categoría?" 
            }
        });
  
        // Eliminar la categoría si se confirma la acción
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.categoryService.deleteCategory(category.id).subscribe(result => {
                    this.ngOnInit();
                }); 
            }
        });
    }  
}
