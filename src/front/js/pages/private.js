import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const myToken = localStorage.getItem("access_token");
	useEffect(() => {
		if (!myToken) {
			navigate('/signin');
		}
	});

	const handleLogOut = () => {
        actions.logOut();
        navigate("/signin");
      };

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo, you're logged, but you can logOut if you want</h1>
        	<button onClick={handleLogOut}>Log out</button>
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

