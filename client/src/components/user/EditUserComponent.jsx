import React, { Component } from "react";
import userService from "../../services/user.service";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const roles = { user: ["user"], mod: ["moderator"], admin: ["admin"] };

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      role: [],
      open: false,
      message: null,
    };
    this.saveUser = this.saveUser.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    userService
      .getUserByAdmin(window.localStorage.getItem("id"))
      .then((res) => {
        console.log(window.localStorage.getItem("id"));
        let user = res.data;
        console.log(user);
        this.setState({
          username: user.username,
          email: user.email,
          role: user.roles,
        });
      });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleChange = (event) => {
    this.setState({ role: event.target.value });
  };

  saveUser = (e) => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      email: this.state.email,
      roles: this.state.role,
    };
    userService
      .updateUserByAdmin(window.localStorage.getItem("id"), user)
      .then((res) => {
        this.setState({ message: "User added successfully." });
        this.props.history.push("/users");
      });
  };
  makeStyles = (theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          Edit User
        </Typography>

        <form variant="outlined" className={makeStyles.formControl}>
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
          <InputLabel htmlFor="grouped-select">Role</InputLabel>
          <Select
            labelId="grouped-select"
            id="grouped-select"
            value={this.state.role}
            onChange={this.handleChange}
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
      </div>
    );
  }
}
const style = {
  display: "flex",
  justifyContent: "center",
};

export default EditUserComponent;
