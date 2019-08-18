export class Pedido {
    id: string;
    status: string;
    name: string;
    produto: {
        id: string;
        qtd: number;
    }
    chegada: string;
    cliente: string;
    viagem: string;
  }
  