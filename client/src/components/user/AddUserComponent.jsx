import React, { Component } from "react";
import userService from "../../services/user.service";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const roles = { user: ["user"], mod: ["moderator"], admin: ["admin"] };
class AddUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      role: [],
      open: false,
      message: null,
    };
    this.saveUser = this.saveUser.bind(this);
  }

  saveUser = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      roles: this.state.role,
    };
    userService.createUserByAdmin(user).then((res) => {
      this.setState({ message: "User added successfully." });
      this.props.history.push("/admin");
      this.setState({ open: true });
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
    this.props.history.push("/admin");
  };
  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Add User
        </Typography>
        <form style={formContainer}>
          <TextField
            type="text"
            placeholder="Username"
            fullWidth
            margin="normal"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <TextField
            type="text"
            placeholder="Email"
            fullWidth
            margin="normal"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <TextField
            type="password"
            placeholder="Password"
            fullWidth
            margin="normal"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <InputLabel htmlFor="grouped-select">Role</InputLabel>
          <Select
            labelId="grouped-select"
            id="select"
            defaultValue=""
            value={this.state.role}
            onChange={this.onChange}
            name="role"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={roles.admin}>Admin</MenuItem>
            <MenuItem value={roles.user}>User</MenuItem>
            <MenuItem value={roles.mod}>Moderator</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={this.saveUser}>
            Save
          </Button>
        </form>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="success">This is a success message!</Alert>
        </Snackbar>
      </div>
    );
  }
}
const formContainer = {
  display: "flex",
  flexFlow: "row wrap",
};

const style = {
  display: "flex",
  justifyContent: "center",
};

export default AddUserComponent;
