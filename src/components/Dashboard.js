import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { config } from '../../src/components/config/config';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { useLocation } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";
const token = localStorage.getItem("token")
const username = localStorage.getItem("username")
const role = localStorage.getItem("role")
console.log("role", role)

function Dashboard() {
    const navigate = useNavigate();
    // const location = useLocation();
    const [user, setUser] = useState([]);
    // const [getData, setGetData] = useState({});
    // const userData = location.state;
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData()
    }, [])

    const handleShow = (id) => {
        const selectedUser = user.find((item) => item.id === Number(id));
        if (selectedUser) {
            navigate(`/edit/${id}`, { state: selectedUser });
        }
    };

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
            console.log("setusers", response.data)
            setUser(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (confirmDelete) {
            try {
                await fetch(config.serverUrl + `delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                alert("User deleted successfully");
                fetchData(); // Refresh list AFTER deletion
            } catch (error) {
                console.log(error);
                alert("Delete failed");
            }
        } else {
            console.log("User cancelled delete");
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        await fetch(config.serverUrl + "logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // ✅ Remove token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // Redirect to login
        window.location.href = "/";
    };


    const handleSearch = async (value) => {
        setSearch(value);
        try {
            let res = await fetch(
                `${config.serverUrl}search?search=${value}`
            );
            let resp = await res.json();
            if (resp.status === 404) {
                setUser([]);
            } else {
                setUser(resp.data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h4 className="text-center mt-4">Dashboard</h4>
            {/* <h2>Welcome {role === "admin" ? "Admin" : "User"}</h2> */}
            <h5>Welcome to <span style={{ textTransform: "capitalize", color: "green" }}>{username}</span></h5>
            <div className="d-flex justify-content-end mt-3">
                <Button style={{ width: "150px" }} variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
            <Form inline>
                <Row>
                    <Col xs="3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fa fa-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
            </Form>

            <Row className="justify-content-md-center mt-4">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th><i className="fa-solid fa-user"></i> Name</th>
                            <th><i className="fa-solid fa-envelope"></i> Email</th>
                            <th><i className="fa-solid fa-phone"></i></th>
                             <th>Edit</th>
                            {role === "admin" && (
                                <tr>                                   
                                    <th>Delete</th>
                                </tr>
                            )}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            user && user.length > 0 ? (
                                user.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index+1}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td onClick={() => handleShow(item.id)}>
                                                        <i className="fa-solid fa-edit"></i>
                                                    </td>
                                        {
                                            role === "admin" && (
                                                <>                                                    
                                                    <td onClick={() => deleteUser(item.id)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </td>
                                                </>
                                           )
                                        }
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No Data Found
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default Dashboard