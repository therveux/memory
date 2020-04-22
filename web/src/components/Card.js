import React, { useState, useContext, useEffect, useRef } from "react";
import ReactCardFlip from "react-card-flip";
import { CardContext } from "../pages/CardPage";

export const Card = ({ card, cover }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const prevFlipped = useRef(null);
  const { handlerAddCard, handlerRemoveCard } = useContext(CardContext);

  const clickHandler = () => {
    setIsFlipped(prevValue => !prevValue);
  };

  useEffect(() => {
    if (cover) {
      setIsFlipped(false);
    }
  }, [cover]);

  useEffect(() => {
    if (prevFlipped.current && !isFlipped) {
      handlerRemoveCard(card);
    } else if (!prevFlipped.current && isFlipped) {
      handlerAddCard(card);
    }
    prevFlipped.current = isFlipped;
  }, [isFlipped, card, handlerAddCard, handlerRemoveCard]);

  return (
    <div style={styles.child}>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipSpeedBackToFront={1}
        flipSpeedFrontToBack={1}
        flipDirection="horizontal"
        containerStyle={{
          display: "flex",
          flex: 1
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            height: CARD_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right bottom, #FC575E, #F7B42C)",
            cursor: "pointer",
            ...styles.border
          }}
          onClick={clickHandler}
        >
          <h4>Memory</h4>
        </div>

        {card.type === "image" ? (
          <div
            style={{
              display: "flex",
              height: CARD_HEIGHT,
              ...styles.border
            }}
            onClick={clickHandler}
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
              ...styles.border
            }}
            onClick={clickHandler}
          >
            <p style={{ textAlign: "center" }}>{card.data}</p>
          </div>
        )}
      </ReactCardFlip>
    </div>
  );
};

const CARD_HEIGHT = 250;

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

/*
<div
          style={{
            display: "flex",
            flex: 1,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "tomato"
          }}
          onClick={clickHandler}
        >
          <p>Memory</p>
        </div>

        <div style={styles.card} onClick={clickHandler}>
          {card.type === "image" ? (
            <img
              style={{
                minWidth: "100%",
                display: "block",
                alignSelf: "center",
                height: 100
              }}
              alt="back card"
              src={card.data}
            />
          ) : (
            <p>{card.data}</p>
          )}
        </div>
*/
