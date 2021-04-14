import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from "react-router-dom"
import firebase from '../../firebase'
import Login from './Login';
class Register extends Component {
  state={
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  } 

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state

    return (

      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"/>
            Register
          </Header>

          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>

              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                value={username}/>

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                onChange={this.handleChange}
                type="email"
                value={email}/>

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}/>

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}/>

                <Button color="orange" fluid size="large">Submit</Button>

            </Segment>

            </Form>
            <Message>Already a user? <Link to="/login">click here</Link></Message>

        </Grid.Column>

      </Grid>
    );
  }
}

export default Register;
