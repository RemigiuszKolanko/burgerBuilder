import React from "react";

const Order = props => {
  const ingredients = [];

  let ingredientName = null;
  for (ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div
      style={{
        boxShadow: "0 2px 3px #ccc",
        padding: "10px",
        border: "1px solid #eee",
        margin: "10px auto",
        boxSizing: "border-box",
        width: "80%"
      }}
    >
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
