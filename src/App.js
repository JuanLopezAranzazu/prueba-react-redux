import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users/Users";
import Tasks from "./pages/Tasks/Tasks";
import NoPage from "./pages/NoPage/NoPage";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/login-user" element={<Login />} />
        <Route path="/tasks-user/:userId" element={<Tasks />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
