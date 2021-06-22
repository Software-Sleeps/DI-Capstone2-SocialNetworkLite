
import {Alert} from 'react-bootstrap'
import React, {useState} from 'react'

function BadRequestAlert() {
    let [show, setShow] = useState(true);

    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Error Logging in! Please Try Again!
          </p>
        </Alert>
      );
    }
    return (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
    <p>
      Error Logging in! Please Try Again!
    </p>
  </Alert>)
  }
  
  export default BadRequestAlert
