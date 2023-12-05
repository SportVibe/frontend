import Button from 'react-bootstrap/Button';
import CardComponent from './components/Card/Card';
// import PATHROUTES from './helpers/pathroutes';
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <div>
        <Button variant="outline-primary">Primary</Button>{' '}
        <Button variant="outline-secondary">Secondary</Button>{' '}
        <Button variant="outline-success">Success</Button>{' '}
        <Button variant="outline-warning">Warning</Button>{' '}
        <Button variant="outline-danger">Danger</Button>{' '}
        <Button variant="outline-info">Info</Button>{' '}
        <Button variant="outline-light">Light</Button>{' '}
        <Button variant="outline-dark">Dark</Button>
      </div>
        <CardComponent />
    </div>
  )
}

export default App


