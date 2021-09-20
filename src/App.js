import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from './Components/MyNavbar'
import MyHome from './Components/MyHome'
import CompanyDetail from './Components/CompanyDetail'
import { Container } from  "react-bootstrap"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Favourites from './Components/Favourites';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <MyNavbar />
            <Switch>
              <Route exact path="/" component={MyHome} />
              <Route exact path='/favourites' component={Favourites} />
              <Route exact path='/:companyName' component={CompanyDetail} />
            </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
