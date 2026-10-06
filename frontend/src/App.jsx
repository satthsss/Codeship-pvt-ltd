import { useEffect, useState } from "react";

function App() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        native: ""
    });

    const [users, setUsers] = useState([]);

    // Get data from Django
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/contacts/")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/api/contacts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);

                // Add new record to table
                setUsers([...users, data]);

                alert("Form submitted successfully!");

                // Clear form
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    company: "",
                    native: ""
                });
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong!");
            });
    };

    return (
        <div>

            <h1>Contact Form</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Name:</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Phone Number:</label>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Email:</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Company:</label>

                    <input
                        type="text"
                        name="company"
                        placeholder="Enter your company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Native:</label>

                    <input
                        type="text"
                        name="native"
                        placeholder="Enter your native place"
                        value={formData.native}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <button type="submit">
                    Submit
                </button>

            </form>

            <hr />

            <h2>Details</h2>

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Native</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.company}</td>
                            <td>{user.native}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default App;