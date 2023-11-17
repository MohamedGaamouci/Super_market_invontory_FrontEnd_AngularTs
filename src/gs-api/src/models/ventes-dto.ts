/* tslint:disable */
import { LigneVenteDto } from './ligne-vente-dto';
export interface VentesDto {
  id?: number;
  code?: string;
  total?: number;
  dateVente?: string;
  commentaire?: string;
  ligneVentes?: Array<LigneVenteDto>;
  idEntreprise?: number;
}
