import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")

	const handleSubmit = async (event) => {
		event.preventDefault()
		const msg = await actions.signUp(email, password, passwordConfirmation);

		alert(msg)
	}

	return (
		<div className="container text-center mt-5">
			<h1>Ingresa tus datos para crear una cuenta</h1>
			<div className="row">
				<div className="col"></div>
				<div className="col">
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
							<input type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPasswordConfirmation" className="form-label">Password</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPasswordConfirmation"
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
				<div className="col"></div>
			</div>

			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
