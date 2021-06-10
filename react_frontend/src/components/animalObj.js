import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {
    Card, CardImg, CardBody, Col,
    CardTitle, CardSubtitle, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';

const animal = (props) => {
    
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (                     
        <Col md={3} sm={6} xs={6}>
            <p>
                <Card>
                    <CardImg width="300" height="250" src={props.imageURL}  alt="Card image cap" />
                    <center>
                        <CardBody>
                            <CardTitle tag="h6">{props.name} - {props.breedType}</CardTitle>
                            <CardSubtitle tag="h8" className="mb-2 text-muted">age : {props.age} - zip : {props.zip}</CardSubtitle>                        
                        </CardBody>
                    </center>
                    <Button onClick={toggle}>details</Button>
                    <Modal isOpen={modal} toggle={toggle} scrollable={true} >
                        <img src={props.imageURL} width="200" height="150" alt="Card image cap" />
                        <ModalHeader>{props.name}</ModalHeader>
                        <ModalBody>
                            <p>{props.description}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={toggle}>Back</Button>
                        </ModalFooter>
                    </Modal>                 
                </Card>
            </p>
        </Col>       
    )
};

export default animal;