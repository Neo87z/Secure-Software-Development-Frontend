import React, { Component } from "react";
import { Link } from 'react-router-dom';



import axios from 'axios';



import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
      authStatus: false,
      Login: false,
      submitted: false,
      Type: ""
    };
  }




  onChangeEmail = (e) => {

    this.setState({

      Email: e.target.value

    });
    console.log(this.state.Email)
  };

  onChangePassword = (e) => {

    this.setState({

      Password: e.target.value

    });
    console.log(this.state.Password)
  };



  onSubmit = (e) => {


    console.log(this.state.Email)
    console.log(this.state.Password)

    e.preventDefault();

    const UserData = {
      EmpoyeeID: this.state.Email,
      Password: this.state.Password,


    }
    let BaseURlX = "http://localhost:8089/auth/login"
    axios.post(BaseURlX, UserData)
      .then(
        (res => {

          console.log(res)
          if (res.data.Login == true) {
            localStorage.setItem("token", res.data.token)
            console.log("jere")
            this.setState({
              Login: true
            })
            localStorage.setItem("Type", res.data.Type)
            this.Authenication()


          }
        })
      );







  };


  Authenication = () => {
    let BaseURlX = "http://localhost:8089/auth/Authenicate"
    axios.get(BaseURlX, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "x-dsi-api-key": "$2b$10$BD90Kkg4axivQpJAP1FDiOApkdqLtZ8j4q93qQOFATu/voN1ZGsd"
      },
    })
      .then(
        (res => {
          this.sleep(2000).then(r => {
            window.location = `/message-portal`
          })

        })
      );
  }


  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }




  render() {
    return (
      <div className="flex flex-col min-h-screen overflow-hidden">

        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="grow">

          {/*  Page illustration */}
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>

          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">Welcome back. Please Login To Continue.</h1>
                </div>

                {/* Form */}
                <div className="max-w-sm mx-auto">
                  <form>

                  </form>

                  <form onSubmit={this.onSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Employee ID</label>
                        <input
                          value={this.state.Email}
                          onChange={this.onChangeEmail}

                          id="email" type="text" className="form-input w-full text-gray-300" placeholder="EmployeeID" required />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input

                          value={this.state.Password}
                          onChange={this.onChangePassword}


                          id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <div className="flex justify-between">
                          <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="text-gray-400 ml-2">Keep me signed in</span>
                          </label>
                          <Link to="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                      </div>
                    </div>
                  </form>
                  <div className="text-gray-400 text-center mt-6">
                    Don’t you have an account? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </main>

      </div>
    );
  }
}
