// Converter status da API para label
export function getStatusLabel(st: number) {
  if (st === 1) {
    return 'Ativo';
  } else {
    return 'Inativo';
  }
}
