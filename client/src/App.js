import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

function App() {
  return (
    <Query pollInterval={500} query={GET_BOOKS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <AppBar position="static">
                <h3>LIST OF BOOKS</h3>
                <h4><Link to="/create">Add Book</Link></h4>
              </AppBar>
              <Container maxWidth="md">
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.books.map((book, index) => (
                        <tr key={index}>
                          <td><Link to={`/show/${book._id}`}>{book.title}</Link></td>
                          <td>{book.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Container>
            </Container>
          </Fragment>
        );
      }}
    </Query>
  );
}

export default App;
