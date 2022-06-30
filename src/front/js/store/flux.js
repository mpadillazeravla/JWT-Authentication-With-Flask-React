const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            message: null,
            demo: [{
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            auth: false,
            userInfo: null
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            login: (email, password) => {
                // console.log(email, password);
                fetch(process.env.BACKEND_URL + '/api/login', {
                        method: "POST",
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            setStore({
                                auth: true
                            })
                        }
                        return response.json()
                    })
                    .then((data) => {
                        localStorage.setItem("token", data.access_token)
                    })
            },

            register: (newemail, newpassword) => {
                fetch(process.env.BACKEND_URL + '/api/user', {
                        method: "POST",
                        body: JSON.stringify({
                            "email": newemail,
                            "password": newpassword
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((response) => {
                        if (response.status === 200) {}
                        return response.json()
                    })

            },

            logout: () => {

                localStorage.removeItem("token")
                setStore({
                    auth: false
                })
            },


            getUserInfo: () => {
                fetch(process.env.BACKEND_URL + '/api/profile', {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`

                        }
                    })
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        setStore({
                            userInfo: data.email
                        })
                    })
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({
                        message: data.message
                    })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
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
                setStore({
                    demo: demo
                });
            }
        }
    };
};

export default getState;