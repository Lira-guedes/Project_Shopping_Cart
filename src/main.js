import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// ## 3. Crie uma listagem de produtos
// ## 4. Adicione um texto de `carregando` durante uma requisição à API
// ## 5. Exiba uma mensagem de erro caso algo dê errado na requisição à API

const products = document.querySelector('.products');
const cart = document.querySelector('.cart__products');
const savedCartIds = getSavedCartIDs();
const buttonCep = document.querySelector('.cep-button');

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
// btn que adiciona ao carrinho
const cartButtons = () => {
  const itemBtn = document.querySelectorAll('.product__add');
  itemBtn.forEach((button) => button.addEventListener('click', async (elem) => {
    const id = elem.target.parentNode.firstChild.innerText;
    const data = await fetchProduct(id);
    const product = createCartProductElement(data);
    cart.appendChild(product);
    saveCartID(id);
  }));
};
// salva cart no local storage
async function saveCart() {
  const items = await Promise.all(savedCartIds.map(fetchProduct));
  const elementProduct = items.map(createCartProductElement);
  elementProduct.forEach((elem) => cart.append(elem));
}

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
    cartButtons();
  }
}
saveCart();
loadProducts();

// busca cep
buttonCep.addEventListener('click', searchCep);
