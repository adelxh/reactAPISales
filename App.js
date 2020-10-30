/*********************************************************************************
* WEB422 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: Adel Akhmed Student ID: 105706170 Date: Oct 27, 2020
*
*
********************************************************************************/ 

// including all neccessary packages
import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Link, Switch, Redirect, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


// including the files paths
import Sales from './components/Sales';
import Sale from './components/Sale';
import NotFound from './components/NotFound';


// declaring main class
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recentlyViewed: [],
      searchId: ""
    };
    


    // Bind the method inside the constructor
    this.viewedSale = this.viewedSale.bind(this);
    this.updateSearchId = this.updateSearchId.bind(this);

  }

  

  // Method 1
  viewedSale(id) {
    if (this.state.recentlyViewed.indexOf(id) === -1) {	
    this.setState({
        recentlyViewed: [...this.state.recentlyViewed, id]
      })
  }}

// Method 2
  updateSearchId(e) {
    this.setState({
      searchId: e.target.value
    });
  }




  // outputting data
  render() {

    return (

      <div>
        <Navbar inverse collapseOnSelect staticTop>
          <Navbar.Header>
            <LinkContainer to="/">
              <Navbar.Brand>
                WEB422 - Sales
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {/* redirrecting on click */}
              <LinkContainer to="/Sales"> 

                <NavItem>
                  All Sales
                </NavItem>
              </LinkContainer>
              <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
                {this.state.recentlyViewed.length > 0 ?
                  this.state.recentlyViewed.map((id, index) => (
                    <LinkContainer to={`/Sale/${id}`} key={index}>
                      <MenuItem>
                        Sale: {id}
                      </MenuItem>
                    </LinkContainer>
                  )) :
                  <MenuItem>
                    ...
                  </MenuItem>
                }
              </NavDropdown>
            </Nav>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl type="text" onChange={this.updateSearchId} placeholder="Sale ID" />
              </FormGroup>{''}
              <Link className="btn btn-default" to={"/Sale/" + this.state.searchId}>Search</Link>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <Grid>
          <Row>
            <Col md={12}>

              {/* Routes */}
              <Switch>

                {}
                <Route exact path="/" render={() => (
                  <Redirect push to={"/Sales"} />
                )} />

                {}
                <Route exact path="/Sales" render={() => (
                  <Sales />
                )} />

                {}
                <Route path="/Sale/:id" render={(props) => (
                  <Sale id={props.match.params.id} viewedSale={this.viewedSale} />
                )} />

                {}
                <Route render={() => (
                  <NotFound />
                )} />

              </Switch>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  } 
}



export default App;