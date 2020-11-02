import React, { Component } from 'react';

class Connection extends Component {
    initialState = {
        userLogin: "",
        userPassword: ""
    };

    state = this.initialState;

    handleSubscribe = event => {
        this.props.changeToFormSuscribe();
    }

    handleChange = event => {
        const { name, value } = event.target;
        // Equivaut à :
        // const name = event.target.name;
        // const value = event.target.value;

        // Les crochets servent à utiliser la valeur de la constante (ou variable) comme nom de propriété pour un objet
        this.setState({
            [name]: value
        });
    }

    /* handleChangeLogin = event => {
        this.setState({
            userLogin: event.target.value
        });
    }

    handleChangePassword = event => {
        this.setState({
            userPassword: event.target.value
        });
    } */

    handleSubmit = event => {
        event.preventDefault();

        const { userLogin, userPassword } = this.state;

        this.props.verifyLogin(userLogin, userPassword);
        this.setState(this.initialState);
    }

    render() {
        return (
            <div>
                <h2>Connection</h2>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        name="userLogin"
                        id="login"
                        placeholder="Login"
                        value={this.state.userLogin}
                        onChange={this.handleChange}
                        /* onChange={this.handleChangeLogin} */
                        required
                        minLength="6"
                    /><br></br><br></br>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="userPassword"
                        id="password"
                        placeholder="Password"
                        value={this.state.userPassword}
                        onChange={this.handleChange}
                        /* onChange={this.handleChangePassword} */
                        required
                        minLength="8"
                    />
                    <input type="submit" value="Sign in" /><br /><br />
                    <input onClick={this.handleSubscribe} type="submit" value="Registration" />
                </form>
            </div>
        );
    }
}

export default Connection;
