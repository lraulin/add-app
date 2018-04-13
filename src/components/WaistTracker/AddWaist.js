import React, { Component } from 'react';
import { Panel, PanelGroup, Button, ButtonToolbar, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class AddWaist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: '',
    };
  }
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Add Waist Measurement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Waist Measurement</ControlLabel>
              <FormControl
                type="text"
                inputRef={(input) => (this.textInput = input)}
                placeholder=""
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer className="center">
            <Button
              bsStyle="primary"
              measurement={this.props.measurement}
              onClick={this.props.submitRecord}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
