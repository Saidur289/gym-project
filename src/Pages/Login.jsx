
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/Authprovider";

const Login = () => {
  const {signInUser, setUsers} =  useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const handleLogin = e => {   
    e.preventDefault()
    const form = e.target 
    const email = form.email.value
    const password = form.password.value
    signInUser(email, password)
    .then((res) => {
      const user = res.user
      setUsers(user)
      navigate(location.state? location.state : '/')
    })
    .catch((error) => {
    console.log('error', error);
    })
    
    
  }
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none shadow-lg p-10">
        <h1 className="font-semibold text-center">Login Your Account</h1>
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <p className="text-center font-semibold">
          Do Not Have An Account?{" "}
          <Link className="text-red-500 " to="/sign">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
