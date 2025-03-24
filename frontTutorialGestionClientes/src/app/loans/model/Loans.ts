import { Client } from "src/app/Client/model/Client";
import { Game } from "src/app/game/model/Game";

// export class Loans {
//     id: number;
//     client: Client;
//     game: Game;
//     startDate: Date;
//     endDate: Date;
// }

export interface Loans {
    id: number;
    clientName: string;
    gameTitle: string;
    startDate: string;
    endDate: string;
  }