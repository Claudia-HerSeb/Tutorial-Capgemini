import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../author.service';
import { Author } from '../model/Author';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-author-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './author-edit.component.html',
    styleUrl: './author-edit.component.scss',
})
export class AuthorEditComponent implements OnInit {
    author: Author;

    constructor(
        public dialogRef: MatDialogRef<AuthorEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authorService: AuthorService
    ) {}

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
        // Si hay datos del autor, se clonan; si no, se crea un nuevo objeto Author
        this.author = this.data.author ? Object.assign({}, this.data.author) : new Author();
    }

    // Método para guardar los datos del autor
    onSave() {
        this.authorService.saveAuthor(this.author).subscribe(() => {
            // Cerrar el diálogo después de guardar
            this.dialogRef.close();
        });
    }

    // Método para cerrar el diálogo sin guardar
    onClose() {
        this.dialogRef.close();
    }
}