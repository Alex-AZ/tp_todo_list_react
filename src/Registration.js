import React, { Component } from 'react';

class Registration extends Component {
    initialState = {
        login: "",
        password: "",
        confirmPassword: ""
    };

    state = this.initialState;

    handleModify = event => {
        this.props.modifyInfoLoggedUser(this.state.login, this.state.password, this.state)
        this.setState(this.initialState)
    }

    handleHome = event => {
        this.props.changeToHome();
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            const user = {
                id: this.state.login, pwd: this.state.password, tasks: []
            }
            this.props.addUser(user);
            this.setState(this.initialState);
        }
        else {
            alert("Your passwords are not identical")
            this.setState({ password: "", confirmPassword: "" })
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        // Les crochets servent à utiliser la valeur de la constante (ou variable) comme nom de propriété pour un objet
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <h2>Registration</h2>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        name="login"
                        id="login"
                        placeholder="Login"
                        value={this.state.login}
                        onChange={this.handleChange}
                        required
                        minLength="6"
                    /><br /><br />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                        minLength="8"
                    /><br /><br />

                    <label htmlFor="confirmPassword">Confirm your password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        required
                        minLength="8"
                    /><br /><br />
                    <input type="submit" value="Subscribe" /><br /><br />
                </form>
                <button onClick={this.handleHome}>Home</button>
            </div>
        );
    }
}

export default Registration;