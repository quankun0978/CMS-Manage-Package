import { ToastContainer } from 'react-toastify';
import Root from 'routes/root';
import 'styles/App.scss';
function App() {
  return (
    <div className="App">
      <Root />
      <ToastContainer />
    </div>
  );
}
export default App;
