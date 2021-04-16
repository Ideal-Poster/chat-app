import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from "react-router-dom"
import firebase from '../../firebase'
import md5 from 'md5';

class Register extends Component {
  state={
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  } 

  isFormValid = () => {;
    let errors =[];
    let error;
    if(this.isFormEmpty(this.state)) {
      error = { message: "Fill in all the fields" }
      this.setState({errors: errors.concat(error)});
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid"}
      this.setState({errors: errors.concat(error)});
      return false;
    } else {
      return true
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation}) => {
    return !username.length ||
           !email.length ||
           !password.length ||
           !passwordConfirmation.length;
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if(password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  saveUser = createdUser => {
    // save user to realtime database
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    })
  }

  handleInputErrors = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ?
    "error" : "";
  }

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleSubmit = async event => {
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      event.preventDefault();

      // create user
      let createdUser
      try {
        createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
      } catch (error) {
        console.log(error);
        this.setState({ errors: this.state.errors.concat(error), loading: false })
      }

      // save user to realtime database
      try {
        await createdUser
        .user
        .updateProfile({
          displayName: this.state.username,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?=identicon`
        })
        this.saveUser(createdUser).then(() => {
          console.log('user saved');
        })
      } catch (error) {
        console.log(error);
        this.setState({ errors: this.state.errors.concat(error), loading: false })
      }
    }
  }


  render() {
    const { username, email, password, passwordConfirmation, loading, errors } = this.state

    return (

      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h1" icon color="orange" textAlign="center">
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
                value={username}
                className={this.handleInputErrors(errors, 'username')}
                />

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

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
                className={this.handleInputErrors(errors, 'password')}/>

              <Button
                className={loading ? 'loading' : ''}
                disabled={loading}
                color="orange"
                fluid
                size="large">Submit</Button>
            </Segment>
            </Form>

            { errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
              </Message>
            )
              
            }

            <Message>Already a user? <Link to="/login">click here</Link></Message>

        </Grid.Column>

      </Grid>
    );
  }
}

export default Register;
