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

  pageSize:number = 5;
  pageNum:number = 1;
  orders!:Order[];
  loading = false;
  ngOnInit(): void {
    this.GetAll()


  }


  HandlePage(pageNum:number){

    this.pageNum = pageNum;

   // this.getPagenation();

  }

  GetAll(){
    this.loading = true
    this.service.GetAllUserOrders().subscribe((res:Order[])=>{
      this.orders = res;
      this.loading = false
    })
  }

}
