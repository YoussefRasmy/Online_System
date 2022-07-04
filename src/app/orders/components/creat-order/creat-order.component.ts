import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/service/shared.service';
import { OrderCradential, OrderService } from '../../service/order.service';
@Component({
  selector: 'app-creat-order',
  templateUrl: './creat-order.component.html',
  styleUrls: ['./creat-order.component.scss']
})
export class CreatOrderComponent implements OnInit {

  constructor(private service:OrderService,private dialogRef:MatDialogRef<CreatOrderComponent>,private sharedService:SharedService) { }

  ngOnInit(): void {
  }




  onOrderSubmit(form:NgForm){
    console.log({logIn:form.value});
    if(!form.valid){
      return;
    }
    let model:OrderCradential =
      {

        deliveryAddress:form.value.address,
        deliverDate:form.value.date,
        paymentMethod:form.value.paymentMethod
      }
//console.log(model);
      this.sharedService.setOrderDate(model)
      //this.service.SendOrder(model).subscribe()
      this.onClose(form)
  }



  onClose(form:NgForm){
    form.reset();
    this.dialogRef.close();
  }


}
