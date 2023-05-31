import { useContext, useState } from "react";
import { AppContext } from "../components/AppProvider";

interface User {
  username: string;
  password: string;
}
const Login: React.FC = () => {
  const { verifyLogin, message } = useContext(AppContext);

  const [creds, setCreds] = useState<User>({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyLogin(creds.username, creds.password);
  };
  return (
    <div className="login-page">
      <div className="login-header">TODO Login</div>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={creds.username}
            onChange={(e) => setCreds({ ...creds, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          />
        </div>
        {message && <p>{message}</p>}
        <div className="login-btn">
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
