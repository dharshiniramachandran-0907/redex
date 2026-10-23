// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App


import { useEffect, useState } from 'react';

import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from './features/products/productsSlice';
import { placeOrder } from './features/orders/ordersSlice';
import { toggleFavorite } from './features/favorites/favoritesSlice';

import {
  addToCart,
  increase,
  decrease,
  removeFromCart,
  clearCart,
  selectTotalItems,
  selectTotalPrice
} from './features/products/cart/cartSlice';

const money = (value) => '$' + value.toFixed(2);

function Header({ theme, onToggleTheme }) {
  const count = useSelector(selectTotalItems);
  const favoriteCount = useSelector(state => state.favorites.items.length);

  return (
    <header className="header">
      <Link to="/" className="logo">ShopKart</Link>

      <input placeholder="Search products" />

      <nav>
        <Link to="/">Products</Link>
        <Link to="/favorites">Favorites ♡ {favoriteCount}</Link>
        <Link to="/cart">Cart 🛒 {count}</Link>
        <Link to="/login">Sign in</Link>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'light' ? '☾ Dark' : '☀ Light'}
        </button>
      </nav>
    </header>
  );
}

function FavoriteButton({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state =>
    state.favorites.items.some(item => item.id === product.id)
  );

  return (
    <button
      type="button"
      className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
      aria-label={`${isFavorite ? 'Remove' : 'Add'} ${product.title} ${isFavorite ? 'from' : 'to'} favorites`}
      aria-pressed={isFavorite}
      onClick={() => dispatch(toggleFavorite(product))}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  );
}

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartProduct = useSelector(state =>
    state.cart.items.find(item => item.id === product.id)
  );

  return (
    <article className="product-card" key={product.id}>
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
        <FavoriteButton product={product} />
      </div>

      <Link to={`/product/${product.id}`}>
        <small>{product.category}</small>
        <h3>{product.title}</h3>
      </Link>

      {product.rating && (
        <p className="rating">
          ⭐ {product.rating.rate} ({product.rating.count} reviews)
        </p>
      )}

      <strong>{money(product.price)}</strong>

      {cartProduct ? (
        <div className="stepper">
          <button onClick={() => dispatch(decrease(product.id))}>−</button>
          <span>{cartProduct.quantity}</span>
          <button onClick={() => dispatch(increase(product.id))}>+</button>
        </div>
      ) : (
        <button
          className="primary"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to cart
        </button>
      )}
    </article>
  );
}

function Login() {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Sign-in is not connected yet. Connect an authentication provider to continue.');
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <Link to="/" className="login-brand">ShopKart</Link>
        <p className="login-eyebrow">WELCOME BACK</p>
        <h1>Sign in to your account</h1>
        <p className="login-description">Enter your details to continue shopping.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />

          <label className="login-remember">
            <input type="checkbox" name="remember" />
            Remember me
          </label>

          <button className="primary login-submit" type="submit">Sign in</button>
          {message && <p className="login-message" role="status">{message}</p>}
        </form>

        <p className="login-back"><Link to="/">← Back to shopping</Link></p>
      </section>
    </main>
  );
}

