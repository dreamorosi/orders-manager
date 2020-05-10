import React, { useState, useEffect } from "react";
import ProductInput from "./ProductInput";
import uuid4 from "uuid4";

export default function ProductsDrawer({ action, itemsListSize }) {
  const setInitialItemList = () => {
    let lsForm = {};
    let lsItemList =
      localStorage.getItem("itemList") !== null
        ? JSON.parse(localStorage.getItem("itemList"))
        : [];
    if (!lsItemList.length) {
      lsItemList.push(uuid4());
    } else {
      lsItemList.forEach((idx) => {
        if (localStorage.getItem(`prod-${idx}`) !== null) {
          lsForm[`prod-${idx}`] = JSON.parse(
            localStorage.getItem(`prod-${idx}`)
          );
        }
      });
    }
    return [lsForm, lsItemList];
  };
  const [lsForm, lsItemList] = setInitialItemList();
  const [form, setForm] = useState(lsForm);
  const [itemList, setItemList] = useState(lsItemList);

  const setValue = (key, val) => {
    setForm((state) => ({ ...state, [key]: val }));
    action("items", { ...form, [key]: val });
  };

  const renderProducts = () => {
    const products = [];
    let idx = 0;
    while (idx < itemList.length) {
      products.push(
        <ProductInput
          idx={itemList[idx]}
          itemListMetadata={{
            idxOf: idx,
            listSize: itemList.length,
          }}
          actions={{
            forwardValues: setValue,
            removeItem: removeProduct,
          }}
          key={itemList[idx]}
        />
      );
      idx++;
    }
    return products;
  };

  const addProduct = () => {
    setItemList((state) => [...state, uuid4()]);
  };

  const removeProduct = (idx) => {
    const numericIdx = itemList.indexOf(idx);
    localStorage.removeItem(`prod-${idx}`);
    itemList.splice(numericIdx, 1);
    setItemList(itemList);
    delete form[`prod-${idx}`];
    setForm((state) => ({ ...state, ...form }));
    action("items", form);
  };

  useEffect(function persistInput() {
    if (itemList.length) {
      localStorage.setItem("itemList", JSON.stringify(itemList));
    }
  });

  useEffect(() => {
    if (Object.keys(form).length && !itemsListSize) {
      action("items", form);
    }
  }, [itemsListSize, action, form]);

  return (
    <div className="productDrawer">
      <h5>Products List</h5>
      {renderProducts()}
      <span
        role="img"
        aria-label="add"
        title="add product"
        onClick={addProduct}
      >
        Add Item ➕
      </span>
    </div>
  );
}
