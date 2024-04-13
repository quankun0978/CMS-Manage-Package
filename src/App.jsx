import Home from 'pages/Home';
import { ToastContainer } from 'react-toastify';
import AppRouter from 'routes/AppRouter';
import Root from 'routes/root';
import 'styles/App.scss';
function App() {
  return (
    <div className="App">
      {/* <AppRouter /> */}
      <AppRouter />
    </div>
  );
}
export default App;
