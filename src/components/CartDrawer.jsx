import React from "react"

export default function CartDrawer({ open, close, cart = [], updateQty, clearCart, checkout }) {
  const total = cart.reduce((s, i) => s + Number(i.price || 0) * Number(i.qty || 0), 0)

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="font-semibold">Your Cart</h2>
        <button onClick={close} className="text-gray-500">
          Close
        </button>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        {cart.length === 0 && <p className="text-sm text-gray-500">Cart is empty.</p>}

        {(cart || []).map(item => {
          const qty = Number(item.qty || 1)
          const price = Number(item.price || 0)
          return (
            <div key={item.id} className="flex items-center gap-3 mb-3">
              <img
                src={item.image || "https://via.placeholder.com/50"}
                alt={item.name || "Product"}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{item.name || "Unknown"}</div>
                <div className="text-sm text-gray-600">RM{price.toFixed(2)}</div>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, qty - 1)} className="px-2">
                    -
                  </button>
                  <div className="px-2 border rounded">{qty}</div>
                  <button onClick={() => updateQty(item.id, qty + 1)} className="px-2">
                    +
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Total</div>
          <div className="font-bold">RM{total.toFixed(2)}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={checkout} className="flex-1 bg-blue-600 text-white py-2 rounded">
            Checkout
          </button>
          <button onClick={clearCart} className="flex-1 bg-gray-200 py-2 rounded">
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
