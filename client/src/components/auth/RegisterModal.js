import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginModal extends Component {
  state = {
    modal: false,
    username: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    // Scrap this idea? Like why doesn't this work?
    // Oh... I forgot i made tokens presistant through refresh. Have to logout to test this feature lmfao

    if (this.state.modal) {
      if (isAuthenticated) {
        // Fixed but once logged out i can't click any nav links again? TODO
        
        this.toggle();
        // console.log("Test");
      }
    }
  }


  toggle = () => {
      this.props.clearErrors();
      this.setState({
          modal: !this.state.modal
      });
  };


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e =>{
      e.preventDefault();
      // ^ really neet feature. Overrules htmls normal onsubmit
      const{ username, password} = this.state;
      // new user obj
      const newUser = {
          username,password
      };
      //Calls register with new user object. // By default all users are security level 0. 
      // TODO admin - May implement admin changing ranks of users. Process is the same via axios but works by 
      // sending a post to /users/:id  where id = users ID. 

      // Idek how that would work with tokens just brain storming.

      // User may need to login and out for this process to happen, idk if i can be bothered to code a force update 
      // Token feature on the db end

      this.props.register(newUser);
      
  }



  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='username'>Username</Label>
                <Input
                  type='username'
                  id='username'
                  placeholder='username'
                  name='username'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='password'>Password</Label>
                <Input
                  name='password'
                  id='password'
                  type='password'
                  className='mb-3'
                  placeholder='Password'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}



const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });

export default connect(
    mapStateToProps,
    { register, clearErrors}
)(LoginModal);