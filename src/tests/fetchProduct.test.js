import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof (fetchProduct)).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

   it('fetchProduct com o argumento MLB1405519561 é uma estrutura igual ao objeto product', async () => {
    await expect(fetchProduct('MLB1405519561')).resolves.toEqual(product);
   });

   it('fetchProduct sem argumento, retorna um erro com a mensagem: ID não informado', async () => {
    await expect(fetchProduct()).rejects.toThrow(new Error('ID não informado'));
   })
});
