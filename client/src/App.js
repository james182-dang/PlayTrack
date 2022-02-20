import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';


const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


const App = () => {

  const [currentDisplay, setCurrentDisplay] = useState('Home');

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='app'>
          <Sidebar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Feed} />
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/signup' component={SignupForm} />
              </Switch>
            </div>
          <Widgets />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;