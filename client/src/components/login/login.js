import React, { Component } from 'react';
import './login.css';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';

const User = () => {
    return (<h1>¡Te damos la bienvenida!</h1>)
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {user: ''};
        this.state = {pwd: ''}
        this.state = {customers: []}
        this.state = {click: false}
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /*componentDidMount(){
        fetch('/api/login')
            .then(res => res.json())
            .then(customers => this.setState({customers:customers}, () => console.log("Customer fetched...", customers)));
    }*/

    /*componentDidUpdate(){
        console.log(this.state.customers.status);
        if (this.state.customers.status==="ok"){
            console.log("todo bien")
        }
        else{
            console.log("todo mal");
        }
    }*/

    handleClick(event){
        this.setState({click: true})
    }
    
    handleChange(event) {
        console.log(event.target.name)
        if (event.target.name === "user")
          this.setState({user: event.target.value});
        else
          this.setState({pwd: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        //alert('A name was submitted: ' + this.state.user);
        var data = {user: this.state.user, pwd: this.state.pwd};
        fetch('/api/login',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })    
        .then(res => res.json())
        .then(customers => this.setState({customers:customers}, () => console.log("Customer fetched...", customers)))
        .then (res => {
            if (this.state.customers.status==="ok"){
                alert('¡Te damos la bienvenida '+this.state.customers.msg.name+' '+this.state.customers.msg.lastname);
                
                <Redirect to='/user'/>;
                
            }
            else{
                alert('Error al iniciar sesión ');
            } 
        });
        
    }

  render() {
    return (
        <Router>
            <div className="Login">
            <Route path="/" exact strict render={
          () => {
              return(
                <form onSubmit={this.handleSubmit}> 
                <div>
                    <label>
                    Name:
                    <input type="text" name="user" value={this.state.user} onChange={this.handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                    Password:
                    <input type="password" name="pwd" value={this.state.pwd} onChange={this.handleChange}/>
                    </label>
                    </div>
                <input type="submit" value="Enviar" />
                </form>
              );}}/>
            
                <Route path="/user" exact strict render={
                () => {
                    return ( <h1>¡Te damos la bienvenida!</h1>);
                }
                }/>
            </div>

        
        </Router>
    );
  }
}

export default Login;
