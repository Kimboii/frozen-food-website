import React from 'react'

export default function ProductCard({ product, addToCart }) {
  // Safety check: don't render if product is missing
  if (!product) return null

  // Ensure price is a number to use toFixed
  const price = Number(product.price) || 0

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col hover:shadow-2xl transition-shadow duration-300">
      <img
        src={product.image || 'https://via.placeholder.com/150'}
        alt={product.name || 'Product'}
        className="h-40 w-full object-cover rounded-md mb-3"
      />
      <h3 className="font-semibold">{product.name || 'Unknown Product'}</h3>
      <p className="text-sm text-gray-600 flex-1">{product.description || ''}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold">RM{price.toFixed(2)}</div>
        <button
          onClick={() => addToCart(product)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 hover:scale-105 transition duration-300"
        >
          Add
        </button>
      </div>
    </div>
  )
}
