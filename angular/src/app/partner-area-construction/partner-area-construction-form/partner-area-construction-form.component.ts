import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Construction } from 'src/app/_model/construction-model';
import { MaskedDate } from 'src/app/helpers/masked-date';
import { ConstructionService } from 'src/app/services/contruction.service';

@Component({
  selector: 'app-partner-construction-form',
  templateUrl: './partner-area-construction-form.component.html'
})
export class ConstructionFormComponent implements OnInit {
  form: any;
  submitted = false;
  dateMask = MaskedDate;
  public constructions: any[] = [];
  public construction: Construction = new Construction();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private constructionService: ConstructionService,
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['isEdit'] == '1') {
        this.construction.id = Number(params['id']);
      }
    });
    const description = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const address = new FormControl('');
    const details = new FormControl('');
    const name = new FormControl('');
    const initialDate = new FormControl('');
    const finalDate = new FormControl('');
    const phone = new FormControl('');


    this.form = new FormGroup({
      description: description,
      address: address,
      initialDate: initialDate,
      finalDate: finalDate,
      details: details,
      name: name,
      phone: phone,
    });

 this.load();
    }

    load() {
      if (this.construction.id) {
        this.constructionService.getById(this.construction.id).subscribe(result => {
          this.construction = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      this.construction.description = this.form.controls.description.value;
      this.construction.name = this.form.controls.name.value;
      this.construction.address = this.form.controls.address.value;
      this.construction.details = this.form.controls.details.value;
      this.construction.phone = this.form.controls.phone.value;
      this.construction.initialDate = new Date(this.form.controls.initialDate.value.year,
        this.form.controls.initialDate.value.month - 1,
        this.form.controls.initialDate.value.day, 0, 0, 0, 0);
        this.construction.finalDate = new Date(this.form.controls.finalDate.value.year,
          this.form.controls.finalDate.value.month - 1,
          this.form.controls.finalDate.value.day, 0, 0, 0, 0);
        this.constructionService.save(this.construction).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/partner-area-construction']);
    });
    }

    onCancel() {
      this.router.navigate([`/partner-area-construction`]);
    }

    loadControls() {
      this.form.controls.description.setValue(this.construction.description);
      this.form.controls.name.setValue(this.construction.name);
      this.form.controls.address.setValue(this.construction.address);
      this.form.controls.details.setValue(this.construction.details);
      this.form.controls.phone.setValue(this.construction.phone);

      let dtInitial = new Date(this.construction.initialDate!);
      let ngbDateInitial = new NgbDate(dtInitial.getFullYear(), dtInitial.getMonth() + 1, dtInitial.getDate());
      this.form.controls.initialDate.setValue(ngbDateInitial);
  
      let dtFinal = new Date(this.construction.finalDate!);
      let ngbDateFinal = new NgbDate(dtFinal.getFullYear(), dtFinal.getMonth() + 1, dtFinal.getDate());

      this.form.controls.finalDate.setValue(ngbDateFinal);

    }

    onOpenCalendar(container: any) {
      container.monthSelectHandler = (event: any): void => {
        container._store.dispatch(container._actions.select(event.date));
      };
      container.setViewMode('month');
    }
  

}

