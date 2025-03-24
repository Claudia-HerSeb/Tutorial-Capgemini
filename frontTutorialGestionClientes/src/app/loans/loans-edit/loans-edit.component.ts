import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoansService } from '../loans.service';
import { Loans } from '../model/Loans';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientService } from '../../Client/client.service';
import { GameService } from '../../game/game.service';
import { CommonModule } from '@angular/common';
import { Pageable } from '../../core/model/page/Pageable';
import { SortPage  } from '../../core/model/page/SortPage';

@Component({
  selector: 'app-loans-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
  ],
  templateUrl: './loans-edit.component.html',
  styleUrls: ['./loans-edit.component.scss'],
})
export class LoansEditComponent implements OnInit {
  // Variable para almacenar los datos del préstamo
  loan: Loans;
  // Listas de clientes y juegos
  clients = [];
  games = [];

  // Inyección de dependencias
  constructor(
    public dialogRef: MatDialogRef<LoansEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loansService: LoansService,
    private clientService: ClientService,
    private gameService: GameService
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loan = this.data.loan ? { ...this.data.loan } : { id: 0, clientName: '', gameTitle: '', startDate: '', endDate: '' };

    // Cargar clientes y asignar el cliente del préstamo si existe
    this.clientService.getClient().subscribe((clients) => {
      this.clients = Array.isArray(clients) ? clients : [];
      if (this.loan.clientName) {
        const client = this.clients.find(client => client.name === this.loan.clientName);
        if (client) {
          this.loan.clientName = client.name;
        }
      }
    });

    // Cargar juegos y asignar el juego del préstamo si existe
    this.gameService.getGames().subscribe((games) => {
      this.games = Array.isArray(games) ? games : [];
      if (this.loan.gameTitle) {
        const game = this.games.find(game => game.title === this.loan.gameTitle);
        if (game) {
          this.loan.gameTitle = game.title;
        }
      }
    });
  }

  // Método para guardar los datos del préstamo
  onSave() {
    const startDate = new Date(this.loan.startDate);
    const endDate = new Date(this.loan.endDate);
  
    // Validación 1: La fecha de fin no puede ser anterior a la fecha de inicio
    if (endDate < startDate) {
      alert('La fecha de fin no puede ser anterior a la fecha de inicio.');
      return;
    }
  
    // Validación 2: El periodo de préstamo máximo solo podrá ser de 14 días
    const maxLoanPeriod = 14 * 24 * 60 * 60 * 1000; // 14 días en milisegundos
    if (endDate.getTime() - startDate.getTime() > maxLoanPeriod) {
      alert('El periodo de préstamo máximo es de 14 días.');
      return;
    }
  
    // Crear un objeto SortPage
    const sort: SortPage[] = [{ property: 'startDate', direction: 'asc' }];
  
    // Crear un objeto Pageable para la llamada al servicio
    const pageable: Pageable = { pageNumber: 0, pageSize: 10, sort: sort };
  
    // Validación 3: El mismo juego no puede estar prestado a dos clientes distintos en un mismo día
    this.loansService.getLoans(pageable).subscribe((loansPage) => {
      const superposedLoans = loansPage.content.filter((loan) => {
        const loanStartDate = new Date(loan.startDate);
        const loanEndDate = new Date(loan.endDate);
        return (
          loan.gameTitle === this.loan.gameTitle &&
          ((startDate >= loanStartDate && startDate <= loanEndDate) ||
            (endDate >= loanStartDate && endDate <= loanEndDate) ||
            (startDate <= loanStartDate && endDate >= loanEndDate))
        );
      });
  
      if (superposedLoans.length > 0) {
        alert('El mismo juego no puede estar prestado a dos clientes distintos en un mismo día.');
        return;
      }
  
      // Validación 4: Un mismo cliente no puede tener prestados más de 2 juegos en un mismo día
      const clientLoans = loansPage.content.filter((loan) => {
        const loanStartDate = new Date(loan.startDate);
        const loanEndDate = new Date(loan.endDate);
        return (
          loan.clientName === this.loan.clientName &&
          ((startDate >= loanStartDate && startDate <= loanEndDate) ||
            (endDate >= loanStartDate && endDate <= loanEndDate) ||
            (startDate <= loanStartDate && endDate >= loanEndDate))
        );
      });
  
      if (clientLoans.length >= 2) {
        alert('Un mismo cliente no puede tener prestados más de 2 juegos en un mismo día.');
        return;
      }
  
      // Si todas las validaciones pasan, guardar el préstamo
      this.loansService.saveLoan(this.loan).subscribe(() => {
        this.dialogRef.close();
      });
    });
  }

  // Método para cerrar el diálogo sin guardar
  onClose() {
    this.dialogRef.close();
  }
}
