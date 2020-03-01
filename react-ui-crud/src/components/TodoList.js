import React from "react";
import Service from "../Services/Service";
import Paginator from "./Paginator";
import { pagination, filteredItem } from "../util/databaTable";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: {},
      todoListRecords: [],
      filterText: ""
    };
    this.onPaginate = this.onPaginate.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.generateTB = this.generateTB.bind(this);
  }

  onPaginate(currentPage) { 
    let todoList = { ...this.state.todoList };
    let paginatedTodoList = pagination(
      currentPage,
      5,
      this.state.todoListRecords
    );
    todoList.pages = paginatedTodoList.pages;
    todoList.paginatedData = paginatedTodoList.paginatedData;
    todoList.paginatorData = paginatedTodoList.paginatorData;
    this.setState({ todoList });
  }

  onFilter(filterText) {
    this.setState({ filter: filterText });
    let todoList = { ...this.state.todoList };
    if (filterText.length) {
      let filteredTodoList = filteredItem(
        filterText,
        "title",
        5,
        this.state.todoListRecords
      );
      todoList.pages = filteredTodoList.pages;
      todoList.paginatedData = filteredTodoList.paginatedData;
      todoList.paginatorData = filteredTodoList.paginatorData;
    } else {
		console.log(this.state.todoList)
      let todoListRecords = [...this.state.todoListRecords];
      let paginatedTodoList = pagination(1, 5, todoListRecords);
      todoList.pages = paginatedTodoList.pages;
      todoList.paginatedData = paginatedTodoList.paginatedData;
      todoList.paginatorData = paginatedTodoList.paginatorData;
    }
    this.setState({
      todoList
    });
  }

  generateTB() {
    return this.state.todoList.paginatedData.map((todo, index) => (
      <tr key={todo.id}>
        <td>{todo.id}</td>
        <td>{todo.userId}</td>
        <td>{todo.title}</td>
        <td>{todo.completed ? "true" : "false"}</td>
      </tr>
    ));
  }

  async componentDidMount() {
    let service = new Service();
    let list = await service.list();
    let todoList = pagination(1, 5, list);
    this.setState({
      todoList,
      todoListRecords: list
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="form-group">
            <label htmlFor="filterData">Search</label>
            <input
              type="text"
              className="form-control"
              id="filterData"
              aria-describedby="filterHelp"
              placeholder="Search for data..."
              onChange={event => this.onFilter(event.target.value)}
            />
            <small id="filterHelp" className="form-text text-muted">
              Find any data you want...
            </small>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">USER ID</th>
                  <th scope="col">TITLE</th>
                  <th scope="col">COMPLETED</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.todoList).length !== 0 &&
                this.state.todoList.constructor === Object
                  ? this.generateTB()
                  : null}
              </tbody>
            </table>
          </div>
          {Object.keys(this.state.todoList).length !== 0 &&
          this.state.todoList.constructor === Object ? (
            <Paginator
              onPaginate={this.onPaginate}
              paginatorData={this.state.todoList.paginatorData}
              pages={this.state.todoList.pages}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default TodoList;