import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Footer from "./components/Footer";

const App = () => (
  <div className="p-10 bg-gray-100 min-h-screen">
    <h2 className="text-3xl font-bold text-center mb-6 text-violet-900">Task Management</h2>
    <div className="max-w-4xl mx-auto">
      <TaskForm />
      <TaskList />
    </div>
    <div className="mt-10 text-gray-200 mx-auto text-center">
      <Footer />
    </div>
  </div>
);

export default App;
