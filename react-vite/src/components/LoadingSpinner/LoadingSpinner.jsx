import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <img src="/shakerr.png" alt="Loading..." className="shaker" />
      <p>Shaking...</p>
    </div>
  );
};

export default LoadingSpinner;
