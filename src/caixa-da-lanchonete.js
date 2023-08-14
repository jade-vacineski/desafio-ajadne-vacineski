class CaixaDaLanchonete {
  cardapio = [
    { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
    { codigo: 'chantily', descricao: 'Chantily (extra do Café)', itemPrincipal: 'cafe', valor: 1.50 },
    { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
    { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
    { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', itemPrincipal: 'sanduiche', valor: 2.00 },
    { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
    { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
    { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
  ];

  formasPagamento = ['debito', 'credito', 'dinheiro'];

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasPagamento.includes(formaDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    let valorTotal = 0;
    const itensPrincipaisNoCarrinho = new Set();

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',');

      const item = this.cardapio.find((i) => i.codigo === codigo);

      if (!item) {
        return 'Item inválido!';
      }

      if (quantidade <= 0) {
        return 'Quantidade inválida!';
      }

      if (item.itemPrincipal) {
        if (!itensPrincipaisNoCarrinho.has(item.itemPrincipal)) {
          return 'Item extra não pode ser pedido sem o principal';
        }
      } else if (!codigo.startsWith('combo')) {
        itensPrincipaisNoCarrinho.add(codigo);
      }

      valorTotal += item.valor * quantidade;
    }

    if (formaDePagamento === 'dinheiro') {
      valorTotal *= 0.95; // Desconto de 5%
    } else if (formaDePagamento === 'credito') {
      valorTotal *= 1.03; // Acréscimo de 3%
    }

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
