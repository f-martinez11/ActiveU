/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import {Pagination, Button, ButtonGroup} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../api/events.js';
import ProfileList from './ProfileList.jsx';
/* eslint-enable no-unused-vars */

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingEvent: false,
      showingMyEvents: true,
      myEventsClass:'buttons-profile',
      otherEventsClass:'none',
      current:'own'
    };
    this.buttonClickMyEvents = this.buttonClickMyEvents.bind(this);
    this.buttonClickOtherEvents = this.buttonClickOtherEvents.bind(this);
  }

  toggleCreatingEvent() {
    this.setState({
      creatingEvent: !this.state.creatingEvent
    });
  }

  toggleMyEvents(b) {
    this.setState({
      creatingEvent: b
    });
  }

  buttonClickMyEvents()
  {
    this.setState
    ({
      myEventsClass:'buttons-profile',
      otherEventsClass:'none',
      current:'own'
    });
  }
  buttonClickOtherEvents()
  {
    this.setState
    ({
      myEventsClass:'none',
      otherEventsClass:'buttons-profile',
      current:'others'
    });
  }
  render() {
    return (
      <div >
        <div className="container-fluid">
          <div className ='row'>
            <div className="col-md-1"></div>
            <div className="col-md-10 box events">
              <div className="row">
                <div className="col-md-4">
                  <img src="img/avatar/hombre1.png" alt="Profile picture" className='profile-pic'/>
                </div>
                <div className="info col-md-8">
                  <h1>{Meteor.user().username}</h1>
                  <h2>Semestre: 6</h2>
                  <h2>Carrera: Ing. Sistemas</h2>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-1'></div>
                <div className='col-md-10  box events profile-events'>
                  <div className='row botones-perfil'>
                    <ButtonGroup>
                      <Button className={this.state.myEventsClass} onClick={this.buttonClickMyEvents}>Mis Eventos</Button>
                      <Button className={this.state.otherEventsClass} onClick={this.buttonClickOtherEvents}>Eventos que te interesan</Button>
                    </ButtonGroup>
                    <ProfileList ownEvents={this.props.ownEvents} otherEvents={this.props.otherEvents} currentList={this.state.current}/>
                  </div>
                </div>
                <div className='col-md-1'></div>
              </div>
            </div>
            <div className='col-md-1'></div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  ownEvents: PropTypes.array,
  otherEvents: PropTypes.array
};

export default createContainer(() => {
  Meteor.subscribe('events');
  return {
    currentUser: Meteor.user(),
    ownEvents: Events.find({ owner: Meteor.userId() }).fetch(),
    otherEvents: Events.find({ people: { $all: [Meteor.user().username] } }).fetch()
  };
}, Profile);
