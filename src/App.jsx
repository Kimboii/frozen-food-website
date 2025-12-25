import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import ProductCard from "./components/ProductCard"
import CartDrawer from "./components/CartDrawer"
import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"

import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore"
import { db } from "./firebase"

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ffc_cart")) || []
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)

  // Load products safely
  useEffect(() => {
    async function loadProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"))
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log("Loaded from Firestore:", items)
        setProducts(items)
      } catch (err) {
        console.error("Failed to load products:", err)
      }
    }
    loadProducts()
  }, [])

  // Persist cart
  useEffect(() => {
    localStorage.setItem("ffc_cart", JSON.stringify(cart))
  }, [cart])

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.id !== id))
    } else {
      setCart(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)))
    }
  }

  function clearCart() {
    setCart([])
  }

  async function checkout() {
    if (cart.length === 0) {
      alert("Cart is empty")
      return
    }

    const total = cart.reduce((s, i) => s + i.qty * i.price, 0)
    const confirmPayment = window.confirm(
      `Simulate payment of RM${total.toFixed(2)}?`
    )
    if (!confirmPayment) return

    await addDoc(collection(db, "orders"), {
      items: cart,
      total,
      createdAt: Timestamp.now()
    })

    alert("Payment simulated & order saved")
    clearCart()
    setCartOpen(false)
  }

  return (
    <div className="bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <Header
        openCart={() => setCartOpen(true)}
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
      />

      <main className="container mt-8">
        {/* About / Company Profile */}
  <section id="about" className="grid md:grid-cols-2 gap-6 items-center mb-12 bg-white p-6 rounded-lg shadow-lg">
    {/* Left column: text */}
    <div>
      <h2 className="text-3xl font-bold">Freshness. Flavour. Frozen.</h2>
      <p className="mt-3 text-gray-600">
        Frozen Food Co. began with a simple mission: make convenient, tasty frozen meals using quality ingredients and responsible sourcing. We serve families and food lovers who want quick, delicious meals without compromise.
      </p>

      <div className="mt-4">
        <h3 className="font-semibold text-xl mb-1">Our Vision</h3>
        <p className="text-sm text-gray-600">
          To be the most trusted frozen food brand in the region for quality and convenience.
        </p>

        <h3 className="mt-3 font-semibold text-xl mb-1">Our Mission</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>Source high-quality ingredients responsibly</li>
          <li>Deliver reliable and tasty frozen meals</li>
          <li>Reduce food waste through longer shelf life</li>
        </ul>
      </div>
    </div>

    {/* Right column: image */}
    <div>
      <img
        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=60"
        alt="Frozen Food"
        className="rounded-lg shadow"
      />
    </div>
  </section>
        
        {/* Products */}
        <section id="products" className="mb-12">
          <h2 className="text-2xl font-bold mb-4 ">Product Catalogue</h2>

          {products.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {products.map(p => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} />
              ))}
            </div>
          )}
        </section>

        {/* Contact */}
        <section id="contact" className="mb-12 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <ContactForm />
            </div>
        </section>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        clearCart={clearCart}
        checkout={checkout}
      />
    </div>
  )
}
