import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UnitOfMeasurement } from 'src/app/_model/unit-of-measurement-model';
import { UnitOfMeasurementService } from 'src/app/services/unit-of-measurement.service';

@Component({
  selector: 'app-partner-area-unit-of-measurement-form',
  templateUrl: './partner-area-unit-of-measurement-form.component.html'
})
export class UnitOfMeasurementFormComponent implements OnInit {
  form: any;
  submitted = false;
  public unitOfMeasurement: UnitOfMeasurement = new UnitOfMeasurement();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private unitOfMeasurementService: UnitOfMeasurementService
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['isEdit'] == '1') {
        this.unitOfMeasurement.id = Number(params['id']);
      }
    });

    const description = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const establishmentId = new FormControl(0);


    this.form = new FormGroup({
      description: description,
      establishmentId: establishmentId,
    });
 this.load();
    }

    load() {
      if (this.unitOfMeasurement.id) {
        this.unitOfMeasurementService.getById(this.unitOfMeasurement.id).subscribe(result => {
          this.unitOfMeasurement = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      this.unitOfMeasurement.description = this.form.controls.description.value;
      this.unitOfMeasurementService.save(this.unitOfMeasurement).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/partner-area-unit-of-measurement']);
    });
    }

    onCancel() {
      this.router.navigate([`/partner-area-unit-of-measurement`]);
    }

    loadControls() {
      this.form.controls.description.setValue(this.unitOfMeasurement.description);
    }

}

