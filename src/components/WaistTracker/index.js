import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { dateStamp } from 'utils/utils';

export default class App extends Component {
  state = {
    showAdd: false,
    newMeasurement: {
      date: '',
      cm: '',
    },
  };

  updateNewMeasurement(value) {
    this.setState({ newMeasurement: parseInt(value) });
  }

  saveRecord() {
    const newMeasurement = {
      date: dateStamp(),
      cm: this.state.cm,
    };
    this.setState({ newMeasurement });
    console.log(this.state.newMeasurement.date);
    console.log(this.state.newMeasurement.cm);
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
    return null;
  }

  handleChange(event) {
    const newMeasurement
    this.setState({ newMeasurement.cm: event.target.value });
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
                value={this.state.newMeasurement.cm}
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
