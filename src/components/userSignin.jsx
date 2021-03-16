import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import axios from 'axios';
import Header from './headerNavbar';

class userSignin extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      SigninError: null,
    };
  }

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        console.log('email');
        this.setState({ email: e.target.value });
        break;

      case "password":
        this.setState({ password: e.target.value });
        break;

      default:
        break;
    }
  };

  submitSignin = (e) => {
      e.preventDefault();

      axios.post('http://localhost:5000/user/Signin',{
        email:  this.state.email,
        password: this.state.password
      })
      .then((res) => {
        console.log(res);
       alert(res.data.message);
      
      }).catch((err) => {
        console.log(err);
      })
  };

  render() {
    return (
      <>
      <Header />
         
                  <Card style={{ width: "40vw", marginLeft: "auto", marginRight: "auto", marginTop:'4vh'}}>
          <Card.Header
            style={{
              backgroundColor: "#6c6c6c",
              color: "orange",
              fontFamily: '"Merriweather", serif',
              fontSize: "1.5rem",
              textAlign: "center"
            }}
            as="h5"
          >
            Signin
          </Card.Header>
          <Card.Body>
            <Form onSubmit={(e) => this.submitSignin(e)}>
              <Form.Group
                style={{ textAlign: "left" }}
                controlId="formBasicEmail"
                onChange={(e) => this.userTyping('email',e)}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control value={this.state.email} type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group
                style={{ textAlign: "left" }}
                controlId="formBasicPassword"
                onChange={(e) => this.userTyping('password',e)}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control value={this.state.password} type="password" placeholder="Password" />
              </Form.Group>

                <Form.Group style={{textAlign: 'left',fontSize:'1.5vh'}}>
                <Link to="/Signup"><a>Don't have an account? Signup</a></Link>
                </Form.Group>
              

              {
                    this.state.SigninError ? 
                    <Form.Text style={{paddingBottom: '0.6vh'}} className="text-danger">
                    {this.state.SigninError}
                  </Form.Text>
                    :
                    null
                }
                <div style={{textAlign: "center"}}>
              <Button variant="secondary" type="submit">
                Submit
              </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

      </>
    );
  }
}
export default userSignin;
