import { Hero } from './hero';
import { Pedido, Order } from './pedidos';

export const pedidos: Order[] = [
    {
      id: "11",
      status: "In Transit",
      products: [{
        productid: "234",
        qtd: 10
      },{
        productid: "456",
        qtd: 5
      }],
      arrival: "01/01/01",
    },

  {
    id: "234",
      status: "In Transit",
      products: [{
        productid: "345",
        qtd: 10
      }],
      arrival: "01/01/01",
  } ,

  {
    id: "543",
      status: "Delivered",
      products: [{
        productid: "345",
        qtd: 10
      }],
      arrival: "01/01/01",
  } ,
];

export const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
