import React, { useState, useEffect } from "react";

export default function ProductInput({ idx, itemListMetadata, actions }) {
  const { forwardValues, removeItem } = actions;
  const { idxOf, listSize } = itemListMetadata;
  const setInitialVal = () => {
    let lsForm =
      localStorage.getItem(`prod-${idx}`) !== null
        ? JSON.parse(localStorage.getItem(`prod-${idx}`))
        : {};
    return lsForm;
  };
  const lsForm = setInitialVal();
  const [hasComment, setHasComment] = useState("comment" in lsForm);
  const [form, setForm] = useState(lsForm);

  const setValue = (key, val) => {
    setForm((state) => ({ ...state, [key]: val }));
    forwardValues(`prod-${idx}`, { ...form, [key]: val });
  };

  useEffect(function persistInput() {
    if (Object.keys(form).length) {
      localStorage.setItem(`prod-${idx}`, JSON.stringify(form));
    }
  });

  const removeComment = () => {
    delete form.comment;
    setForm((state) => ({ ...state, ...form }));
    setHasComment(0);
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
          onClick={() => removeComment()}
        >
          ➖
        </span>
      </label>,
      <textarea
        id={`prod-${idx}-comment`}
        key={1}
        onChange={(e) => setValue("comment", e.target.value)}
        value={form.comment}
      />,
    ];
  };

  const addButton = () => {
    if (idxOf === 0 && listSize === 1) {
      return;
    }
    return (
      <span
        role="img"
        aria-label="remove"
        title="remove"
        onClick={() => removeItem(idx)}
      >
        ➖
      </span>
    );
  };

  return (
    <div className="productItem">
      <div className="productItemHead">
        <span>Item</span>
        {addButton()}
      </div>
      <div className="productItemText">
        <label htmlFor={`prod-${idx}-item`}>Product Name</label>
        <textarea
          id={`prod-${idx}-item`}
          onChange={(e) => setValue("name", e.target.value)}
          autoComplete="false"
          value={form.name}
        />
      </div>
      <div className="productItemNumbers">
        <div>
          <label htmlFor={`prod-${idx}-amount`}>Amount</label>
          <input
            id={`prod-${idx}-amount`}
            type="number"
            onChange={(e) => setValue("amount", e.target.value)}
            autoComplete="false"
            min="1"
            value={form.amount || 1}
          />
        </div>
        <div>
          <label htmlFor={`prod-${idx}-price`}>Price</label>
          <input
            id={`prod-${idx}-price`}
            type="text"
            autoComplete="false"
            onChange={(e) => setValue("price", e.target.value)}
            value={form.price}
          />
        </div>
      </div>
      <div className="productItemBottom">{renderComment()}</div>
    </div>
  );
}
