import React, { useRef, useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
// import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";

import {
  Paper,
  Link,
  Grid,
  Button,  
} from "@material-ui/core";
// Picker
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,  
  DatePicker
} from "@material-ui/pickers";

const ADD_BOOK = gql`
  mutation AddBook(
    $isbn: String!
    $title: String!
    $author: String!
    $description: String!
    $publisher: String!
    $published_year: Int!
  ) {
    addBook(
      isbn: $isbn
      title: $title
      author: $author
      description: $description
      publisher: $publisher
      published_year: $published_year
    ) {
      _id
    }
  }
`;

function DatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === "" ? null : value}
    />
  );
}

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

const useStyles = makeStyles(theme => ({
  form: {
    margin: theme.spacing(2)
  },
  formElement: {
    width: "100%",
    margin: theme.spacing(1)
  },
  container: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  iconButton: {
    margin: theme.spacing(2)
  }
}));

export default function AddBook(props) {
  const classes = useStyles();

  return (
    <Mutation mutation={ADD_BOOK} onCompleted={() => props.history.push("/")}>
      {(addBook, { loading, error }) => (
        <Container maxWidth="lg" className={classes.container}>
          <AppBar position="static">
            <h3>ADD BOOK</h3>
            <Link to="/">
              <Fab
                color="secondary"
                aria-label="return"
                className={classes.iconButton}
              >
                <KeyboardReturnIcon />
              </Fab>
            </Link>
          </AppBar>
          <Paper className={classes.paper}>
            <Form
              onSubmit={onSubmit}
              initialValues={{ }}
              validate={validate}
              render={({
                handleSubmit,
                reset,
                submitting                
              }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Paper style={{ padding: 16 }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          required
                          name="bookIsbn"
                          component={TextField}
                          type="text"
                          label="ISBN"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          required
                          name="bookTitle"
                          component={TextField}
                          type="text"
                          label="Title"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="bookAuthor"
                          fullWidth
                          required
                          component={TextField}
                          type="text"
                          label="Author"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="bookDescription"
                          fullWidth
                          required
                          component={TextField}
                          type="text"
                          label="Description"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="bookPublisher"
                          fullWidth
                          required
                          component={TextField}
                          type="text"
                          label="Publisher"
                        />
                      </Grid>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12}>
                          <Field
                            name="pubyear"
                            component={DatePickerWrapper}
                            fullWidth
                            margin="normal"
                            label="Publish Year"
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <Grid item style={{ marginTop: 16 }}>
                        <Button
                          type="button"
                          variant="contained"
                          onClick={reset}
                          disabled={submitting}
                        >
                          Reset
                        </Button>
                      </Grid>
                      <Grid item style={{ marginTop: 16 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={submitting}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </form>
              )}
            />
          </Paper>
        </Container>
      )}
    </Mutation>
  );
}
