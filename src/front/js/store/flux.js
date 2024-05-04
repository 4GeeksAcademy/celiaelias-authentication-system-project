const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signIn: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/sign_in", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
							password: password
						}),
					});
					const data = await resp.json();

					if (resp.ok) {
						localStorage.setItem("access_token", data.access_token);
						return true;
					} else {
						// Si hay un error, lógica para manejarlo (p. ej., mostrar un mensaje de error)
						console.log("Error signing in:", data.message);
						return false;
					}

				} catch (error) {
					console.log("Error signing in:", error);
					return false;
				}
			},
			signUp: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/sign_up", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
							password: password
						}),
					});
					const data = await resp.json();
					console.log(data);

					// Actualiza el estado global con la información del usuario
					setStore({ user: data });

					return data;
				} catch (error) {
					console.log("Error signing up", error);
				}
			},
			logOut: async () => {
				setStore({ user: null });
				localStorage.removeItem("access_token");
			},
		}
	};
};

export default getState;
