import { Component, OnInit, TemplateRef, Output, EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from '../_model/subscription-model';
import { SubscriptionService } from '../services/subscription.service';
import { Establishment } from '../_model/establishment-model';
import { EstablishmentService } from '../services/establishment.service';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-master-area-subscription',
  templateUrl: './master-area-subscription.component.html'
})

export class MasterAreaSubscriptionComponent implements OnInit {
  modalRef: BsModalRef | undefined;
  form: any;
  public lst: any[] = [];
  establishment: any;
  public subscription: Subscription = new Subscription();
  public lstEstablishment: Establishment[] = [];
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 10;
  public modalDelete: BsModalRef = new BsModalRef();

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private subscriptionService: SubscriptionService,
    private establishmentService: EstablishmentService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const establishment = new FormControl('');
  
    this.form = new FormGroup({
      establishment: establishment,
    });
  let filter = new FilterDefaultModel();
      this.establishmentService.getByFilter(filter).subscribe(result => {
      this.lstEstablishment = result;
  })
  this.onSubmit();
  }

  onSubmit() {
    const filter: Subscription = new Subscription();
    if (this.form.controls.establishment.value) {
      filter.establishmentId = Number(this.form.controls.establishment.value);
   }
   this.subscriptionService.getByFilter(filter).subscribe(result => {
    this.lst = result;
   });

}

  onNew() {
    this.router.navigate([`/master-area-subscription/0/0`]);
  }

  onReset() {
    this.form.reset();
  }
    
  closeDelete() {
    this.modalDelete.hide();
    }

    confirmDelete() {
      let filter = new FilterDefaultModel();
      filter.id = this.subscription.id;
      this.subscriptionService.deleteById(filter).subscribe(() => {
        const index: number = this.lst.indexOf(this.subscription);
        if (index !== -1) {
          this.lst.splice(index, 1);
        }
        this.closeDelete();
        this.toastr.success('Excluído com sucesso!', '');
      });
    }
  
    deleteById(template: TemplateRef<any>, item: Subscription) {
      this.subscription = item;
      this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
    }

    getDueDate(subscription: Subscription) {
      let returnDate = new Date(subscription.subscriptionDate!);
      if (subscription.plan!.qtdMonth! === 0) {
        returnDate.setDate(returnDate.getDate() + 15);
      } else {
        returnDate.setMonth((returnDate.getMonth()+subscription.plan!.qtdMonth!))
        returnDate.setDate(returnDate.getDate() + subscription.tolerance!);
      }
      return returnDate;
    }

}