function Products() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    state => state.products
  );

  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const categories = [
    'all',
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  let filtered = items.filter(product =>
    category === 'all' || product.category === category
  );

  if (sort === 'low') {
    filtered = [...filtered].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === 'high') {
    filtered = [...filtered].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <main className="container">

      <div className="page-heading">
        <div>
          <h1>All products</h1>
          <p>Showing {filtered.length} products</p>
        </div>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? 'active' : ''}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {status === 'loading' && (
        <h2>Loading products...</h2>
      )}

      {status === 'failed' && (
        <div>
          <p>{error}</p>
          <button onClick={() => dispatch(fetchProducts())}>
            Try again
          </button>
        </div>
      )}

      {status === 'succeeded' && (
        <div className="product-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </main>
  );
}

function Favorites() {
  const favorites = useSelector(state => state.favorites.items);

  return (
    <main className="container">
      <div className="page-heading">
        <div>
          <h1>Your favorites</h1>
          <p>{favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}</p>
        </div>
        <Link to="/">Continue shopping</Link>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-cart">
          <h2>No favorites yet</h2>
          <p>Tap the heart on a product to save it here.</p>
          <Link className="primary" to="/">Browse products</Link>
        </div>
      ) : (
        <div className="product-grid">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(
    state => state.products.items
  );

  const product = products.find(
    item => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="container">Product not found</div>;
  }

  return (
    <main className="container">

      <Link to="/">Products</Link>

      <div className="detail">

        <img src={product.image} alt={product.title} />

        <div>
          <small>{product.category}</small>

          <h1>{product.title}</h1>
          <FavoriteButton product={product} />

          <p>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>

          <h2>{money(product.price)}</h2>

          <p>{product.description}</p>

          <div className="stepper">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>

          <button
            className="primary"
            onClick={() => {
              dispatch(addToCart({
                ...product,
                quantity
              }));

              navigate('/cart');
            }}
          >
            Add to cart
          </button>

          <button onClick={() => navigate('/cart')}>
            Go to cart
          </button>

          <p>Free shipping on orders of $100 or more</p>
          <p>30-day easy returns</p>

        </div>

      </div>

      <h2>You may also like</h2>

      <div className="product-grid">
        {products
          .filter(item => item.id !== product.id)
          .slice(0, 4)
          .map(item => (
            <Link className="product-card" key={item.id} to={`/product/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <strong>{money(item.price)}</strong>
            </Link>
          ))}
      </div>

    </main>
  );
}

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(state => state.cart.items);
  const subtotal = useSelector(selectTotalPrice);

  const shipping = subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="empty-cart">
        <h1>Your cart is empty</h1>

        <p>
          Looks like you haven't added anything yet.
          Browse the products and add your favourites.
        </p>

        <Link className="primary" to="/">
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="container">

      <div className="page-heading">
        <h1>Your cart ({items.reduce((n, item) => n + item.quantity, 0)} items)</h1>
        <Link to="/">Continue shopping</Link>
      </div>

      <div className="cart-layout">

        <section className="cart-items">

          <div className="cart-title">
            <h3>PRODUCT</h3>

            <button onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          </div>

          {items.map(item => (
            <article className="cart-row" key={item.id}>

              <img src={item.image} alt={item.title} />

              <div className="cart-product">
                <small>{item.category}</small>
                <h3>{item.title}</h3>
                <p>{money(item.price)} each</p>
              </div>

              <div className="stepper">
                <button onClick={() => dispatch(decrease(item.id))}>
                  −
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => dispatch(increase(item.id))}>
                  +
                </button>
              </div>

              <strong>
                {money(item.price * item.quantity)}
              </strong>

              <button
                className="remove"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>

            </article>
          ))}

        </section>

        <aside className="summary">

          <h2>Order summary</h2>

          <div>
            Items
            <strong>{items.reduce((n, item) => n + item.quantity, 0)}</strong>
          </div>

          <div>
            Subtotal
            <strong>{money(subtotal)}</strong>
          </div>

          <div>
            Shipping
            <strong>{shipping === 0 ? 'FREE' : money(shipping)}</strong>
          </div>

          <hr />

          <div className="total">
            Total
            <strong>{money(total)}</strong>
          </div>

          <button
            className="primary"
            onClick={() => {
              const order = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                items,
                subtotal,
                shipping,
                total,
                createdAt: new Date().toISOString()
              };

              dispatch(placeOrder(order));
              dispatch(clearCart());
              navigate(`/order-confirmation/${order.id}`);
            }}
          >
            Proceed to checkout
          </button>

          <p>Cart is saved. Refresh and it stays.</p>

        </aside>

      </div>

    </main>
  );
}

function OrderConfirmation() {
  const { id } = useParams();
  const order = useSelector(state =>
    state.orders.items.find(item => item.id === id)
  );

  if (!order) {
    return (
      <main className="container order-confirmation">
        <h1>Order not found</h1>
        <p>We couldn’t find that order.</p>
        <Link className="primary" to="/">Continue shopping</Link>
      </main>
    );
  }

  return (
    <main className="container order-confirmation">
      <div className="confirmation-icon" aria-hidden="true">✓</div>
      <p className="confirmation-eyebrow">ORDER PLACED</p>
      <h1>Thank you for your order!</h1>
      <p className="confirmation-copy">
        Your order has been saved. A confirmation email would be sent once email is configured.
      </p>

      <section className="order-receipt">
        <div className="receipt-heading">
          <h2>Order details</h2>
          <span>#{order.id.slice(0, 8).toUpperCase()}</span>
        </div>
        {order.items.map(item => (
          <div className="receipt-item" key={item.id}>
            <span>{item.title} × {item.quantity}</span>
            <strong>{money(item.price * item.quantity)}</strong>
          </div>
        ))}
        <div className="receipt-item">
          <span>Subtotal</span>
          <strong>{money(order.subtotal)}</strong>
        </div>
        <div className="receipt-item">
          <span>Shipping</span>
          <strong>{order.shipping === 0 ? 'FREE' : money(order.shipping)}</strong>
        </div>
        <div className="receipt-item receipt-total">
          <span>Total</span>
          <strong>{money(order.total)}</strong>
        </div>
      </section>

      <Link className="primary" to="/">Continue shopping</Link>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState(() =>
    window.localStorage.getItem('shopkart-theme') === 'dark' ? 'dark' : 'light'
  );

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('shopkart-theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
      </Routes>

      <footer>
        ShopKart · Frontend training project
        <br />
        Product data: fakestoreapi.com
      </footer>
    </div>
  );
}

export default App;
