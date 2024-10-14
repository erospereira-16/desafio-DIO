import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EstablishmentService } from '../../services/establishment.service';
import { Establishment } from '../../_model/establishment-model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-master-area-establishment-form',
  templateUrl: './master-area-establishment-form.component.html'
})

export class MasterAreaEstablishmentFormComponent implements OnInit {
  public currentUser: any;
  form: any;
  public files: any = [];
  public fileToUpload: any;
  modules: any[] = [];
  logo: any;
  public submitted = false;
  public establishment: Establishment = new Establishment();

  constructor(private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private establishmentService: EstablishmentService,
    private authenticationService: AuthenticationService,) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['isEdit'] == '1') {
        this.establishment.id = Number(params['id']);
      }
    });

    const name = new FormControl('', Validators.compose([
        Validators.required,
      ]));
  
      const address = new FormControl('');
      const description = new FormControl('');  
      const phone = new FormControl('');
      const cnpj = new FormControl('');
      const contactName = new FormControl('');
  
      this.form = new FormGroup({
        name: name,
        address: address,
        contactName: contactName,
        description: description,
        phone: phone,
        cnpj: cnpj,
      });
      this.loadForm();
  }

  loadForm() {
    if (this.establishment.id) {
      this.establishmentService.getById(this.establishment.id).subscribe(establishment => {
        if (establishment !== undefined) {
          this.establishment = establishment;
          this.loadObject(establishment);
        }
      });
    }
  }


  get f() { return this.form.controls; }

  loadObject(item: Establishment) {
    this.establishment = item;
    this.form.controls.name.setValue(item.name);
    this.form.controls.description.setValue(item.description);
    this.form.controls.address.setValue(item.address);
    this.form.controls.phone.setValue(item.phone);
    this.form.controls.cnpj.setValue(item.cnpj);
    this.form.controls.contactName.setValue(item.contactName);
    this.logo = environment.urlImagesEstablishment + item.imageName;
  }


  onCancel() {
    return this.router.navigate([`/master-area-establishment`]);
  }

  onSave() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
 
  this.establishment.name = this.form.controls.name.value;
  this.establishment.contactName = this.form.controls.contactName.value;
  this.establishment.description = this.form.controls.description.value;
  this.establishment.address = (this.form.controls.address.value);
  this.establishment.phone = (this.form.controls.phone.value);
  this.establishment.cnpj = (this.form.controls.cnpj.value);

   this.establishmentService.save(this.establishment).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      return this.router.navigate(['master-area-establishment']);
    });
  }
}

