import "./App.css";

import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useMatch,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import fetchModel from "./lib/fetchModelData";

const Layout = ({ children }) => {
  const matchUsers = useMatch("/users/:userId");
  const matchPhotos = useMatch("/photos/:userId");
  const userId = matchUsers?.params.userId || matchPhotos?.params.userId || "";

  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    if (!userId) {
      setCurrentUserName("");
      return;
    }
    fetchModel(`/api/user/${userId}`)
      .then((user) => {
        setCurrentUserName(`${user.first_name} ${user.last_name}`);
      })
      .catch((err) => {
        console.error("Failed to load user for TopBar:", err);
        setCurrentUserName("");
      });
  }, [userId]);

  return (
    <>
      <TopBar currentUserName={currentUserName} />
      {children}
    </>
  );
};

const App = (props) => {
  return (
    <Router>
      <Layout>
        <Grid container spacing={2}>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </Router>
  );
};

export default App;
