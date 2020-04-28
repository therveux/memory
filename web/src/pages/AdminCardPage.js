import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { gql } from "apollo-boost";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";

import { DropzoneDialog } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { AdminHeader } from "../components/admin/AdminHeader";
import CssBaseline from "@material-ui/core/CssBaseline";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { GET_CARD_SETS } from "../graphql/queries";
import * as Yup from "yup";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex1: 1,
    flexDirection: "column"
  },
  content: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const addCardValidationSchema = Yup.object().shape({
  cardText: Yup.string().required("Veuillez ajouter un texte à la carte"),
  cardSet: Yup.string().required("Veuillez choisir un jeu de carte")
});

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    singleUploadStream(file: $file)
  }
`;

export const AdminCardPage = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cardSets, setCardSets] = useState([]);
  const [files, setFiles] = useState([]);

  // GraphQL queries
  const { data } = useQuery(GET_CARD_SETS);

  // GraphQL mutations
  const [uploadFile] = useMutation(UPLOAD_FILE);

  useEffect(() => {
    if (data && data.getSets) {
      setCardSets(data.getSets);
    }
  }, [data]);

  const onSaveHandler = async files => {
    setOpen(false);
    setFiles(files);
    const foo = await uploadFile({ variables: { file: files[0] } });
    console.log("FOO", foo);
  };

  return (
    <div
      id="rootCardPage"
      style={{ display: "flex", flex: 1, flexDirection: "column" }}
    >
      <AdminHeader {...props} position={"static"} />
      <main
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column"
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Ajouter cartes
            </Typography>
            <Formik
              initialValues={{ cardText: "", cardSet: "" }}
              validationSchema={addCardValidationSchema}
              validate={() => {
                const errors = {};
                if (!files.length) {
                  errors.file = "Veuillez ajouter une image";
                }
                return errors;
              }}
              onSubmit={values => {
                const errors = {};
                console.log("submit");
                console.log(values);
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                touched,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="cardText"
                    label="Texte carte"
                    name="cardText"
                    type="text"
                    autoFocus
                    value={values.cardText}
                    onChange={handleChange}
                  />

                  {errors.cardText && touched.cardText && (
                    <FormControl fullWidth>
                      <Typography>{errors.cardText}</Typography>
                    </FormControl>
                  )}
                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Jeu de cartes
                    </InputLabel>
                    <Select
                      native
                      value={values.cardSet}
                      onChange={handleChange}
                      label="Jeu de cartes"
                      inputProps={{
                        name: "cardSet",
                        id: "outlined-age-native-simple"
                      }}
                    >
                      <option aria-label="None" value="" />
                      {cardSets.map((cardSet, index) => (
                        <option
                          key={`${cardSet.name}${index}`}
                          value={cardSet.name}
                        >
                          {cardSet.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  {errors.cardSet && touched.cardSet && (
                    <FormControl fullWidth>
                      <Typography fullWidth>{errors.cardSet}</Typography>
                    </FormControl>
                  )}
                  <FormControl margin="normal" fullWidth>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setOpen(true)}
                    >
                      Ajouter une image
                    </Button>
                  </FormControl>

                  {errors.file && (
                    <FormControl fullWidth>
                      <Typography>{errors.file}</Typography>
                    </FormControl>
                  )}

                  <FormControl margin="normal" fullWidth>
                    <Button
                      variant="contained"
                      color="secondary"
                      type={"submit"}
                    >
                      Confirmer
                    </Button>
                  </FormControl>
                </form>
              )}
            </Formik>
          </div>
        </Container>

        <DropzoneDialog
          acceptedFiles={["image/*"]}
          cancelButtonText={"Annuler"}
          submitButtonText={"Valider"}
          maxFileSize={5000000}
          open={open}
          onClose={() => setOpen(false)}
          onSave={onSaveHandler}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
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
