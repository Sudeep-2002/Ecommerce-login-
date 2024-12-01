import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // App state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state
  const [cart, setCart] = useState([]); // Tracks cart items

  // Dummy product data
  const products = [
    { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Headphones", price: 199, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Smartphone", price: 799, image: "https://via.placeholder.com/150" },
  ];

  // Dummy user data for login
  const users = { username: "admin", password: "password123" };

  // Login credentials
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Handle login
  const handleLogin = () => {
    if (
      loginData.username === users.username &&
      loginData.password === users.password
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]); // Clear cart on logout
  };

  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  
  if (!isLoggedIn) {
    return (
      <div style={{ fontFamily: "Arial", padding: "20px" }}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          style={{ margin: "10px", padding: "5px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          style={{ margin: "10px", padding: "5px" }}
        />
        <button onClick={handleLogin} style={{ padding: "5px 10px" }}>
          Login
        </button>
      </div>
    );
  }

  
  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Welcome to E-Shop</h1>
      <button onClick={handleLogout} style={{ marginBottom: "20px", padding: "5px 10px" }}>
        Logout
      </button>

      {/* Product Listing */}
      <h2>Products</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              width: "150px",
              textAlign: "center",
            }}
          >
            <img src={product.image} alt={product.name} style={{ width: "100%" }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                background: "blue",
                color: "white",
                border: "none",
                padding: "5px 10px",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById("root"));
