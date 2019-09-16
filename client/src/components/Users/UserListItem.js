import React from "react";
import PropTypes from "prop-types";

const UserListItem = ({ user }) => {
  return (
    <div>
      <p>{user.name}</p>
    </div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListItem;
