import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdresseDto, RolesDto, UtilisateurDto } from 'src/gs-api/src/models';
import { PhotosService } from '../../../../gs-api/src/services/photos.service';
import SavePhotoParams = PhotosService.SavePhotoParams;
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-nouvel-utilisateur',
  templateUrl: './nouvel-utilisateur.component.html',
  styleUrls: ['./nouvel-utilisateur.component.scss']
})
export class NouvelUtilisateurComponent implements OnInit {

  date: string | undefined
  add: AdresseDto = {
    "adresse1": "",
    "adresse2": "",
    "codePostale": "",
    "pays": "",
    "ville": ""
  }

  Emloyee: string = "Emloyee"
  userbd: UtilisateurDto = {
    "adresse": this.add,
    "dateDeNaissance": "",
    "email": "",
    "entreprise": {

      "id": 0

    },

    "moteDePasse": "USER",
    "nom": "",
    "photo": "",
    "prenom": "",
    "roles": [
      {
        "roleName": this.Emloyee
      }
    ]
  }



  value: number | undefined;
  errorMsg: Array<string> = [];
  file: File | null = null;
  imgUrl: string | ArrayBuffer = 'assets/product.png';

  constructor(
    private router: Router,
    private photoService: PhotosService,
    private utilisateurService: UserService

  ) { }

  isLoading = true
  localuser: UtilisateurDto = {}
  role: RolesDto = {}

  ngOnInit(): void {
    this.showall()
  }

  showall() {
    this.localuser = this.utilisateurService.getConnectedUser()
    if (this.localuser.roles != undefined) {
      this.role = this.localuser.roles[0]
      const R = this.role.roleName
      if (R == 'ADMIN') {
        this.isLoading = false

      }
      else {
        this.isLoading = true

      }

    }
  }


  confirm() {

    if (localStorage.getItem('connectedUser') && this.date) {
      this.date += "T00:28:04.910Z"
      this.userbd.dateDeNaissance = this.date

      const connectedUser = JSON.parse(localStorage.getItem('connectedUser') || '{}');
      const identreprise = connectedUser.entreprise.id;

      this.userbd.entreprise = {
        id: identreprise
      }
      this.enregistrer(this.userbd)
      // this.router.navigate(['utilisateurs']);
    }
    else {
      alert("fill necessary feild ")
    }


  }
  cancel(): void {
    this.router.navigate(['utilisateurs']);
  }


  enregistrer(utilisateurDto: UtilisateurDto): any {

    this.utilisateurService.enregistrerUtilisateur(utilisateurDto ,this.file)
    // this.savePhoto(56, "Gelab")

  }



  onFileInput(files: FileList | null): void {
    if (files) {

      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;

          }
        };
      }
    }
  }

}
