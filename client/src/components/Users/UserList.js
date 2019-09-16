import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/users";
import UserListItem from "./UserListItem";

const UserList = ({ getAllUsers, users }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  return (
    <Fragment>
      <h1>User List</h1>
      {users.map(user => (
        <UserListItem user={user} key={user._id} />
      ))}
    </Fragment>
  );
};

UserList.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(UserList);
