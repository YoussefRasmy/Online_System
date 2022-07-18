import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../Models/Order';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent implements OnInit {
  id!:any;
  data!:Order;
  loading:boolean=false;
  constructor(private route:ActivatedRoute, private service:OrderService) {
    this.id = this.route.snapshot.paramMap.get("id")

   }

  ngOnInit(): void {

    this.getOrder(this.id);

  }

  getOrder(id:number){
    this.loading = true
    this.service.GetOrderById(id).subscribe((res)=>{
      this.loading = false
      this.data= res;

      console.log(this.data);

    })
  }

}
