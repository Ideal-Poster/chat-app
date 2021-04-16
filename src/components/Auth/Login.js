import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from "react-router-dom"
import firebase from '../../firebase'


class Login extends Component {
  state={
    email: '',
    password: '',
    errors: [],
    loading: false
  } 

  saveUser = createdUser => {
    // save user to realtime database
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    })
  }

  isFormValid = ({ email, password }) => email && password

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleInputErrors = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ?
    "error" : "";
  }  

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      try {
        const signedInUser = await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
        console.log(signedInUser)
      } catch (error) {
        console.log(error);
        this.setState({
          errors: this.state.errors.concat(error),
          loading: false
        })
      }
    }
  }

  render() {
    const { email, password, loading, errors } = this.state
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet"/>
            Login
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>


              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                onChange={this.handleChange}
                type="email"
                value={email}
                className={this.handleInputErrors(errors, 'email')}
                />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
                className={this.handleInputErrors(errors, 'password')}/>

              <Button
                className={loading ? 'loading' : ''}
                disabled={loading}
                color="violet"
                fluid
                size="large">Submit</Button>
            </Segment>
            </Form>

            { errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
            )}

            <Message>Don't have and account? <Link to="/register ">register</Link></Message>

        </Grid.Column>

      </Grid>
    );
  }
}

export default Login;
