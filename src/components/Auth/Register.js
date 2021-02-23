import React from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import firebase from '../../firebase';
import md5 from 'md5';

const initialForm = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
}

function Register() {
  const [form, setForm] = useState(initialForm); 
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [usersRef, setUsersRef] = useState(null)

  // console.log(firebase.database);

  const handleChange = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value } ))
  }

  const handleInputError = (fieldName) => (
    errors && errors.message.toLowerCase().includes(fieldName) ? "error": ""
  )

  const displayErrors = errors => {
    return <p>{errors.message}</p>
  }

  const isFormValid = () => {
    let error;
    if (isFormEmpty(form)) {
      error = {message: "enter in all fields please"}
      setErrors(error);
      return false; 
    } else if(!isPasswordValid(form)) {
      error  = { message: 'Password is invalid' };
      setErrors(error);
      return false
    } else {
      return true
    }
  }

  const isPasswordValid = ({password, passwordConfirmation}) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }

  const isFormEmpty = ({username, email, password, passwordConfirmation}) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(isFormValid()) {
      setErrors(null)
      setLoading(true)
      firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(createdUser => {

          console.log(createdUser)
          createdUser.user.updateProfile({
            displayName: form.username,
            photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
          })
          setForm(initialForm)
          setLoading(false)
        }).then(() => {
          // saveUser(createdUser).then(() => {
          //   console.log('user saved');
          // })
        })
        .catch(err => {
          console.log(err);
          setLoading(false)
          setErrors(err)
        })
    }
  }

  const saveUser = createdUser => {

  }
  
  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header ad="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"/>
            Resigter
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input className={handleInputError('username')} fluid name="username" icon="user" iconPosition="left" placeholder="Username" onChange={handleChange} type="text" value={form.username} />
              <Form.Input className={handleInputError('email')} fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={handleChange} type="email" value={form.email} />
              <Form.Input  className={handleInputError('password')} fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={handleChange} type="password" value={form.password} />
              <Form.Input className={handleInputError('password confirmation')} fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={handleChange} type="password" value={form.passwordConfirmation} />
              <Button disabled={loading} color="orange" fluid size="large">Submit</Button>

            </Segment>
          </Form>
            { errors && 
              <Message error>
                <h3>Error
                  {displayErrors(errors)}
                </h3>
              </Message>
            } 
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Register
