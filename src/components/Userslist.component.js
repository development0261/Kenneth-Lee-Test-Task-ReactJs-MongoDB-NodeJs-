import React, { Component }  from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.phone}</td>
        <td>{props.user.address}</td>
        <td>{props.user.zipcode}</td>
    </tr>
)

export default class Userslist extends Component {
    constructor(props) {
        super(props);
        
        this.state = { users: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                console.log(response.data);
                this.setState({users: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    usersList() {
        return this.state.users.map(currentuser => {
            return <User user={currentuser} key={currentuser._id} />;
        })
    }

	render(){
        return (
        <div className="container">
            <h3 className="text-center m-4">Users List</h3>
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-12 col-xs-2">
                    <Link to="/adduser" className="nav-link btn btn-primary m-2"> Add </Link>
                </div>
            </div>
            <div className="container">
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">Address</th>
                    <th scope="col">Zipcode</th>
                    </tr>
                </thead>
                <tbody>
                    { this.usersList() }
                </tbody>
                </table>
            </div>
          </div>      
        );
	}
}