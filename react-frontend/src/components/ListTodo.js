import React, { Component } from "react";
import TodoService from "./TodoService";
import axios from "axios";
import ListTodoRow from "./ListTodoRow";
import { Alert } from "reactstrap";
import { Badge } from 'reactstrap';
import { Media } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class IndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = { items: "" };
    this.todoService = new TodoService();

    //bind
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentWillMount() {
    this.fillData();
  }

  fillData() {
    var thisRef = this;
    this.todoService.all(data => {
      thisRef.setState({ items: data });
    });
  }

  tabRow() {
    if (this.state.items instanceof Array) {
      var thisRef = this;
      return this.state.items.map(function(object, i) {
        return (
          <ListTodoRow
            onDelete={thisRef.onDelete}
            onUpdate={thisRef.onUpdate}
            obj={object}
            key={i}
          />
        );
      });
    }
  }

  onDelete(event) {
    let id = event.target.id;
    var thisRef = this;
    this.todoService.delete(id, () => {
      thisRef.fillData();
    });
  }

  onUpdate(event) {
    let id = event.target.id;
    this.props.history.push("/update/" + id);
  }

  handleAdd() {
    this.props.history.push("/add");
  }

  render() {
    return (
      <div className="container">
      <h1>Heading <Badge color="secondary">New</Badge></h1>
      <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Media>
      <Media left href="#">
        <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
      </Media>
      <Media body>
        <Media heading>
          Media heading
        </Media>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </Media>
</Media>
        <div className="panel panel-default">
          <div className="panel-heading">List of Tasks</div>
          <div className="panel-body">
            <p>Click on the task description to edit</p>
            <Alert color="danger">
              This is a danger alert with{" "}
              <a href="#" className="alert-link">
                an example link
              </a>. Give it a click if you like.
            </Alert>
            <table id="todo-list" className="table table-bordered">
              <tbody>{this.tabRow()}</tbody>
            </table>
          </div>
          <div className="panel-footer">
            <button onClick={this.handleAdd} className="btn btn-info">
              New task
            </button>
          </div>
        </div>
      </div>
    );
  }
}
