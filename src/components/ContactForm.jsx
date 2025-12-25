import React, { useState } from "react"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { db } from "../firebase"

export default function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    try {
      // Save message to Firestore
      await addDoc(collection(db, "messages"), {
        name: state.name,
        email: state.email,
        message: state.message,
        createdAt: Timestamp.now()
      })

      setSent(true)
      setState({ name: "", email: "", message: "" })

      // Reset message status after 3s
      setTimeout(() => setSent(false), 3000)
    } catch (err) {
      console.error("Failed to send message:", err)
      alert("Failed to send message. Check console.")
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded p-4 shadow max-w-md">
      <h3 className="font-semibold mb-2">Contact Us</h3>
      <input
        required
        value={state.name}
        onChange={e => setState({ ...state, name: e.target.value })}
        placeholder="Name"
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        required
        value={state.email}
        onChange={e => setState({ ...state, email: e.target.value })}
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        required
        value={state.message}
        onChange={e => setState({ ...state, message: e.target.value })}
        placeholder="Message"
        className="w-full mb-2 p-2 border rounded"
        rows={4}
      ></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
      {sent && <div className="text-sm text-green-600 mt-2">Message sent!</div>}
    </form>
  )
}
