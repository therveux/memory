import React, { createContext, useState, useEffect } from "react";
import { Card } from "../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import HelpIcon from "@material-ui/icons/Help";
import CreditCardIcon from "@material-ui/icons/CreditCard";

export const CardContext = createContext(null);

const cardsData = [
  {
    id: 1,
    data: require("../assets/1.png"),
    type: "image"
  },
  { id: 1, data: "La souris est derrière la balançoire.", type: "text" },
  { id: 2, data: "La souris est à gauche de la balançoire.", type: "text" },
  {
    id: 2,
    data: require("../assets/2.png"),
    type: "image"
  },
  {
    id: 3,
    data: require("../assets/3.png"),
    type: "image"
  },
  {
    id: 3,
    data: "La souris est à droite de la balançoire.",
    type: "text"
  },
  {
    id: 4,
    data: require("../assets/4.png"),
    type: "image"
  },
  {
    id: 4,
    data: "La souris est sur la balançoire.",
    type: "text"
  },
  {
    id: 5,
    data: require("../assets/5.png"),
    type: "image"
  },
  {
    id: 5,
    data: "La souris est sous la balançoire.",
    type: "text"
  },
  {
    id: 6,
    data: require("../assets/6.png"),
    type: "image"
  },
  {
    id: 6,
    data: "La souris est sur la citrouille.",
    type: "text"
  },
  {
    id: 7,
    data: require("../assets/7.png"),
    type: "image"
  },
  {
    id: 7,
    data: "La souris est à droite de la citrouille.",
    type: "text"
  },
  {
    id: 8,
    data: require("../assets/8.png"),
    type: "image"
  },
  {
    id: 8,
    data: "La souris est entre les citrouilles.",
    type: "text"
  },
  {
    id: 9,
    data: require("../assets/9.png"),
    type: "image"
  },
  {
    id: 9,
    data: "La souris est à gauche de la citrouille.",
    type: "text"
  },
  {
    id: 10,
    data: require("../assets/10.png"),
    type: "image"
  },
  {
    id: 10,
    data: "La souris est dans la citrouille.",
    type: "text"
  },
  {
    id: 11,
    data: require("../assets/11.png"),
    type: "image"
  },
  {
    id: 11,
    data: "La souris est sous le fromage.",
    type: "text"
  },
  {
    id: 12,
    data: require("../assets/12.png"),
    type: "image"
  },
  {
    id: 12,
    data: "La souris est devant le fromage.",
    type: "text"
  }
];

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: "auto"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export const CardPage = () => {
  const [cards, setCards] = useState(cardsData);
  const [clickedCards, setClickedCards] = useState([]);
  const [coverCards, setCoverCards] = useState(false);
  const [removedCards, setRemovedCard] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setCards(cards =>
      cards
        .map(card => ({ sort: Math.random(), value: card }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
  }, []);

  const handlerAddCard = card => {
    setClickedCards(clickedCards => [...clickedCards, card]);
  };

  const handlerRemoveCard = card => {
    setClickedCards(clickedCards =>
      clickedCards.filter(
        ({ id, type }) => id !== card.id && type !== card.type
      )
    );
  };

  useEffect(() => {
    if (clickedCards.length === 2) {
      const [card1, card2] = clickedCards;

      if (card1.id === card2.id && card1.type !== card2.type) {
        setTimeout(() => {
          setRemovedCard(removedCards => [...removedCards, card1.id]);
        }, 1000);
      }

      setTimeout(() => {
        setCoverCards(true);
      }, 1000);

      setClickedCards([]);
    } else {
      setCoverCards(false);
    }
  }, [clickedCards]);

  const shuffle = array => {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  };

  const onClickHandler = cardNumber => () => {
    setRemovedCard([]);
    const cardDataTuples = cardsData.reduce((acc, curr) => {
      const keepValues = acc[curr["id"]] ? acc[curr["id"]] : [];
      return { ...acc, [curr["id"]]: [curr, ...keepValues] };
    }, {});
    const shuffleArray = shuffle(Object.values(cardDataTuples))
      .slice(0, cardNumber / 2)
      .reduce((acc, curr) => [...acc, ...curr], []);
    setCards(shuffle(shuffleArray));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Memory
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={onClickHandler(12)}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary={"12 cartes"} />
            </ListItem>
            <ListItem button onClick={onClickHandler(16)}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary={"16 cartes"} />
            </ListItem>
            <ListItem button onClick={onClickHandler(20)}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary={"20 cartes"} />
            </ListItem>
            <ListItem button onClick={onClickHandler(24)}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary={"24 cartes"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key={"Aide"}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary={"Aide"} />
            </ListItem>
            <ListItem button key={"Contact"}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Contact"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <CardContext.Provider value={{ handlerAddCard, handlerRemoveCard }}>
          <div style={styles.parent}>
            {cards.map(card => {
              if (removedCards.includes(card.id)) {
                return (
                  <div
                    style={{
                      display: "flex",
                      flex: "0 0 15%",
                      margin: 2,
                      height: 250,
                      backgroundColor: "#F9F9F9",
                      borderRadius: 25
                    }}
                  />
                );
              } else {
                return (
                  <Card
                    key={`${card.id}${card.type}`}
                    card={card}
                    cover={coverCards}
                  />
                );
              }
            })}
          </div>
        </CardContext.Provider>
      </main>
    </div>
  );
};

const styles = {
  parent: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingTop: 5
  }
};

/*
<div
      style={{
        display: "flex",
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row"
        }}
      >
        <SideBar />
        <CardContext.Provider value={{ handlerAddCard, handlerRemoveCard }}>
          <div style={styles.parent}>
            {cards
              .filter(({ id }) => !removedCards.includes(id))
              .map(card => (
                <Card
                  key={`${card.id}${card.type}`}
                  card={card}
                  cover={coverCards}
                />
              ))}
          </div>
        </CardContext.Provider>
      </div>
    </div>
*/
