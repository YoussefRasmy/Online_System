

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
  }

