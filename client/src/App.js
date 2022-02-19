import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
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

  const showDisplay = () => {
    switch (currentDisplay) {

    }
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='app'>
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

{/* <div className='flex-column justify-flex-start min-100-vh'>
<Navbar
  currentDisplay={currentDisplay}
  setCurrentDisplay={setCurrentDisplay}
/>
<div className='container'>
  <Switch>


  </Switch>
</div>
<Footer />
</div> */}