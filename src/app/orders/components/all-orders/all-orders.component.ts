import { Component, OnInit } from '@angular/core';
import { Order } from '../../Models/Order';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  constructor(private service:OrderService) { }

  orders!:Order[];
  ngOnInit(): void {

    this.service.GetAllUserOrders().subscribe((res:Order[])=>{
      this.orders = res;
    })

  }

}
