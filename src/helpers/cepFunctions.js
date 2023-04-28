const cartAdress = document.querySelector('.cart__address');
const input = document.querySelector('.cep-input');

export const getAddress = async (CEP) => {
  const apis = [
    (await fetch(`<https://cep.awesomeapi.com.br/json/${CEP}>`)).json,
    (await fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}>`)).json,
  ];
  const data = await Promise.any(apis);
  return data;
};

export const searchCep = async () => {
  const cep = getAddress(input.value);
  if (cep.distric) {
    cartAdress.innerHTML = `${cep.address}-${cep.district}-${cep.city}-${cep.state}`;
  } else if (cep.neighborhood) {
    cartAdress.innerHTML = `${cep.street}-${cep.neighborhood}-${cep.city}-${cep.state}`;
  } else {
    cartAdress.innerHTML = 'CEP não encontrado';
  }
};
