// Filename - App.js
// It contains the Form, its Structure
// and Basic Form Functionalities

import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./style.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { config } from '../../src/components/config/config';
const Register = () => {
	const navigation = useNavigate()
	const [validated, set_Validated] = useState(false);
	const [form_Data, set_Form_Data] = useState({
		user: "",
		email: "",
		phoneNo: "",
		pass: "",
		confimPass: "",
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
const notify = () => toast("Wow so easy!");
	const RegisterApi = () => {
		if (!form_Data.user || !form_Data.email || !form_Data.phoneNo || !form_Data.pass || !form_Data.confimPass) {
			// alert("Please fill all the fields");
			// return;
		}
		else {
			let regdata = {
				"username": form_Data.user,
				"email": form_Data.email,
				"phone": form_Data.phoneNo,
				"password": form_Data.pass,
				"confirmpassword": form_Data.confimPass
			}
			console.log('registerdata', regdata)
			fetch(config.serverUrl + 'register', {
				method: 'POST',
				body: JSON.stringify(regdata),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},

			})
				.then((response) => response.json())
				.then((response) => {
					console.log("resp", response)
					if (response.status == 200) {						
						 alert("User Registered Successfully!");
						 window.location.href = '/';
					} else{
						response.message && alert(response.message);
					}
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}
		return (
			<Container>
				<Row className="justify-content-md-center mt-5">
					<Col xs={12} md={6}>
						<h2 className="text-center mb-4">Register</h2>
						<Form noValidate validated={validated} onSubmit={submitFn}>
							<Form.Group controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									name="user"
									value={form_Data.user}
									onChange={chngFn}
									pattern="^[a-zA-Z0-9]+$"
									required
									isInvalid={
										validated &&
										!/^[a-zA-Z0-9]+$/.test(form_Data.user)
									}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid username (alphanumeric
									characters only).
								</Form.Control.Feedback>
							</Form.Group>

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
							<Form.Group controlId="phoneNumber">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control
									type="number"
									name="phoneNo"
									value={form_Data.phoneNo}
									onChange={chngFn}
									pattern="^\d{10}$"
									required
									isInvalid={
										validated &&
										!/^\d{10}$/.test(form_Data.phoneNo)
									}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid 10-digit phone number.
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="password">
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
							<Form.Group controlId="confirmPassword" >
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									name="confimPass"
									value={form_Data.confimPass}
									onChange={chngFn}
									minLength={6}
									required
									pattern={form_Data.pass}
									isInvalid={
										validated &&
										form_Data.confimPass !== form_Data.pass
									}
								/>
								<Form.Control.Feedback type="invalid">
									Passwords do not match.
								</Form.Control.Feedback>
							</Form.Group>
							<Button
								onClick={RegisterApi ||notify}
								variant="primary"
								type="submit"
								className="w-50 mt-4 mx-auto d-block"
							>
								Register
							</Button>
							<p onClick={() => navigation('/')} className="accounttext">Already have an account? Please Sign-In</p>
						</Form>
					</Col>
				</Row>
			</Container>
		)
	}


	export default Register

// import "./style.css";
// import { React, useState } from "react";

// function Register() {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [contact, setContact] = useState("");
//     const [gender, setGender] = useState("male");
//     const [subjects, setSubjects] = useState({
//         english: true,
//         maths: false,
//         physics: false,
//     });
//     const [resume, setResume] = useState("");
//     const [url, setUrl] = useState();
//     const [selectedOption, setSelectedOption] =
//         useState("");
//     const [about, setAbout] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(
//             firstName,
//             lastName,
//             email,
//             contact,
//             gender,
//             selectedOption,
//             subjects,
//             resume,
//             url,
//             about
//         );
//         // Add your form submission logic here
//     };

//     const handleSubjectChange = (sub) => {
//         setSubjects((prev) => ({
//             ...prev,
//             [sub]: !prev[sub],
//         }));
//     };
//     const handleReset = () => {
//         // Reset all state variables here
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setContact("");
//         setGender("male");
//         setSubjects({
//             english: true,
//             maths: false,
//             physics: false,
//         });
//         setResume("");
//         setUrl("");
//         setSelectedOption("");
//         setAbout("");
//     };

//     return (
//         <div className="App">
//             <h1>Form in React</h1>
//             <fieldset>
//                 <form action="#" method="get">
//                     <label for="firstname">
//                         First Name*
//                     </label>
//                     <input
//                         type="text"
//                         name="firstname"
//                         id="firstname"
//                         value={firstName}
//                         onChange={(e) =>
//                             setFirstName(e.target.value)
//                         }
//                         placeholder="Enter First Name"
//                         required
//                     />
//                     <label for="lastname">Last Name*</label>
//                     <input
//                         type="text"
//                         name="lastname"
//                         id="lastname"
//                         value={lastName}
//                         onChange={(e) =>
//                             setLastName(e.target.value)
//                         }
//                         placeholder="Enter Last Name"
//                         required
//                     />
//                     <label for="email">Enter Email* </label>
//                     <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) =>
//                             setEmail(e.target.value)
//                         }
//                         placeholder="Enter email"
//                         required
//                     />
//                     <label for="tel">Contact*</label>
//                     <input
//                         type="tel"
//                         name="contact"
//                         id="contact"
//                         value={contact}
//                         onChange={(e) =>
//                             setContact(e.target.value)
//                         }
//                         placeholder="Enter Mobile number"
//                         required
//                     />
//                     <label for="gender">Gender*</label>
//                     <input
//                         type="radio"
//                         name="gender"
//                         value="male"
//                         id="male"
//                         checked={gender === "male"}
//                         onChange={(e) =>
//                             setGender(e.target.value)
//                         }
//                     />
//                     Male
//                     <input
//                         type="radio"
//                         name="gender"
//                         value="female"
//                         id="female"
//                         checked={gender === "female"}
//                         onChange={(e) =>
//                             setGender(e.target.value)
//                         }
//                     />
//                     Female
//                     <input
//                         type="radio"
//                         name="gender"
//                         value="other"
//                         id="other"
//                         checked={gender === "other"}
//                         onChange={(e) =>
//                             setGender(e.target.value)
//                         }
//                     />
//                     Other
//                     <label for="lang">
//                         Your best Subject
//                     </label>
//                     <input
//                         type="checkbox"
//                         name="lang"
//                         id="english"
//                         checked={subjects.english === true}
//                         onChange={(e) =>
//                             handleSubjectChange("english")
//                         }
//                     />
//                     English
//                     <input
//                         type="checkbox"
//                         name="lang"
//                         id="maths"
//                         checked={subjects.maths === true}
//                         onChange={(e) =>
//                             handleSubjectChange("maths")
//                         }
//                     />
//                     Maths
//                     <input
//                         type="checkbox"
//                         name="lang"
//                         id="physics"
//                         checked={subjects.physics === true}
//                         onChange={(e) =>
//                             handleSubjectChange("physics")
//                         }
//                     />
//                     Physics
//                     <label for="file">Upload Resume*</label>
//                     <input
//                         type="file"
//                         name="file"
//                         id="file"
//                         onChange={(e) =>
//                             setResume(e.target.files[0])
//                         }
//                         placeholder="Enter Upload File"
//                         required
//                     />
//                     <label for="url">Enter URL*</label>
//                     <input
//                         type="url"
//                         name="url"
//                         id="url"
//                         onChange={(e) =>
//                             setUrl(e.target.value)
//                         }
//                         placeholder="Enter url"
//                         required
//                     />
//                     <label>Select your choice</label>
//                     <select
//                         name="select"
//                         id="select"
//                         value={selectedOption}
//                         onChange={(e) =>
//                             setSelectedOption(
//                                 e.target.value
//                             )
//                         }
//                     >
//                         <option
//                             value=""
//                             disabled
//                             selected={selectedOption === ""}
//                         >
//                             Select your Ans
//                         </option>
//                         <optgroup label="Beginers">
//                             <option value="1">HTML</option>
//                             <option value="2">CSS</option>
//                             <option value="3">
//                                 JavaScript
//                             </option>
//                         </optgroup>
//                         <optgroup label="Advance">
//                             <option value="4">React</option>
//                             <option value="5">Node</option>
//                             <option value="6">
//                                 Express
//                             </option>
//                             <option value="t">
//                                 MongoDB
//                             </option>
//                         </optgroup>
//                     </select>
//                     <label for="about">About</label>
//                     <textarea
//                         name="about"
//                         id="about"
//                         cols="30"
//                         rows="10"
//                         onChange={(e) =>
//                             setAbout(e.target.value)
//                         }
//                         placeholder="About your self"
//                         required
//                     ></textarea>
//                     <button
//                         type="reset"
//                         value="reset"
//                         onClick={() => handleReset()}
//                     >
//                         Reset
//                     </button>
//                     <button
//                         type="submit"
//                         value="Submit"
//                         onClick={(e) => handleSubmit(e)}
//                     >
//                         Submit
//                     </button>
//                 </form>
//             </fieldset>
//         </div>
//     );
// }

// export default Register;