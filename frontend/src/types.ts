export interface Product {
    id : number ;
    title : String;
    price: number;
    category: string;
    inStock: boolean;
}

export const  Product : Product[] = [
     {
        id: 1,
        title: "Laptop",
        price: 50000,
        category: "Electronics",
        inStock: true
    },
    {
        id: 2,
        title: "Mouse",
        price: 500,
        category: "Accessories",
        inStock: false
    },
    {
        id: 3,
        title: "Keyboard",
        price: 1500,
        category: "Accessories",
        inStock: true
    }
];

