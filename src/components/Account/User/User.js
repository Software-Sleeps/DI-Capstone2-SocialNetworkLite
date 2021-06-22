import React, { Component } from 'react';
import {Container, Row, Col, FormControl} from 'react-bootstrap'
class User extends Component {
    render() {
        return (
            <div>
                 <Container>
          <Row>
              <Col className="p-3">
              
              <FormControl placeholder="Change Display Name"/>
                
              </Col>
              <Col></Col>
          </Row>
      </Container>

                
            </div>
        );
    }
}

export default User;