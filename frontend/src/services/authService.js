// const BACKEND_URL = process.env.EXPRESS_BACKEND_URL;
// const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

// const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL || '/api';
const BACKEND_URL = import.meta.env.PROD
? `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/api`  // This will be true in production
: '/api';  // This will be false in development

  console.log('Running in production:', import.meta.env.PROD);
  console.log('Backend URL prod', import.meta.env.VITE_EXPRESS_BACKEND_URL);

  const getUser = () => {
    const token = localStorage.getItem('jwtToken');
    console.log('token',token)
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  };

  const signup = async (formData) => {
    console.log('form',formData)
    try {
      console.log(`${BACKEND_URL}/auth/register`)
      const res = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error('Username already exists!');
      }
      console.log(json)
      localStorage.setItem('jwtToken', json.jwtToken);
      return json;
    } catch (err) {
      throw new Error(err);
    }
  };

const signin = async (user) => {
  console.log(`${import.meta.env.VITE_EXPRESS_BACKEND_URL}/auth/login`)
  console.log('signin')
  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    console.log('json',json)
    if (json.jwtToken) {
      localStorage.setItem('jwtToken', json.jwtToken);
      const user = JSON.parse(atob(json.jwtToken.split('.')[1]));
      return user;
    }
  } catch (err) {
    throw err;
  }
};

const signout = () => {
  localStorage.removeItem('jwtToken');
};

export {
    signup, 
    signin, 
    getUser, 
    signout,
};
