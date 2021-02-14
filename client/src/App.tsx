import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Home from './components/home/home';
import LoginPage from './pages/loginPage/loginPage';


const App = (props: any) => {
  return (
    <div className="App">
      {props.user.name ? <Home /> : <LoginPage />}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
})


export default connect(mapStateToProps)(App);
