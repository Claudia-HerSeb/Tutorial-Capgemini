import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Author } from './model/Author';
import { AuthorPage } from './model/AuthorPage';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthorService {
    private baseUrl = 'http://localhost:8080/author';

    constructor(private http: HttpClient) {}

    getAuthors(pageable: Pageable): Observable<AuthorPage> {
        return this.http.get<AuthorPage>(`${this.baseUrl}?page=${pageable.pageNumber}&size=${pageable.pageSize}&sort=${pageable.sort[0].property},${pageable.sort[0].direction}`).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error fetching authors:', error);
                return throwError(() => new Error('Error fetching authors'));
            })
        );
    }

    saveAuthor(author: Author): Observable<void> {
        const { id } = author;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<void>(url, author);
    }

    deleteAuthor(idAuthor: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
    }

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(this.baseUrl).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error fetching all authors:', error);
                return throwError(() => new Error('Error fetching all authors'));
            })
        );
    }
}