
// Login.js:
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { config } from '../../src/components/config/config';
const Swal = require('sweetalert2')
function Login() {
	const navigation = useNavigate()
	const [userRole, setUserRole] = useState("User Role");
	const [validated, set_Validated] = useState(false);
	const [form_Data, set_Form_Data] = useState({
		email: "",
		pass: "",
		role: ""
	});

	const submitFn = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		set_Validated(true);
	};
	const chngFn = (event) => {
		const { name, value } = event.target;
		set_Form_Data({
			...form_Data,
			[name]: value,
		});
	};

	const LoginApi = async () => {
		if (form_Data.email === "" || form_Data.pass === "") {
			alert("Please fill in all fields.");
			return;
		}
		else {
			let data = {
				email: form_Data.email,
				password: form_Data.pass,
				role: userRole
			}
			console.log("datass", data)
			let res = await fetch(config.serverUrl + "login", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			let response = await res.json();
			console.log("Login response:", response);
			if (response.status == 200) {
				localStorage.setItem("token", response.token);
				localStorage.setItem('username', response.data.username)
				localStorage.setItem("role", response.data.role)
				// window.location.href = "/dashboard";
				Swal.fire({
						title: 'Error!',
						text: 'User Login Successfully!',
						icon: 'error',
						confirmButtonText: 'Cool'
						})
										// ✅ Send state correctly
				navigation("/dashboard", {
					state: {
						name: response.data?.username
					}
				});
			} else {
				alert(response.message);
			}
		}
	}


	function UserDropdown() {
		return (
			<div className="d-flex justify-content-center">
				<DropdownButton
					variant="primary"
					title={userRole}  // ✅ dynamic title
					className="w-50"
					onSelect={(eventKey) => {
						if (eventKey === "1") setUserRole("admin");
						if (eventKey === "2") setUserRole("user");
					}}
				>
					<Dropdown.Item eventKey="1">Admin</Dropdown.Item>
					<Dropdown.Item eventKey="2">User</Dropdown.Item>
				</DropdownButton>

			</div>
		);
	}

	

	return (
		<Container>
			<Row className="justify-content-md-center mt-5">
				<Col xs={12} md={6}>
					<h2 className="text-center mb-4">Login</h2>
					<Form noValidate validated={validated} onSubmit={submitFn}>
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								value={form_Data.email}
								onChange={chngFn}
								required
								isInvalid={
									validated &&
									!/^\S+@\S+\.\S+$/.test(form_Data.email)
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a valid email address.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className="mb-3" controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="pass"
								value={form_Data.pass}
								onChange={chngFn}
								minLength={6}
								required
								isInvalid={
									validated && form_Data.pass.length < 6
								}
							/>
							<Form.Control.Feedback type="invalid">
								Password must be at least 6 characters long.
							</Form.Control.Feedback>
						</Form.Group>

						<Button onClick={LoginApi} variant="primary" type="button" className="w-100">
							Login
						</Button>
						<p onClick={() => navigation('/register')} className="accounttext">Already have an account? Please Sign-Up</p>

						<UserDropdown />
					</Form>

				</Col>
			</Row>
		</Container>
	);
}

export default Login;