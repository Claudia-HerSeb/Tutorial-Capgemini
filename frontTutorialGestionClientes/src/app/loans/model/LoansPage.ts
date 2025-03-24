import { Pageable } from "src/app/core/model/page/Pageable";
import { Loans } from "./Loans";

export class LoansPage {
  content: Loans[];
  pageable: Pageable;
  totalElements: number;
}