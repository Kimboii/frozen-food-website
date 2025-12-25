import React from 'react'


export default function Header({ openCart, cartCount }) {
return (
<header className="bg-white shadow">
<div className="container py-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">FF</div>
<div>
<h1 className="text-lg font-semibold">Frozen Food Co.</h1>
<p className="text-xs text-gray-500">Premium frozen meals & snacks</p>
</div>
</div>
<nav className="flex items-center gap-4">
<a href="#products" className="text-sm hover:underline">Products</a>
<a href="#about" className="text-sm hover:underline">About</a>
<a href="#contact" className="text-sm hover:underline">Contact</a>
<button onClick={openCart} className="relative bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">
Cart
{cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">{cartCount}</span>}
</button>
</nav>
</div>
</header>
)
}