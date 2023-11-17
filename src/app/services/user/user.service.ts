import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../gs-api/src/services/authentication.service';
import { AuthenticationRequest } from '../../../gs-api/src/models/authentication-request';
import { Observable, of } from 'rxjs';
import { AuthenticationResponse } from '../../../gs-api/src/models/authentication-response';
import { Router } from '@angular/router';
import { UtilisateursService } from '../../../gs-api/src/services/utilisateurs.service';
import { UtilisateurDto } from '../../../gs-api/src/models/utilisateur-dto';
import { ChangerMotDePasseUtilisateurDto } from '../../../gs-api/src/models/changer-mot-de-passe-utilisateur-dto';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { VentesService } from 'src/gs-api/src/services';
import { PhotosService } from '../../../gs-api/src/services/photos.service';
import SavePhotoParams = PhotosService.SavePhotoParams;




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authenticationService: AuthenticationService,
    private utilisateurService: UtilisateursService,
    private router: Router,
    private http: HttpClient,
    private Vente: VentesService,
    private photoService: PhotosService,
  ) { }


  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.authenticationService.authenticate(authenticationRequest);
  }

  getUserByEmail(email?: string): Observable<UtilisateurDto> {
    if (email !== undefined) {
      return this.utilisateurService.findByEmail(email);
    }
    return of();
  }

  setAccessToken(authenticationResponse: AuthenticationResponse): void {
    localStorage.setItem('accessToken', JSON.stringify(authenticationResponse));
  }

  setConnectedUser(utilisateur: UtilisateurDto): void {
    localStorage.setItem('connectedUser', JSON.stringify(utilisateur));
  }

  getConnectedUser(): UtilisateurDto {
    if (localStorage.getItem('connectedUser')) {
      return JSON.parse(localStorage.getItem('connectedUser') as string);
    }
    return {};
  }

  changerMotDePasse(changerMotDePasseDto: ChangerMotDePasseUtilisateurDto): Observable<ChangerMotDePasseUtilisateurDto> {
    return this.utilisateurService.changerMotDePasse(changerMotDePasseDto);
  }

  getData(http: HttpClient): any {
    http.get('http://localhost:8081/gestiondestock/v1/articles/all', { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          return true;
        } else if (response.status === 403) {
          return false;
        } else {
          return false;
        }
      },
      (error) => {
        localStorage.clear();
        return false;
      }
    );
  }


  // TODO
  isUserLoggedAndAccessTokenValid(): boolean {
    if (localStorage.getItem('accessToken')) {
      // TODO il faut verifier si le access token est valid
      let verify: any;
      verify = this.getData(this.http);
      if (verify === true) {

        return true;
      }


      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  getall() {
    return this.utilisateurService.findAll();
  }

  async enregistrerUtilisateur(utilisateurDto: UtilisateurDto, file?: File | null) {

    if (typeof utilisateurDto === 'object' && utilisateurDto !== null) {
      await this.utilisateurService.saveResponse(utilisateurDto).subscribe(
        response => this.savePhoto(response.body.id, response.body.nom, file),
        error => alert(JSON.stringify(error))
      );
    } else {
      alert('myData is not JSON');
    }

  }

  deleteUser(id: number) {
    if (id) {
      this.utilisateurService.delete(id).subscribe(
        response => {
          console.log(response),
          this.router.navigate(['utilisateurs'])
        },
        error => alert(JSON.stringify(error))
      );
    } else {
      alert("the user id is missing")
    }
  }

  findAllVente() {
    return this.Vente.findAllResponse();
  }

  savePhoto(iduser?: number, titre?: string, file?: File | null): void {

    if (iduser && titre && file) {
      const params: SavePhotoParams = {
        id: iduser,
        file: file,
        title: titre,
        context: 'utilisateur'
      };
      this.photoService.savePhoto(params)
        .subscribe(res => {
          // this.router.navigate(['utilisateurs']);
        });
    } else {
      // this.router.navigate(['utilisateurs']);
    }
  }







}
