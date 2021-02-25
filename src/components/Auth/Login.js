import React from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import firebase from '../../firebase';

const initialForm = {
  username: "",
  email: "",
  password: "",
}

function Login() {
  const [form, setForm] = useState(initialForm); 
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value } ))
  }

  const handleInputError = (fieldName) => (
    errors && errors.message.toLowerCase().includes(fieldName) ? "error": ""
  )

  const displayErrors = errors => {
    return <p>{errors.message}</p>
  }

  const isFormValid = ({email, password}) => email && password

  const handleSubmit = event => {
    event.preventDefault()
    if (isFormValid(form)) {
      setLoading(true)
      setErrors(null)
      firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password)
        .then(signedInUser => {
          console.log(signedInUser);
        })
        .catch(err => {
          console.error(err)
          setErrors(err)
          setLoading(false)
        })
    }
  }

  
  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header ad="h2" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet"/>
            Log In
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>

              <Form.Input className={handleInputError('email')} fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={handleChange} type="email" value={form.email} />
              <Form.Input  className={handleInputError('password')} fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={handleChange} type="password" value={form.password} />
              <Button disabled={loading} color="violet" fluid size="large">Submit</Button>

            </Segment>
          </Form>
            { errors && 
              <Message error>
                <h3>Error
                  {displayErrors(errors)}
                </h3>
              </Message>
            } 
          <Message>Don't have an account? <Link to="/register">Register</Link></Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Login
