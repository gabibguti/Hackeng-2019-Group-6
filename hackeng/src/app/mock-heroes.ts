import { Hero } from './hero';
import { Pedido } from './pedidos';

export const pedidos: Pedido[] = [

  {
    id: "123",
    status: "route",
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
