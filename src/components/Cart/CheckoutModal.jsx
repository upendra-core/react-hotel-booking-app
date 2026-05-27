import { useState } from "react";

export default function CheckoutModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) {
      alert("Name and Phone are required");
      return;
    }

    onSubmit(form);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Enter Details</h2>

        <input
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone *"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleChange}
        />

        <div style={{ marginTop: 10 }}>
          <button onClick={handleSubmit}>Place Order</button>
          <button onClick={onClose} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  width: 300,
};