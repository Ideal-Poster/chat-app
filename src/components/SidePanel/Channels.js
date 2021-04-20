import React, { Component } from 'react';

import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions/index';

const initialChannelState = {
  channelName: '',
  channelDetails: '',
}
class Channels extends Component {
  state={
    user: this.props.currentUser,
    channels: [],
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
    modal: false
  }

  componentDidMount() {
     this.addListeners()
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val())
      this.setState({ channels: loadedChannels })
    })
  }

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;
    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    }

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState(initialChannelState);
        this.closeModal();
        console.log('channel added');
      }).catch(err => {
        console.error(err);
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel()
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  changeChannel = channel => {
    this.props.setCurrentChannel(channel)
  }

  displayChannels = channels => (
    channels.length > 0 && channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}>
          # {channel.name}
      </Menu.Item>
    ))
  )

  isFormValid = ({ channelName, channelDetails }) => (channelName && channelDetails)

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
          { this.displayChannels(channels) }
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content> 
            <Form onSubmit={this.handleSubmit}>
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
            <Button color="green" inverted onClick={this.handleSubmit}>
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

export default connect(
  null,
  { setCurrentChannel }
)(Channels);
