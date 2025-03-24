import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-category-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './category-edit.component.html',
    styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {
    // Variable para almacenar los datos de la categoría
    category: Category;

    // Inyección de dependencias
    constructor(
        public dialogRef: MatDialogRef<CategoryEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {category : Category},
        private categoryService: CategoryService
    ) {}

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
        // Si hay datos de la categoría, se clonan; si no, se crea un nuevo objeto Category
      this.category = this.data.category ? Object.assign({}, this.data.category) : new Category();
    }

    // Método para guardar los datos de la categoría
    onSave() {
        this.categoryService.saveCategory(this.category).subscribe(() => {
            //Cerrar el diálogo después de guardar
            this.dialogRef.close();
        });
    }

    // Método para cerrar el diálogo sin guardar
    onClose() {
        this.dialogRef.close();
    }
}