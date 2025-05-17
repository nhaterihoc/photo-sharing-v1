import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("/api/user/list")
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <List>
      {users.map((user) => (
        <ListItem
          button
          key={user._id}
          component={Link}
          to={`/users/${user._id}`}
        >
          <ListItemText primary={`${user.first_name} ${user.last_name}`} />
        </ListItem>
      ))}
    </List>
  );
}
