import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export const DialogUpdateSet = ({
  open,
  handleClose,
  validateHandler,
  nameSet
}) => {
  console.log("name set", nameSet);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Modifier jeu de cartes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Êtes-vous sûr de vouloir modifier le jeu de cartes{" "}
          <strong style={{ color: "red" }}>{nameSet}</strong> ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={validateHandler} color="primary">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
