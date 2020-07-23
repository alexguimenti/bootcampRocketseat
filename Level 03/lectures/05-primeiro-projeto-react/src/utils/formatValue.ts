const formatValue = (value: string | number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    Number(value),
  ); // TODO

export default formatValue;
