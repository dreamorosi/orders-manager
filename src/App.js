import React, { useState } from "react";
import Input from "./Input";
import ProductsDrawer from "./ProductsDrawer";
import "./styles.css";
import logo from "./logo.svg";

export default function App() {
  const [form, setForm] = useState({});

  const setValue = (key, val) => {
    setForm((state) => ({ ...state, [key]: val }));
  };

  const collectValues = () => {
    console.log(form);
    if ("items" in form) {
      Object.keys(form.items).forEach((item) => localStorage.removeItem(item));
    }
    Object.keys(form).forEach((key) => localStorage.removeItem(key));
    localStorage.removeItem("itemList");
    // Temporary artificial delay
    window.setTimeout(() => {
      window.alert("Success!");
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="App">
      <header>
        <img src={logo} alt="Trendline Logo" />
        <h1>Register Order</h1>
      </header>
      <section>
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
        <ProductsDrawer
          action={setValue}
          itemsListSize={"items" in form ? Object.keys(form.items) : 0}
        />
      </section>
      <button type="button" onClick={collectValues}>
        Submit
      </button>
    </div>
  );
}
