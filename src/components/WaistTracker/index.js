import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { dateStamp } from 'utils';
import { db, fb } from 'fb';
import { auth } from 'fb/fb';

export default class App extends Component {
  state = {
    showAdd: false,
    newMeasurement: {
      date: '',
      cm: '',
    },
  };

  updateNewMeasurement(value) {
    const newMeasurement = { ...this.state.newMeasurement };
    newMeasurement.cm = parseInt(value, 10);
    this.setState({ newMeasurement });
  }

  saveRecord() {
    const user = auth.currentUser.uid;
    const newMeasurement = { ...this.state.newMeasurement };
    newMeasurement.date = dateStamp();
    console.log(newMeasurement.date);
    newMeasurement.cm = this.state.cm;
    this.setState({ newMeasurement });

    console.log(this.state.newMeasurement.date);
    console.log(this.state.newMeasurement.cm);
    db.doSaveWaistRecord(user, newMeasurement.date, newMeasurement.cm);
  }

  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
    if (this.state.showEdit) {
      this.setState({ showEdit: false });
    }
  };

  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    console.log(currentIndex);
    this.setState({ currentIndex });
  };

  getValidationState() {
    if (Number.isNaN(this.state.newMeasurement.cm)) return 'success';
    else return 'error';
  }

  handleChange(event) {
    const newMeasurement = { ...this.state.newMeasurement };
    newMeasurement.cm = event.target.value;
    this.setState({ newMeasurement });
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
                onChange={(event) => this.updateNewMeasurement(event.target.value)}
              />
            </FormGroup>
            <FormControl.Feedback />
            <HelpBlock>Enter a number.</HelpBlock>
          </Modal.Body>
          <Modal.Footer className="center">
            <Button
              bsStyle="primary"
              onClick={(event) => this.saveRecord()}
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
