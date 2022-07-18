

export interface Product
  {
    id: Number,
    englishName: string,
    imagePath: string,
    arabicName: string,
    category: {
      id: Number,
      name: string
    },
    vendor: {
      id: Number,
      name: string
    },
    description: string,
    quantity: Number,
    price: Number
    /////// added new
    quantityInCart?:Number
  }

  export interface ProductToCreate{
    id?: Number,
    englishName: string,
    arabicName: string,
    category: number,
    vendor: number,
    description: string,
    photo: string,
    quantity: number,
    price: number
  }

