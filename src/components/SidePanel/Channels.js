import React, { Component } from 'react';

import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends Component {
  state={
    channels: [],
    channelName: '',
    channelDetails: '',
    modal: false
  }

  handelChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  closeModal = () => this.setState({modal: false})

  openModal = () => this.setState({modal: true})

  render() {
    const { channels, modal } = this.state
    return (
      <>
        <Menu.Menu style={{ paddingBottom: '2em'}}>
          <Menu.Item>
            <span>
              <Icon name="exchange"/> CHANNELS
            </span>
            ({ channels.length }) <Icon name="add" onClick={this.openModal}/>
          </Menu.Item>
          {/* Channels */}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content> 
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label="name of channel"
                  name="channelName"
                  onChange={this.handleChange}/>

                <Input
                  fluid
                  label="about the channel"
                  name="channelDetails"
                  onChange={this.handleChange}/>
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted>
              <Icon name="checkmark"/> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove"/> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default Channels;
