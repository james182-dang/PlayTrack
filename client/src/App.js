import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Sidebar from './components/Sidebar';
import Feed from './pages/Feed';
import SinglePost from './components/SinglePost';
import SingleReview from './components/SingleReview';
import Messages from './components/Messages';
import Explore from './pages/Explore';
import GameDetails from './pages/GameDetails'
import Connect from './pages/Connect';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';
import Reviews from './pages/Reviews';
import Profile from './pages/Profile';
import Message from './pages/Message';
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

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='app'>
          <Sidebar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Feed} />
                <Route exact path='/feed' component={Feed} />
                <Route exact path='/feed/post/:id' component={SinglePost} />
                <Route exact path='/explore' component={Explore} />
                <Route exact path='/explore/game/:id' component={GameDetails} />
                <Route exact path='/connect' component={Connect} />
                <Route exact path='/messages' component={Messages} />
                <Route exact path='/messages/:username?' component={Message} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/profile/:username?' component={Profile} />
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/signup' component={SignupForm} />
                <Route exact path='/reviews' component={Reviews} />
                <Route exact path='/reviews/:id' component={SingleReview} />
                <Route exact path='/settings' component={Settings} />
                <Route exact path='/faq' component={FAQ} />
              </Switch>
            </div>
          <Widgets />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;