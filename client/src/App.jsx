import './App.css';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div className="App" style={{width : "120%"}}>
      <TodoList />
    </div>
  );
}

export default App;
