const cartAdress = document.querySelector('.cart__address');
const input = document.querySelector('.cep-input');

export const getAddress = async (CEP) => {
  const apis = [
    fetch(`https://cep.awesomeapi.com.br/json/${CEP}`),
    fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}`),
  ];
  const data = await Promise.any(apis);
  return data.json();
};

export const searchCep = async () => {
  try {
    const cep = await getAddress(input.value);
    if ('address' in cep) {
      const cep1 = `${cep.address} - ${cep.district} - ${cep.city} - ${cep.state}`;
      cartAdress.innerHTML = cep1;
    } else if ('neighborhood' in cep) {
      const cep2 = `${cep.street} - ${cep.neighborhood} - ${cep.city} - ${cep.state}`;
      cartAdress.innerHTML = cep2;
    }
  } catch {
    cartAdress.innerHTML = 'CEP não encontrado';
  }
};
