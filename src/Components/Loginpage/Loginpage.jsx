import React, { useState } from 'react';
import './loginpage.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MicrosoftLogin from "react-microsoft-login";
import { useHistory } from 'react-router';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Loginpage() {

  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory()

  const handleEmail = event => {
    setEmail(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const redirectPage = token => {
    console.log('redirect')
    sessionStorage.setItem('accessToken', JSON.stringify(token))
    history.push('/')
  }


  const postEvents = async (events) => {
    const req = axios.post("https://magnifio-events.herokuapp.com/events",
          events
        )
        .then(data => {
          console.log(data)
          return data
        })
        .catch(err => {
          console.log(err)
        })

        console.log(req)
  }

  const appendPre = (message) => {
    console.log(message)
  }

  function listConnectionNames() {
    gapi.client.people.people.connections.list({
       'resourceName': 'people/me',
       'pageSize': 10,
       'personFields': 'names, emailAddresses',
      }).then(function(response) {
       console.log(response)
       let connections = response.result.connections;
       appendPre('Connections:');
       if (connections.length > 0) {
         for (i = 0; i < connections.length; i++) {
           let person = connections[i];
           if (person.names && person.names.length > 0) {
             appendPre(person.names[0].displayName)
           } else {
             appendPre("No display name found for connection.");
           }
         }
       } else {
         appendPre('No connections found.');
       }
     });
  }

  // getting emails
    function getEmails() {
      const res = gapi.client.gmail.users.messages.list({
        userId: 'me',
        labelIds: ['INBOX'],
        maxResults: 100,
      });
      console.log('email result', res);
      res.execute(getMessagesData);

      // res.execute(getOneMessage);
    }

    const getMessagesData = (response) => {
      const messages = response.result.messages
        ? response.result.messages
        : [];

      messages.forEach((message) => {
        window.gapi.client.gmail.users.messages
          .get({
            userId: 'me',
            id: message.id,
            format: 'full',
            labelIds: ['INBOX'],
          })
          .then(
            (response) => {
              var emails = response.result;

              const part = response.result.payload.parts[0].body.data;
              console.log(emails);

              //console.log(JSON.stringify(part))
              //var html = atob(part.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g,''));

              //console.log(html);

              var iframe = document.createElement('iframe');

              document.getElementById('myDIV').appendChild(iframe);

              iframe.contentWindow.document.open();
              iframe.setAttribute('style', 'height:100%;width:100%;margin:3%');
              iframe.contentWindow.document.write(
                getMessageBody(emails.payload)
              );
              iframe;
            },
            (err) => {
              console.error('getMessagesData error', err);
            }
          );
      });
    };

    const getMessageBody = (message) => {
      const encodedBody =
        typeof message.parts === 'undefined'
          ? message.body.data
          : getHTMLPart(message.parts);

      return Base64.decode(encodedBody);
    };

    const getHTMLPart = (arr) => {
      for (var x = 0; x <= arr.length; x++) {
        if (typeof arr[x].parts === 'undefined') {
          if (arr[x].mimeType === 'text/html') {
            return arr[x].body.data;
          }
        } else {
          return getHTMLPart(arr[x].parts);
        }
      }
      return '';
    };


  // google auth
  const handleGoogleAuth = (e) => {
    e.preventDefault()
    console.log('clicked')
    const gapi = window.gapi

    const CLIENT_ID = "820832714946-5qladfn84bkjhr6g978qr5sasmrv8cg6.apps.googleusercontent.com"
    const API_KEY = "AIzaSyCbJwXUQP4gLxiplgrkxl1UtzvR1VHc-rA"
    const DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
    ]
    let SCOPES = ["https://www.googleapis.com/auth/calendar.events",
    'https://www.googleapis.com/auth/gmail.readonly'
  ]
    SCOPES = SCOPES.join(' ');
    

    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('calendar!'))
      gapi.client.load('gmail', 'v1', () => console.log('gmail!'))

      gapi.auth2.getAuthInstance().signIn()
      .then((res) => {
        console.log('res', res)
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          
          const data = response.result.items
          // console.log('EVENTS: ', data)
          let events = []
          events = data.map(event => {
            return ({
              eventId: event.id,
              subject: event.summary,
              startTime: event.start.dateTime,
              endTime: event.end.dateTime,
            })
          })
          // console.log(events)
          // listConnectionNames()
          postEvents(events)
        })
        
        
        // getEmails()
        if(res && res.wc.access_token)  {
          redirectPage(res.wc.access_token)
        }
        
      })
    })
  }

  const authHandler = (err, data) => {
    console.log(err, data)
    const options = {
        method: "GET",
        headers: {
          'Authorization' : `Bearer ${data.accessToken}`
        }
    };
    
    fetch("https://graph.microsoft.com/v1.0/me/events", options)
      .then((res) => {
        return res.json()
      }).then((cal) =>{
        console.log(cal.value)
        // console.log(cal.value[0].id, cal.value[0].start.dateTime, cal.value[0].subject)
        // console.log(cal.value)
        let events = []
        events = cal.value.map(event => {
          return ({
            eventId: event.id,
            subject: event.subject,
            startTime: event.start.dateTime,
            endTime: event.end.dateTime,
          })
        })
        console.log(events)
        postEvents(events)
        
      })
      .catch(error => console.log(error));

    
    if(data && data.accessToken) redirectPage(data.accessToken)
  };

  const handleLogin = async () => {
    try {
      const loginUserData = {
        password: password,
        email: email,
      }
      
      const loginRequest = await axios
        .post('https://magnifionode-api.herokuapp.com/users/login',
          loginUserData
        )
        .then(data => {
          console.log(data)
          return data
        })
        .catch(err => 
          toast.error(err.response.data.message)
        );

        const { message } = loginRequest.data;
    
        if (message) {
          toast.success(message);
          // history.push("/")
          setTimeout(() => {
            redirectPage("secretToken")
          }, 3000)
        }
      } catch (error) {
        toast.error(error);
      }
  }

  return (
    <div className="login">
      <Helmet>
        <title>Magnif.io | Login</title>
      </Helmet>
      <ToastContainer
        position="top-center"
        autoClose={false}
        theme="dark"
      />
      <div className="login-page">
        <aside className="left"></aside>
        <aside className="right">
          <h1>Welcome!</h1>
          <form className="login-detalis">
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={handleEmail}
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={handlePassword}
            />
            <span className="forgot-password">forgot password?</span>
            <span type="submit" className="login-button" onClick={handleLogin}>
              Sign In
            </span>
            {/* <button
              className="google"
              onClick={handleGoogleAuth}
            >
              Login with Google
            </button> */}
            {/* <MicrosoftLogin 
              className="outlook"
              clientId={process.env.REACT_APP_OUTLOOK_CLIENT_ID} 
              authCallback={authHandler}
              graphScopes={['calendars.read', 'user.read', 'openid', 'profile', 'people.read', 'user.readbasic.all']}
            /> */}
            <span className="login-page-create-account">
              Not registered yet?{' '}
              <Link to="/register" style={{ color: 'blue', paddingLeft: '4px', textDecoration: 'none' }}>
                Create an account
              </Link>
            </span>
          </form>
        </aside>
      </div>
    </div>
  );
}
