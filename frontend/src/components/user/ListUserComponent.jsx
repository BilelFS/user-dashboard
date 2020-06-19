import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import userService from "../../services/user.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

class ListUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: null,
      isLoading: false,
    };

    this.reloadUserList = this.reloadUserList.bind(this);
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList() {
    this.setState({ isLoading: false });
    userService.getAdminBoard().then(
      (response) => {
        this.setState({
          users: response.data,
        });
        this.setState({ isLoading: true });
        console.log(this.state.users);
      },
      (error) => {
        this.setState({
          users:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  deleteUser(id) {
    userService.deleteUserByAdmin(id).then((res) => {
      this.setState({ message: "User deleted successfully." });
      this.setState({
        users: this.state.users.filter((user) => user.id !== id),
      });
    });
  }

  editUser(id) {
    window.localStorage.setItem("id", id);
    this.props.history.push("/edit-user");
  }

  addUser() {
    window.localStorage.removeItem("id");
    this.props.history.push("/new");
  }

  render() {
    return (
      <div>
        <Typography variant="h4" style={style}>
          User Details
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.addUser()}
        >
          Add User
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell align="right">Email</TableCell>
              {/* <TableCell align="right">password</TableCell> */}
              <TableCell align="right">updateAt</TableCell>
              <TableCell align="right">createdAt</TableCell>
            </TableRow>
          </TableHead>
          <Fade
            in={this.state.isloading}
            style={{
              transitionDelay: this.state.isloading ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
          <TableBody>
            {this.state.users.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                {/* <TableCell align="right">{row.password}</TableCell> */}
                <TableCell align="right">
                  {new Date(row.createdAt).toLocaleTimeString()}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.updatedAt).toLocaleTimeString()}
                </TableCell>
                <TableCell align="right" onClick={() => this.editUser(row.id)}>
                  <CreateIcon />
                </TableCell>
                <TableCell
                  align="right"
                  onClick={() => this.deleteUser(row.id)}
                >
                  <DeleteIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
};

export default ListUserComponent;
