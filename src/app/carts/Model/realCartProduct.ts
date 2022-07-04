



export interface RealCartProduct{


    _Product: {
      id: number,
      englishName: string,
      imagePath: string,
      arabicName: string,
      category: {
        id: number,
        name: string
      },
      vendor: {
        id: number,
        name: string
      },
      description: string,
      quantity: number,
      price: number
    },
    quantity: number

// ,

//   Quantity:number
//   ,
//   item:{

//     arabicName: string
//     category: {id: number, name: string}
//     description: string
//     englishName: string
//     id: number
//     imagePath: string
//     price: number
//     quantity: number
//     vendor: {id: number, name: string}

//   }




}












