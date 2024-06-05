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
        confirmPassword: "Confirm Password must be the same as the Password",
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
      {errors.server && <p className="error-message">{errors.server}</p>}
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
          {errors.email && <p className="error-message">{errors.email}</p>}
        </label>
        <label className="input-signup-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
            placeholder="Username"
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </label>
        <label className="input-signup-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Password (min 8 characters)"
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </label>
        <label className="input-signup-form">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </label>
        <label className="input-signup-form">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-input"
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
        </label>
        <label className="input-signup-form">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-input"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="error-message">{errors.lastName}</p>
          )}
        </label>
        <label className="input-signup-form">
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="form-file"
          />
          <h5>If no image is chosen, a default image will be used</h5>
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
