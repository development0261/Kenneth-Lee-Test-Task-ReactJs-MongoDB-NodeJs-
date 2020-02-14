import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/Navbar.component";
import Userslist from "./components/Userslist.component";
import Form from "./components/Form.component";

function App() {
    return (
      <Router>
          <Navbar />
          <br />
          <Route path="/" exact component={Userslist} />
          <Route path="/adduser" component={Form}/>
      </Router>
    );
}

export default App;