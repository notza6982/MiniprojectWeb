import './App.css';
import Menu from './components/layouts/Menu.js'
import { BrowserRouter as Router, Route, Link,Switch} from 'react-router-dom';
import AIhome from './components/pages/AI/AIhome.js'
import Home from './components/pages/Home/Home'
import ShopHome from './components/pages/Shop/ShopHome'
import ContactusHome from './components/pages/Contactus/ContactusHome'


function App() {
  return (
    <div className="App">
      <Menu/>
      <div>
      <Route exact path="/GlassShop/AI" component={AIhome}/>
      <Route exact path="/GlassShop/Home" component={Home}/>
      <Route exact path="/GlassShop/Shopping" component={ShopHome}/>
      <Route exact path="/GlassShop/Contact" component={ContactusHome}/>
      </div>
    </div>
  );
}

export default App;
