import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialSign from "../Shared/SocialSign/SocialSign";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [error, setError] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser)
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = {name: data.name, email: data.email, role: 'student'}
          axios.post('http://localhost:5000/users', saveUser).then(res => {if(res.data.insertedId){
            Swal.fire("SignUp!", "Your Account Created Successfully", "success");
          }})
        })
        .catch((error) => {
          setError(error.message);
        });
    }). catch(error => setError(error.message))
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet title="Snap School | SignUp"></Helmet>
      <div className="max-w-md w-full  mx-auto p-8 border border-gray-300 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              {...register("photoURL", { required: false })}
              placeholder="Photo URL"
              className="input input-bordered"
            />
            {errors.photoURL && (
              <span className="text-red-600">Photo URL is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder="password"
              className="input input-bordered"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn bg-blue-600 text-white"
              type="submit"
              value="Sign Up"
            />
          </div>
          <p><span className="text-red-500 text-center my-12">{error}</span></p>
        </form>
        <SocialSign></SocialSign>
        <p>
          <small>
            Already have an account <Link to="/login">Login</Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
