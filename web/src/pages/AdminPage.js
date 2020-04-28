import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import { FrontCard } from "../components/FrontCard";
import { CARD_HEIGHT } from "../assets/dimens";
import { DialogCreateSet } from "../components/admin/DialogCreateSet";
import { AdminHeader } from "../components/admin/AdminHeader";
import { GET_CARD_SETS } from "../graphql/queries";
import { DialogUpdateSet } from "../components/admin/DialogUpdateSet";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    flexGrow: 1
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const GET_CARDS_BY_SET = gql`
  query getCardsBySet($set: String!) {
    getCardBySet(set: $set) {
      _id
      cardId
      data
      set
      type
    }
  }
`;

const ADD_CARD_SET = gql`
  mutation addCardSet($name: String!) {
    addSet(name: $name) {
      name
    }
  }
`;

export const AdminPage = props => {
  const classes = useStyles();

  // GraphQL queries
  const { data } = useQuery(GET_CARD_SETS);
  const [getCardsBySet, { data: cardsBySetData }] = useLazyQuery(
    GET_CARDS_BY_SET
  );

  // GraphQL mutations
  const [addCardSet] = useMutation(ADD_CARD_SET, {
    update(cache, { data: { addSet } }) {
      const { getSets } = cache.readQuery({ query: GET_CARD_SETS });
      cache.writeQuery({
        query: GET_CARD_SETS,
        data: { getSets: getSets.concat([addSet]) }
      });
    }
  });

  // State
  const [cardSets, setCardsSets] = useState([]); // list of all existing sets from server
  const [selectedSet, setSelectedSet] = useState("");
  const [cards, setCards] = useState([]); // card from server
  const [openDialogCreate, setOpenDialogCreate] = useState(false); // handle dialog for Set creation
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false); // handle dialog for Set update
  const [openDialogDelete, setOpenDialogDelete] = useState(false); // handle dialog for Set deletion

  useEffect(() => {
    if (data && data.getSets) {
      const setNames = data.getSets.map(({ name }) => name);
      setCardsSets(setNames);
    }
  }, [data]);

  useEffect(() => {
    if (cardsBySetData && cardsBySetData.getCardBySet) {
      console.log(cardsBySetData.getCardBySet);
      setCards(cardsBySetData.getCardBySet);
    }
  }, [cardsBySetData]);

  const onSelectHandler = ({ target: { value } }) => {
    setSelectedSet(value);
    getCardsBySet({ variables: { set: value } });
  };

  const addSetHandler = () => {
    setOpenDialogCreate(true);
  };

  const updateSetHandler = () => {
    setOpenDialogUpdate(true);
  };

  const createSetHandler = async setName => {
    if (setName) {
      await addCardSet({ variables: { name: setName } });
    }
    setOpenDialogCreate(false);
  };

  return (
    <div className={classes.root}>
      <AdminHeader {...props} position={"fixed"} />
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
            <ListItem button>
              <FormControl className={classes.formControl}>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Jeu de carte
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={selectedSet}
                  onChange={onSelectHandler}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {cardSets.map((cardSet, index) => (
                    <MenuItem key={index} value={cardSet}>
                      {cardSet}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <Button
                style={{ display: "flex", flex: 1 }}
                variant="contained"
                onClick={addSetHandler}
              >
                Ajouter
              </Button>
            </ListItem>
            <ListItem button>
              <Button
                style={{ display: "flex", flex: 1 }}
                variant="contained"
                color="primary"
                onClick={updateSetHandler}
              >
                Modifier
              </Button>
            </ListItem>
            <ListItem button>
              <Button
                style={{ display: "flex", flex: 1 }}
                variant="contained"
                color="secondary"
              >
                Supprimer
              </Button>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div style={styles.parent}>
          {cards.map(card => (
            <div key={card._id} style={styles.child}>
              <FrontCard card={card} />
            </div>
          ))}
        </div>
      </main>
      <DialogCreateSet
        open={openDialogCreate}
        handleClose={() => setOpenDialogCreate(false)}
        validateHandler={createSetHandler}
      />
      <DialogUpdateSet
        open={openDialogUpdate}
        handleClose={() => setOpenDialogUpdate(false)}
        nameSet={selectedSet}
      />
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
  },
  child: {
    display: "flex",
    flex: "0 0 15%",
    margin: 2,
    height: CARD_HEIGHT
  }
};
