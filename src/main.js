import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// ## 3. Crie uma listagem de produtos
// ## 4. Adicione um texto de `carregando` durante uma requisição à API
// ## 5. Exiba uma mensagem de erro caso algo dê errado na requisição à API

const products = document.querySelector('.products');
// cria carregamento
const startLoading = () => {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerHTML = 'Carregando...';
  products.appendChild(p);
};
// remove carregamento
const stopLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};
// cria erro
const createError = () => {
  const p = document.createElement('p');
  p.className = 'error';
  p.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  products.appendChild(p);
};

async function loadProducts() {
  startLoading();
  try {
    const list = await fetchProductsList('computador');
    list.forEach((element) => {
      const elements = createProductElement(element);
      products.appendChild(elements);
    });
  } catch {
    createError();
  } finally {
    stopLoading();
  }
}
loadProducts();
