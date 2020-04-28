import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { ROUTES } from "../../navigation/routes";
import BackIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    display: "flex",
    zIndex: theme.zIndex.drawer + 1
  }
}));

export const AdminHeader = ({ history, position }) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar} position={position}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.push(ROUTES.home)}
          >
            <BackIcon />
          </IconButton>
          <Button color="inherit" onClick={() => history.push(ROUTES.admin)}>
            Jeux
          </Button>
          <Button
            color="inherit"
            onClick={() => history.push(ROUTES.adminCard)}
          >
            Cartes
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
