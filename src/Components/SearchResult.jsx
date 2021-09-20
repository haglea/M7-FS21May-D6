import React from 'react';
import SingleSearch from "./SingleSearch";
import { Col, Container, Form, Button, Row } from "react-bootstrap";
import uniqid from "uniqid"
import { connect } from "react-redux";
import { handleFetch } from "../actions";

const mapDispatchToProps = (dispatch) => ({
  handleFetch: (baseEndpoint, query, limit) => dispatch(handleFetch(baseEndpoint, query, limit)),
});

class SearchResult extends React.Component {
  
  state = {
      query: "",
      jobs: [],
      categories: []
    }

  baseEndpoint = "https://remotive.io/api/remote-jobs?search="
  limit = "&limit=6"

  handleChange = (e) => {    
    this.setState({ query: e.target.value})     
    console.log(this.state.query)
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.props.handleFetch(this.baseEndpoint + this.state.query + this.limit)
  }
  
  componentDidMount = async () => { 
    try {
      let categoriesResponse = await fetch(`https://strive-jobs-api.herokuapp.com/jobs/categories`)
      let jobCategories = await categoriesResponse.json()
      this.setState({ categories: jobCategories })
      console.log(this.state.categories)
    } catch (e) {
      console.log(e);
      return e;
    }
  }        

  filterJobs = async (e) => {
      e.preventDefault()
      this.props.handleFetch("https://strive-jobs-api.herokuapp.com/jobs?category=" + `${e.target.value}` + this.limit)
  }


    render() {
      return (
 
          <Container>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <Row className="justify-content-md-center">
                    <Form.Group as={Col} controlId="formGridSearch">         
                      <Form.Control type="text" placeholder="What job are you looking for?" value={this.state.query} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridButton">      
                        <Button type="search" variant="outline-success">Search</Button>
                    </Form.Group>         
                  </Row>
                </Form>   
              </Col>

              <Col>
                <Form>
                  <Form.Group controlId="exampleForm.SelectCustom" >
                    <Form.Label>Filter Jobs by Category</Form.Label>
                    <Form.Control as="select" custom onChangeCapture={this.filterJobs}> 
                   {
                      this.state.categories.map(c => <option>{c}</option>)                   
                      }
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row> 
           
            <Row>

                  {this.props.jobs.elements && this.props.jobs.elements.slice(0, 6).map((jobData) => <SingleSearch key={uniqid()} data={jobData} />)} 
              
            </Row>
          </Container>    
     
        );  
    }    
}

export default connect((s) => s, mapDispatchToProps)(SearchResult);