import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import React from "react";

const AppRouter = () => {
  return (
    <div style={style}>
      <Router>
        <Switch>
          <Route path="/admin" exact component={ListUserComponent} />
          <Route path="/admin/users" component={ListUserComponent} />
          <Route path="/new" component={AddUserComponent} />
          <Route path="/edit-user" component={EditUserComponent} />
        </Switch>
      </Router>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
