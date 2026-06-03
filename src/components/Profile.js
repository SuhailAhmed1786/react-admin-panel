import React from 'react';
import NavigationBar from './NavigationBar';
import { useState, useEffect } from "react";
import {Row, Col, Container, Form, Button} from 'react-bootstrap';
import { config } from '../../src/components/config/config';
import {MyContext} from '../../src/components/context'

export default function Profile() {
  const mydata = React.useContext(MyContext);
  // console.log("mydatass", mydata)
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    bio: ""
  });


  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    console.log("profile data:", data);
    setUser(data);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const UpdateProfile = async () => { 
    const token = localStorage.getItem("token");  
    try {     
      const res = await fetch(config.serverUrl + `profile/${user.id}`, {   
        method: "PUT",    
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
        body: JSON.stringify(user),  
      });   
      const data = await res.json();    
      console.log("updateddata:", data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }

  }

  return (
    <Container fluid>
      <NavigationBar />
        <Row className="justify-content-md-center mt-5">        
            <Col md={6}>
                <h2 className="mb-4">Profile</h2>           
                <Form>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" value={user.name} onChange={handleChange} />
                    </Form.Group>           
                    <Form.Group className="mb-3" controlId="formBasicEmail">    
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} />
                    </Form.Group>   

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>  
                        <Form.Control type="text" placeholder="Enter phone" name="phone" value={user.phone} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">          
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" name="address" value={user.address} onChange={handleChange} />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBio">
                        <Form.Label>Bio</Form.Label>    
                        <Form.Control as="textarea" rows={3} placeholder="Enter bio" name="bio" value={user.bio} onChange={handleChange} />
                    </Form.Group>   

                    <Button variant="primary" onClick={UpdateProfile}>
                        Update Profile  
                    </Button>   
                </Form> 

            </Col>  
        </Row>                         
    </Container>
  );
}