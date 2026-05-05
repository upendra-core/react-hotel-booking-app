/**
 * Customer information form
 * Controlled inputs → state managed by parent
 * Props:
 * - customer: object with name, room, phone
 * - setCustomer: function to update state
 */
export default function CustomerForm({ customer, setCustomer }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h2>Customer Info</h2>

      {/* Name input */}
      <input
        placeholder="Name"
        value={customer.name}
        onChange={(e) =>
          setCustomer({ ...customer, name: e.target.value })
        }
      />

      {/* Room input */}
      <input
        placeholder="Room"
        value={customer.room}
        onChange={(e) =>
          setCustomer({ ...customer, room: e.target.value })
        }
      />

      {/* Phone input */}
      <input
        placeholder="Phone"
        value={customer.phone}
        onChange={(e) =>
          setCustomer({ ...customer, phone: e.target.value })
        }
      />
    </div>
  );
}