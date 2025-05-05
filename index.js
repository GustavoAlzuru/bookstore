const viewCart = document.querySelector('.view-cart')
const cartItemsContainer = document.getElementById('cart-items');


const subscribe = (event) => {
    event.preventDefault()
    alert('Thank you for subscribing!');
    emailInput.value = ''
    
}



const addToCart = (button) => {
    const bookItem = button.closest('.books')
    const img = bookItem.querySelector('img').getAttribute('src');
    const alt = bookItem.querySelector('img').getAttribute('alt');
    const desc = bookItem.querySelector('p').textContent;

    const book = {
      image: img,
      title: alt,
      description: desc
    };

    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];


  // Check if item is already in cart by title
  const isAlreadyInCart = cart.some(item => item.title === book.title);
  if (isAlreadyInCart) {
    button.textContent = 'Item already added';
    button.disabled = true;
    return;
  }

  cart.push(book);
  sessionStorage.setItem('cart', JSON.stringify(cart));

  button.textContent = 'Item already added';
  button.disabled = true;
}

const showCart = () => {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
  
    // Clear old content
    cartItemsContainer.innerHTML = '';
  
    if (!cart || cart.length === 0) {
      cartItemsContainer.innerHTML = '<p style="margin-bottom: 15px;">Your cart is empty.</p>';
    } else {
      cart.forEach(item => {
        const itemHTML = `
          <div style="margin-bottom: 15px;">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <hr>
          </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
      });
    }
  
    viewCart.style.display = 'flex';
  };
  const updateCartButtons = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const buttons = document.querySelectorAll('.books');
  
    buttons.forEach(bookItem => {
      const title = bookItem.querySelector('img').getAttribute('alt');
      const button = bookItem.querySelector('button');
  
      const isInCart = cart.some(item => item.title === title);
      if (isInCart) {
        button.textContent = 'Item already added';
        button.disabled = true;
      }
    });
  };
  const resetCartButtons = () => {
    const buttons = document.querySelectorAll('.books button');
    buttons.forEach(button => {
      button.textContent = 'Add to cart';
      button.disabled = false;
    });
  };
  
  
  window.onload = updateCartButtons;
  
  const closeCart = () => {
    viewCart.style.display = 'none';
  };

  const clearCart = () => {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    if (!cart || cart.length === 0) {
        return
    } 
    sessionStorage.removeItem('cart')
    resetCartButtons()
    showCart()
  }
const buyCart = () => {
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    
    if (!cart || cart.length === 0) {
        return
    }
    sessionStorage.removeItem('cart')
    resetCartButtons()
    showCart()
    alert ('Thanks for buying!')
}