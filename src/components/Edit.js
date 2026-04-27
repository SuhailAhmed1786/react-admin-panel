import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { config } from '../../src/components/config/config';
const token = localStorage.getItem("token")
function Edit() {
  let navigation = useNavigate()
  const location = useLocation();
  const userData = location.state;
  const [getdata, setGetData] = useState(userData || {
    username: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (location.state) {
      setGetData(location.state);
    }
  }, [location.state]);

  useEffect(() => async () => {
    fetchData()
  }, [])


  const fetchData = async () => {
    try {
      let res = await fetch(config.serverUrl + "dashboard", {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      let response = await res.json()
    }

    catch (error) {
      console.log(error)
    }

  }

  const editUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${config.serverUrl}edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(getdata),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      const response = await res.json();
      // console.log("resss111", response)
      if (response.status == 200) {
        alert("User updated successfully");
        fetchData(); // Refresh list after update
        navigation('/dashboard')
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-4">Edit Users</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <div className="form-group">
                  <input type="text"
                    // defaultValue={userDatas.username}
                    className="form-control"
                    // id="username"
                    value={getdata.username || ""}
                    // onChange={(e) => setUsername(e.target.value)}
                    onChange={(e) => setGetData({ ...getdata, username: e.target.value })
                    }
                  />
                </div>
                <Form.Label>Email</Form.Label>
                <div className="form-group">
                  <input type="email"
                    value={getdata.email || ""}
                    className="form-control"
                    // id="email"
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => setGetData({ ...getdata, email: e.target.value })}

                  />
                </div>
                <Form.Label>Phone</Form.Label>
                <div className="form-group">
                  <input type="phone"
                    value={getdata.phone || ""}
                    className="form-control"
                    id="phone"
                    // onChange={(e) => setPhoneNo(e.target.value)}
                    onChange={(e) => setGetData({ ...getdata, phone: e.target.value })}
                  />
                </div>
              </Form.Group>
            </Form>
            <div style={{ marginLeft: 80 }}>
              <Button variant="primary" onClick={() => navigation('/dashboard')}>
                Back
              </Button>
              <span> </span>
              <Button variant="primary" onClick={() => editUser(getdata.id)}>
                Update
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default Edit;