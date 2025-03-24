import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoansService } from '../loans.service';
import { Loans } from '../model/Loans';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../game/game.service'; 
import { ClientService } from '../../Client/client.service';
import { Game } from '../../game/model/Game'; 
import { Client } from '../../Client/model/Client'; 
import { LoansEditComponent } from '../loans-edit/loans-edit.component';

@Component({
  selector: 'app-loans-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatDialogModule, 
    MatIconModule, 
    MatPaginatorModule,
    MatSelectModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    FormsModule
  ],
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss'],
})
export class LoansListComponent implements OnInit {
  // Variables para la paginación
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<Loans>();
  displayedColumns: string[] = ['id', 'clientName', 'gameTitle', 'startDate', 'endDate', 'actions'];

  // Listas de juegos y clientes
  games: Game[] = []; 
  clients: Client[] = []; 

  // Filtros para la búsqueda
  filterGame: string;
  filterClient: string;
  filterDate: Date;

  // Lista completa de préstamos
  allLoans: Loans[] = []; 

  // Inyección de dependencias
  constructor(
    private loansService: LoansService,
    private gameService: GameService, 
    private clientService: ClientService, 
    public dialog: MatDialog
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadInitialData();
    this.loadPage();
  }

  // Método para cargar datos iniciales (juegos y clientes)
  async loadInitialData() {
    try {
      [this.games, this.clients] = await Promise.all([
        this.gameService.getGames().toPromise(),
        this.clientService.getClient().toPromise()
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  }

  // Método para cargar la página de préstamos
  loadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{ property: 'id', direction: 'ASC' }],
    };
  
    if (event) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }
  
    this.loansService.getLoans(pageable, this.filterGame, this.filterClient, this.filterDate).subscribe(
      (data) => {
        this.allLoans = data.content;
        this.applyFilters();
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      },
      (error) => {
        console.error('Error loading loans:', error);
      }
    );
  }

  // Método para aplicar los filtros a la lista de préstamos
  applyFilters() {
    this.dataSource.data = this.allLoans.filter(loan => 
      (!this.filterGame || loan.gameTitle.includes(this.filterGame)) &&
      (!this.filterClient || loan.clientName.trim().toLowerCase().includes(this.filterClient.trim().toLowerCase())) &&
      (!this.filterDate || (new Date(loan.startDate) <= this.filterDate && new Date(loan.endDate) >= this.filterDate))
    );
  }

  // Método para limpiar los filtros de búsqueda
  onCleanFilter(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.filterDate = null;
    this.applyFilters();
  }

  // Método para buscar préstamos según los filtros aplicados
  onSearch(): void {
    this.applyFilters();
  }

  // Método para eliminar un préstamo
  deleteLoan(loan: Loans) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar préstamo',
        description: 'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loansService.deleteLoan(loan.id).subscribe(() => {
          this.loadPage();
        });
      }
    });
  }

  // Método para crear un nuevo préstamo
  createLoan() {
    const dialogRef = this.dialog.open(LoansEditComponent, {
      data: {},
    });
  
    dialogRef.afterClosed().subscribe(() => {
        this.loadPage();
    });
  }

  // Método para manejar el evento de paginación
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.loadPage();
  }
}
