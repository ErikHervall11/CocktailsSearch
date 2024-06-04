import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    const serverResponse = await dispatch(thunkSignup(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="input-signup-form">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            placeholder="Email"
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="input-signup-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
            placeholder="Username"
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label className="input-signup-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Password"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label className="input-signup-form">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Confirm Password"
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <label className="input-signup-form">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-input"
            placeholder="First Name"
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="input-signup-form">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-input"
            placeholder="Last Name"
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="input-signup-form">
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="form-file"
          />
        </label>
        <div className="sign-up-button-sign">
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
