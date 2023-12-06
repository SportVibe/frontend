import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import CardComponent from "./components/Card/Card";
import Button from 'react-bootstrap/Button';
// import PATHROUTES from './helpers/pathroutes';
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<AdminDashBoard />}></Route>
      </Routes>
    </div>
  );
}

export default App;

