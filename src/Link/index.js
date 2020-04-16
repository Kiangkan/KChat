import React,{useState} from "react";
import firebase from '../firebase'
import 'firebase/firestore'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import App from '../App'
import Navbar from './Navbar'

const fs = firebase.firestore()

export default function ReactLink() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={App} />
          <Route exact path="/:page">
            <Page />
          </Route>
          <Route path="/t/:userId">
            <Messaging />
          </Route>
        </Switch>
    </Router>
  );
}
const Messaging = () => {
  const {userId} = useParams(),
  [user, setUser] = useState({})

  fs.collection('users').doc(userId).get()
  .then(data =>
    setUser(data.data())
  )
  return (
      <div>
        <Navbar />
        <h1>Welcome</h1>
      </div>
  )
}
const Page = () => {
  let {page} = useParams()
  return (
    <h2>page : {page}</h2>
  )
}

/*function Apps() {
  return <App />;
}
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
      the page that is shown when no topic is selected } 
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}*/