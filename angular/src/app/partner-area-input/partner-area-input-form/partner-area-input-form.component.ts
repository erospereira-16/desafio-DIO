import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Input } from 'src/app/_model/input-model';
import { UnitOfMeasurement } from 'src/app/_model/unit-of-measurement-model';
import { InputService } from 'src/app/services/input.service';
import { UnitOfMeasurementService } from 'src/app/services/unit-of-measurement.service';

@Component({
  selector: 'app-partner-input-form',
  templateUrl: './partner-area-input-form.component.html'
})
export class InputFormComponent implements OnInit {
  form: any;
  submitted = false;
  public unitOfMeasurements: any[] = [];
  public input: Input = new Input();
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private inputService: InputService,
    private unitOfMeasurementService: UnitOfMeasurementService
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['isEdit'] == '1') {
        this.input.id = Number(params['id']);
      }
    });
    const description = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    const unitOfMeasurementId = new FormControl('', Validators.compose([
      Validators.required,
    ]));

    this.form = new FormGroup({
      description: description,
      unitOfMeasurementId: unitOfMeasurementId,
    });
    let filterUnitOfMeasurement = new UnitOfMeasurement();

    this.unitOfMeasurementService.getByFilter(filterUnitOfMeasurement).subscribe(result => {
      this.unitOfMeasurements = result;
    })

 this.load();
    }

    load() {
      if (this.input.id) {
        this.inputService.getById(this.input.id).subscribe(result => {
          this.input = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      this.input.description = this.form.controls.description.value;
      this.input.unitOfMeasurementId = Number(this.form.controls.unitOfMeasurementId.value);
      this.inputService.save(this.input).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/partner-area-input']);
    });
    }

    onCancel() {
      this.router.navigate([`/partner-area-input`]);
    }

    loadControls() {
      this.form.controls.description.setValue(this.input.description);
      this.form.controls.unitOfMeasurementId.setValue(this.input.unitOfMeasurementId);
    }

}

