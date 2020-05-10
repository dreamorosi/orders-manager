import React, { useState } from "react";
import debounce from "lodash.debounce";
import Input from "./Input";
import "./styles.css";

export default function App() {
  const [form, setForm] = useState({});

  const setValue = (key, val) => {
    setForm(state => ({ ...state, [key]: val }));
  };

  const collectValues = () => {
    console.log(form);
    let keys = Array.from(Object.keys(form));
    keys.forEach(key => localStorage.removeItem(key));
    // Temporary artificial delay
    window.setTimeout(() => {
      // window.location.reload();
    }, 2000);
  };

  return (
    <div className="App">
      <Input
        label="Customer Name"
        name="fullName"
        value={form}
        action={setValue}
        type="text"
      />
      <Input
        label="Email (optional)"
        name="email"
        value={form}
        action={setValue}
        type="email"
      />
      <Input
        label="Phone"
        name="phone"
        value={form}
        action={setValue}
        type="tel"
      />
      <ProductsDrawer action={setValue} />
      <button type="button" onClick={collectValues}>
        Submit
      </button>
    </div>
  );
}

export function ProductInput({ idx, action }) {
  const [hasComment, setHasComment] = useState(0);
  const [form, setForm] = useState({});

  const setValue = (key, val) => {
    setForm(state => ({ ...state, [key]: val }));
    console.log("now");
    action(`prod-${idx}`, form);
  };

  const renderComment = () => {
    if (!hasComment) {
      return (
        <span onClick={() => setHasComment(1)} aria-label="add">
          Add Comment
        </span>
      );
    }
    return [
      <label htmlFor={`prod-${idx}-comment`} key={0}>
        <span>Comment</span>
        <span
          role="img"
          aria-label="remove"
          title="remove"
          onClick={() => setHasComment(0)}
        >
          ➖
        </span>
      </label>,
      <textarea
        id={`prod-${idx}-comment`}
        key={1}
        onChange={e => debounce(setValue("comment", e.target.value), 500)}
      />
    ];
  };

  return (
    <div className="productItem">
      <div className="productItemHead">
        <span>Item</span>
        <span role="img" aria-label="remove" title="remove">
          ➖
        </span>
      </div>
      <div className="productItemText">
        <label htmlFor={`prod-${idx}-item`}>Product Name</label>
        <textarea
          id={`prod-${idx}-item`}
          onChange={e => debounce(setValue("name", e.target.value), 500)}
        />
      </div>
      <div className="productItemNumbers">
        <div>
          <label htmlFor={`prod-${idx}-amount`}>Amount</label>
          <input
            id={`prod-${idx}-amount`}
            type="number"
            onChange={e => debounce(setValue("amount", e.target.value), 500)}
          />
        </div>
        <div>
          <label htmlFor={`prod-${idx}-price`}>Price</label>
          <input
            id={`prod-${idx}-price`}
            type="text"
            onChange={e =>
              debounce(e => setValue("price", e.target.value), 500)
            }
          />
        </div>
      </div>
      <div className="productItemBottom">{renderComment()}</div>
    </div>
  );
}

export function ProductsDrawer({ action }) {
  const [form, setForm] = useState({});

  const setValue = (key, val) => {
    setForm(state => ({ ...state, [key]: val }));
    action("items", form);
  };

  return (
    <div className="productDrawer">
      <div style={{ border: "1px solid #000", height: "60px" }} />
      <ProductInput idx={0} action={setValue} />
    </div>
  );
}
