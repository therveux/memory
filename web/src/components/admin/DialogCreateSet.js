import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export const DialogCreateSet = ({ open, handleClose, validateHandler }) => {
  const [setName, setSetName] = useState("");

  const onChangeHandler = ({ target: { value } }) => {
    setSetName(value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Ajouter jeu de cartes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Les jeux de cartes permettent d'organiser en plusieurs thèmes Memory.
          Ils peuvent être utilisés pour trier de manière logique ou alors par
          difficulté.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nom du jeu de carte"
          type="text"
          value={setName}
          onChange={onChangeHandler}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={() => validateHandler(setName)} color="primary">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
