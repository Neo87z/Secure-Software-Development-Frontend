import React, { Component } from "react";
import { Link } from 'react-router-dom';

import axios from 'axios';



import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { Base64 } from "js-base64";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
      authStatus: false,
      Type: "",
      submitted: false,
      Token: "",
      EncryptedMessageData: [],
      DecodedArra: []
    };
  }


  async componentDidMount() {
    this.Authenication()
    this.GetSavedMessages()
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



  EncryptMessage = (e) => {
    const Data = Base64.encode(this.state.Email)
    return Data

  }

  SubmitData = (e) => {
    e.preventDefault();
    const Data = this.EncryptMessage()
    console.log(Data, "Here")

    const Message = {
      Message: Data,
    }


    let BaseURlX = "http://localhost:8089/auth/SaveMessages"
    axios.post(BaseURlX, Message, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "x-dsi-api-key": "$2b$10$BD90Kkg4axivQpJAP1FDiOApkdqLtZ8j4q93qQOFATu/voN1ZGsd"
      }
    })
      .then(
        (res => {
          this.GetSavedMessages()
        })
      );


  }

  GetSavedMessages = (e) => {

    let BaseURlX = "http://localhost:8089/auth/GetSavedMessages"
    axios.get(BaseURlX, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "x-dsi-api-key": "$2b$10$BD90Kkg4axivQpJAP1FDiOApkdqLtZ8j4q93qQOFATu/voN1ZGsd"
      }
    })
      .then(
        (res => {
          this.setState({
            EncryptedMessageData: res.data.Message
          })
          console.log(this.state.EncryptedMessageData)

          this.sleep(2000).then(r => {
            this.DecodeMessages()
          })
        })

      );


  }

  FileUpload = (e) => {
    console.log('here')
    console.log(e.name)
    const data = new FormData();
    data.append('FileName', e.name)
    data.append('FileName', e)
    let BaseURlX = "http://localhost:8089/auth/api/upload"
    axios.post(BaseURlX, data, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "x-dsi-api-key": "$2b$10$BD90Kkg4axivQpJAP1FDiOApkdqLtZ8j4q93qQOFATu/voN1ZGsd"
      }
    })
      .then(
        (res => {
          this.GetSavedMessages()
        })
      );


  }

  DecodeMessages = (e) => {
    //const Data2 = Base64.decode(Data)
    this.state.EncryptedMessageData.map((val, key) => {
      console.log(this.state.EncryptedMessageData, 'hii2')
      const data = Base64.decode(this.state.EncryptedMessageData[key])
      let { DecodedArra } = this.state;
      DecodedArra.push(data);



    })
    console.log(this.state.DecodedArra, 'hii')



  }

  LogiNData = (e) => {
    e.preventDefault();
    window.location = `/signin`



  }



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

          console.log(res.data)
          if (res.data.auth == true) {
            this.setState({
              authStatus: true,
              Type: localStorage.getItem("Type"),

            })
          }
        })
      );
  }


  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }




  render() {
    return (

      < section className="relative" >
        {
          !this.state.authStatus && (

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                {/* Section header */}
                <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                <div className="max-w-3xl mx-auto text-center pb-12">
                  <h1 className="h1 mb-4" data-aos="fade-up">Unauthorized Access</h1>
                  <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">Please Login Again To Continue Using The Website.</p>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button onClick={this.LogiNData} className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Login</button>
                  </div>
                </div>

                {/* Pricing tables */}


              </div>
            </div>


          )
        }

        {
          this.state.authStatus && (

            <section className="relative">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                  {/* Section header */}

                  {
                    this.state.Type == "Worker" && (
                      <div className="max-w-3xl mx-auto text-center pb-12">
                        <h1 className="h1 mb-4" data-aos="fade-up">ABC Company Worker Message Portal</h1>
                        <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">Send Data/Messages Securely.</p>
                      </div>
                    )
                  }

                  {
                    this.state.Type == "Manager" && (
                      <div className="max-w-3xl mx-auto text-center pb-12">
                        <h1 className="h1 mb-4" data-aos="fade-up">ABC Company Manager Message Portal</h1>
                        <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">Send Data/Messages Securely.</p>
                      </div>
                    )
                  }



                  {/* Pricing tables */}
                  <div>

                    {/* Pricing toggle */}
                    <div className="flex justify-center mb-16" data-aos="fade-up" data-aos-delay="400">
                      <div className="inline-flex items-center">



                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Message <span className="text-red-600">*</span></label>


                        <input
                          value={this.state.Email}
                          onChange={this.onChangeEmail}


                          id="full-name" type="text" className="form-input w-full text-gray-300" placeholder="Enter Message" required />
                        <br></br>



                      </div>
                    </div>
                    {
                      this.state.Type == "Manager" && (
                        <div>
                          <input type="file" name="file" onChange={
                            event => {
                              const file = event.target.files[0]
                              this.FileUpload(file)

                            }

                          } />
                          <br></br></div>
                      )
                    }

                    <form onSubmit={this.SubmitData}>
                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Send Data</button>
                        </div>
                      </div>
                      <br></br>
                    </form>

                    <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-2 lg:gap-6 items-start lg:max-w-none">

                      {/* Pricing table 1 */}
                      <div className="relative flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="700">
                        <div className="mb-4 pb-4 border-b border-gray-700">
                          <div className="h4 text-purple-600 mb-1">Messages</div>


                        </div>

                        <ul className="text-gray-400 -mb-3 grow">

                          {this.state.EncryptedMessageData.map((val, key) => {
                            console.log(this.state.DecodedArra,)
                            return <li className="flex items-center mb-3">
                              <span>{Base64.decode(this.state.EncryptedMessageData[key])}</span>
                            </li>

                          })}

                        </ul>

                      </div>

                      {/* Pricing table 2 */}


                      {/* Pricing table 3 */}
                      <div className="relative flex flex-col h-full  p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="800">
                        <div className="mb-4 pb-4 border-b border-gray-700">
                          <div className="h4 text-purple-600 mb-1">Available Files</div>


                        </div>



                      </div>

                    </div>

                    {/* Bottom infobox */}


                  </div>

                </div>
              </div>
            </section>


          )
        }

      </section >
    );
  }
}
