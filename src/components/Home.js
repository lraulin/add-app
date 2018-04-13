import React, { Component } from 'react';
import withAuthorization from 'components/auth/withAuthorization';
import { dbAPI } from 'fb';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    dbAPI.onceGetUsers().then((snapshot) =>
      this.setState(() => ({
        users: snapshot.val(),
      })),
    );
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accesible by every signed in user.</p>
        {!!users && <UserList users={users} />}
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database</p>
    {Object.keys(users).map((key) => <div key={key}>{users[key].username}</div>)}
  </div>
);

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
