import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { dateStamp } from 'utils';
import { auth, db } from 'fb/fb';
import { getUser } from 'fb/auth';
import { doSaveWaistRecord } from 'fb/dbAPI';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      data: [],
      showAdd: false,
      newMeasurement: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    console.log('handleChange: value = ' + value);
    let newMeasurement = this.state.newMeasurement;
    newMeasurement = parseInt(value, 10);
    console.log('handleChange: newMeasurement = ' + newMeasurement);
    this.setState({ newMeasurement });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = auth.currentUser.uid;
    const date = dateStamp();
    const newMeasurement = this.state.newMeasurement;
    console.log(user)
    console.log(date);
    console.log(newMeasurement);
    db.ref(`waist/${user}/${date}`).set({ cm: newMeasurement });
    this.setState({ showAdd: false });
  }

  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
    if (this.state.showEdit) {
      this.setState({ showEdit: false });
    }
  }

  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    console.log(currentIndex);
    this.setState({ currentIndex });
  }

  getValidationState() {
    if (Number.isNaN(this.state.newMeasurement)) return 'success';
    else return 'error';
  }

  componentDidMount() {
    const user = getUser();
    if (user) {
      console.log('Component Did Mount!');
      const itemsRef = db.ref(`waist/${user}`);
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            date: item,
            cm: items[item].cm,
          });
        }
        this.setState({ data: newState });
      });
      console.log(JSON.stringify(this.state.data));
    }
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Waist Size</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="measurementInput" validationState={this.getValidationState()}>
              <ControlLabel>New Measurement</ControlLabel>
              <FormControl
                type="number"
                inputRef={input => this.textInput = input}
                placeholder="Enter Measurement"
                onChange={(event) => this.handleChange(event.target.value)}
              />
            </FormGroup>
            <FormControl.Feedback />
            <HelpBlock>Enter a number.</HelpBlock>
          </Modal.Body>
          <Modal.Footer className="center">
            <Button
              bsStyle="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>


        <Button bsStyle="primary" onClick={(event) => this.open('showAdd')}>
          New Measurement
        </Button>
      </div>
    );
  }
}
