import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/Authprovider";


const SignOut = () => {
  const { createUser} = useContext(AuthContext)
  const handleRegister = e => {
    
    e.preventDefault()
    const form = e.target 
    const email = form.email.value
    const password = form.password.value
    createUser(email, password)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
    console.log('error', error);
    })
    
    
  }
    return (
        <div className="flex min-h-screen justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none shadow-lg p-10">
        <h1 className="font-semibold text-center">Login Your Account</h1>
        <form onSubmit={handleRegister} className="card-body">
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
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
        <p className="text-center font-semibold">
          Already Have An Account?{" "}
          <Link className="text-red-500 " to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
    );
};

export default SignOut;