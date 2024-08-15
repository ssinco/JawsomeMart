// const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL || '/api';
const BACKEND_URL = import.meta.env.PROD
  ? `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/api`  // This will be true in production
  : '/api';  // This will be false in development

console.log('Running in production:', import.meta.env.PROD);
console.log('Backend URL prod', import.meta.env.VITE_EXPRESS_BACKEND_URL);

// view my cart
const index = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/cart`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
      });
      const data = await res.json();
     
      return data;
    } catch (error) {
      console.log(error);
    }
  };

// create a cart
const create = async (formData) => {
    try {
        console.log('cart created')
        const res = await fetch(`${BACKEND_URL}/cart`, {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (error) {
    console.log(error);
    }
};

// remove an item from the cart
const update = async (cart) => {
  try{
    console.log('update', cart)
    const res = await fetch(`${BACKEND_URL}/cart/delete`, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
      });
    return res.json()
  } catch (error) {
    console.log(error);
  }
}


const add = async (newItem) => {
  try{
    console.log('add', newItem)
    const res = await fetch(`${BACKEND_URL}/cart/add`, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
      });
    return res.json()
  } catch (error) {
    console.log(error);
  }
}

const order = async (cart) => {
  try{
    console.log('order', cart)
    const res = await fetch(`${BACKEND_URL}/cart/order`, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
      });
    return res.json()
  } catch (error) {
    console.log(error);
  }
}


export {
    index,
    create,
    update,
    add,
    order,
};
