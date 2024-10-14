import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompositionInputComposition } from 'src/app/_model/composition-input-composition-model';
import { Composition } from 'src/app/_model/composition-model';
import { UnitOfMeasurement } from 'src/app/_model/unit-of-measurement-model';
import { CompositionService } from 'src/app/services/composition.service';
import { UnitOfMeasurementService } from 'src/app/services/unit-of-measurement.service';

@Component({
  selector: 'app-partner-composition-form',
  templateUrl: './partner-area-composition-form.component.html'
})
export class CompositionFormComponent implements OnInit {
  form: any;
  submitted = false;
  lst: CompositionInputComposition[] = [];
  public isCheck = false;
  page = 1;
  pageSize = 5;
  public unitOfMeasurements: any[] = [];
  public composition: Composition = new Composition();
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private compositionService: CompositionService,
    private unitOfMeasurementService: UnitOfMeasurementService
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['isEdit'] == '1') {
        this.composition.id = Number(params['id']);
      }
    });
    const description = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const value = new FormControl('');
    const unitOfMeasurementId = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const type = new FormControl('', Validators.compose([
      Validators.required,
    ]));

    this.form = new FormGroup({
      description: description,
      value: value,
      unitOfMeasurementId: unitOfMeasurementId,
      type: type,
    });
    let filterUnitOfMeasurement = new UnitOfMeasurement();

    this.unitOfMeasurementService.getByFilter(filterUnitOfMeasurement).subscribe(result => {
      this.unitOfMeasurements = result;
    })

 this.load();
 this.form.controls.type.setValue('true')
    }

    load() {
      if (this.composition.id) {
        this.compositionService.getById(this.composition.id).subscribe(result => {
          this.composition = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      this.composition.description = this.form.controls.description.value;
      this.composition.value = Number(this.form.controls.value.value);
      this.composition.unitOfMeasurementId = Number(this.form.controls.unitOfMeasurementId.value);
      this.composition.type = this.form.controls.type.value === 'false' ? false : true;
      this.compositionService.save(this.composition).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/partner-area-composition']);
    });
    }

    onCancel() {
      this.router.navigate([`/partner-area-composition`]);
    }

    loadControls() {
      this.form.controls.description.setValue(this.composition.description);
      this.form.controls.value.setValue(this.composition.value);
      this.form.controls.unitOfMeasurementId.setValue(this.composition.unitOfMeasurementId);
      // if (this.form.controls.type === 'true') {
      //   this.isCheck = true;
      //   this.form.controls.type.setValue(composition.type);
      // }  
    }

    handleChange(evt: any) {
      if (evt.target.checked) {
        if (evt.target.id === 'checkYes') {
          this.isCheck = false;
          this.form.controls.type.setValidators([Validators.required, Validators.minLength(1)]);
        }
        if (evt.target.id === 'checkNo') {
          this.isCheck = true;
          this.form.controls.type.clearValidators();
          this.form.controls.type.updateValueAndValidity();
        }
      }
    }

    isAnalytic() {
      return this.isCheck;
    }
  

}

