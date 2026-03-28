import { useEffect, useState, useMemo } from "react";
import "./Home.css";

export default function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=1000")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const all = products.map(p => p.category);
    return ["all", ...new Set(all)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      return (
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" || p.category === category)
      );
    });
  }, [products, search, category]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const increase = (id) => {
    setCart(cart.map(i =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    ));
  };

  const decrease = (id) => {
    setCart(cart.map(i =>
      i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
    ));
  };

  const getQty = (id) => {
    const item = cart.find(i => i.id === id);
    return item ? item.qty : 0;
  };

  return (
    <div className="home">

      {showToast && <div className="toast">Added to cart ✅</div>}

      <div className="search-bar">
        <input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map((c,i)=>(
            <option key={i}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? <div className="loader"></div> : (
        <div className="grid">
          {filteredProducts.map(p => {
            const qty = getQty(p.id);

            return (
              <div className="card" key={p.id} onClick={()=>setSelected(p)}>
                <img src={p.thumbnail} />
                <h4>{p.title}</h4>
                <p>${p.price}</p>

                {qty === 0 ? (
                  <button
                    className="add-btn"
                    onClick={(e)=>{
                      e.stopPropagation();
                      addToCart(p);
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="qty-box" onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>decrease(p.id)}>-</button>
                    <span>{qty}</span>
                    <button onClick={()=>increase(p.id)}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <div className="overlay" onClick={()=>setSelected(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <span className="close" onClick={()=>setSelected(null)}>×</span>
            <img src={selected.thumbnail}/>
            <h2>{selected.title}</h2>
            <h3>${selected.price}</h3>
            <p>{selected.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}