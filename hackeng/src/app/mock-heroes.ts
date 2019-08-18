import { Hero } from './hero';
import { Pedido } from './pedidos';

export const pedidos: Pedido[] = [
    {
      id: "11",
      status: "route",
      name: "pedido1",
      produto: {
          id: "456",
          qtd: 10
      },
      chegada: "01/01/01",
      cliente: "client1",
      viagem: "viagem1"
    },

  {
    id: "234",
    status: "route",
    name: "pedido1",
    produto: {
        id: "456",
        qtd: 10
    },
    chegada: "01/01/01",
    cliente: "client1",
    viagem: "viagem1"
  } ,

  {
    id: "444",
    status: "concluded",
    name: "pedido1",
    produto: {
        id: "456",
        qtd: 10
    },
    chegada: "01/01/01",
    cliente: "client1",
    viagem: "viagem1"
  }  
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
