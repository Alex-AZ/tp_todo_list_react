import React, { Component } from 'react';
import Registration from './Registration';
import Connection from './Connection';
import Form from './Form';
import List from './List';

class App extends Component {
  state = {
    users: [
      {
        id: "alexis42",
        pwd: "12345678",
        tasks: [
          { name: "make coffee", checked: false },
          { name: "Say hello", checked: true }
        ]
      },
      {
        id: "louise64",
        pwd: "87654321",
        tasks: []
      }
    ],
    userIndexConnected: -1,
    userLoginConnected: "",
    userTasksConnected: [],
    isIncriptionFormDisplayed: false,
  };

  //Mettre à jour les données du user connecté et aussi celle du même user mais dans le tableau des users
  //Première étape : réussir à afficher le formulaire de modification 
  //(le même composant que pour l'inscription) 
  //Deuxième étape : réussir à retourner à la todolist depuis l'interface de modification (bouton annuler)

  //Tests:
  modifyInfoLoggedUser = (login, password) => {
    const users = this.state;

    this.setState({
      users: users.filter((user) => {
        user.login = this.state.userLoginConnected;
      })
    })
    this.setState({
      userLoginConnected: {
        login: login, password: password,
        tasks: this.state.userLoginConnected,
      }
    })
  }
  ////

  deleteUser = () => {
    const { users, userLoginConnected, userTasksConnected } = this.state;
    if (window.confirm("Are you sure you would delete your account ?")) {
      this.setState({
        userLoginConnected: "", userTasksConnected: [],
        users: users.filter(user => user.id !== userLoginConnected && user.tasks !== userTasksConnected)
      })
    }
  }

  // Equivaut à la méthode push "users: [...this.state.users,user]"
  addUser = (user) => {
    let userExists = false
    this.state.users.forEach((x) => {
      if (x.id === user.id) {
        userExists = true
        alert("The login is already in use")
      }
    })
    if (userExists === false) {
      this.setState({
        users: [...this.state.users, user]
      }, this.changeToHome);
    }
  }

  /*  handleNewAccountClick = () => {
     this.setState({ isClicked: !this.state.isClicked });
   } */
  /* changeToForm = () => {
    this.setState({isIncriptionFormDisplayed: !this.isIncriptionFormDisplayed})
  } */


  changeToFormSuscribe = () => {
    this.setState({ isIncriptionFormDisplayed: true });
  }

  changeToHome = () => {
    this.setState({ isIncriptionFormDisplayed: false });
  }

  userLogOut = () => {
    this.setState({ userIndexConnected: -1, userLoginConnected: "", userTasksConnected: [] });
  }

  checkLogin = (login, password) => {
    let connected = false;
    this.state.users.forEach((user, index) => {
      if (login === user.id && password === user.pwd) {
        connected = true;

        this.setState({
          userIndexConnected: index,
          userLoginConnected: user.id,
          userTasksConnected: user.tasks
        });
      }
    });

    if (!connected) {
      alert("This login/password combination does not exist !");
    }
  }

  updateUserTasks = () => {
    this.setState({
      users: this.state.users.map(user => {
        if (user.id === this.state.userLoginConnected) {
          user.tasks = this.state.userTasksConnected;
        }
        return user;
      })
    });
  }

  addTache = task => {
    /* let mesTaches = this.state.taches.slice();
    mesTaches.push({ name: tache });
    this.setState({taches: mesTaches}); */
    this.setState({
      userTasksConnected: [...this.state.userTasksConnected,
      { name: task, checked: false }]
    }, this.updateUserTasks);
  }

  checkTache = index => {
    this.setState({
      userTasksConnected: this.state.userTasksConnected.map((task, i) => {
        if (index === i) {
          task.checked = !task.checked;
        }
        return task;
      })
    }, this.updateUserTasks);
  }

  removeChecked = () => {
    if (window.confirm("Are you sure you want to delete your completed todos ?")) {
      /* this.setState({ taches: this.state.taches.filter((tache, i) => {
        return !tache.checked;
      })}); */
      this.setState({ userTasksConnected: this.state.userTasksConnected.filter(tache => !tache.checked) }, this.updateUserTasks);
    }
  }

  removeAllTasks = () => {
    if (window.confirm("Are you sure you want to delete your all todos ?")) {
      this.setState({ userTasksConnected: [] }, this.updateUserTasks);
    }
  }

  render() {
    const { userLoginConnected, userTasksConnected, isIncriptionFormDisplayed } = this.state;
    const wichForm = isIncriptionFormDisplayed !== true ?
    <Connection changeToFormSuscribe={this.changeToFormSuscribe} verifyLogin={this.checkLogin} /> :
    <Registration changeToHome={this.changeToHome} addUser={this.addUser} />
    

    return (
      <div>
        <h1>Todo List</h1>
        {
          userLoginConnected !== "" ?
            <div>
              <Form addTache={this.addTache} />
              <List taches={userTasksConnected} checkTache={this.checkTache} />
              <button onClick={this.removeChecked}>Delete completed tasks</button>
              <button onClick={this.removeAllTasks}>Delete all tasks</button><br /><br />
              <button onClick={this.userLogOut}>Log out</button><br /><br />
              <button onClick={this.deleteUser}>Delete your account</button><br /><br />
              <button onClick={this.modifyInfoLoggedUser}>Change your account</button>
            </div>
            :
            wichForm
        }
      </div>
    );

    /* let formOrList = <Connection verifyLogin={this.checkLogin} />;
    if (this.state.userLoginConnected) {
      formOrList = <TodoList />;
    }

    return (
      {formOrList}
    ); */
  }
}

export default App;
