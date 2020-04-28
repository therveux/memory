import React from "react";
import { CARD_HEIGHT } from "../assets/dimens";

export const FrontCard = ({ card, onClick = () => {} }) => {
  return card.type === "image" ? (
    <div
      style={{
        display: "flex",
        height: CARD_HEIGHT,
        ...styles.border
      }}
      onClick={onClick}
    >
      <img
        src={card.data}
        style={{
          ...styles.image,
          ...styles.border
        }}
        alt={"back"}
      />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: CARD_HEIGHT - 4,
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid tomato",
        cursor: "pointer",
        background: "linear-gradient(to right bottom, #F6D285, #BBF0F3)",
        padding: 4,
        ...styles.border
      }}
      onClick={onClick}
    >
      <p style={{ textAlign: "center" }}>{card.data}</p>
    </div>
  );
};

const styles = {
  image: {
    minHeight: "100%",
    maxWidth: "100%"
  },
  child: {
    display: "flex",
    flex: "0 0 15%",
    margin: 2,
    height: CARD_HEIGHT
  },
  border: {
    borderRadius: 15
  }
};
