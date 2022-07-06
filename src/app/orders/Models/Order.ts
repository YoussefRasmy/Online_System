export interface Order

{
  id:number,
  orderNum: number,
  deliveryAddress: string,
  totalPrice: number,
  _PaymentMethod: number,
  products: [
    {
      productId: number,
      quantity: number,
      productName: string,
      price: number,
      imagePath: string
    }
  ]
}
