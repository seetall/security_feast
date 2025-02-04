// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const VerifyEmail = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/user/verify/${token}`
//         );
//         if (!response.ok) {
//           const errorMessage = await response.text();
//           setError(errorMessage);
//           toast.error(errorMessage);
//         } else {
//           toast.success("Email verified successfully!");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//         setError("Verification failed. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyEmail();
//   }, [token, navigate]);

//   if (loading) {
//     return <p>Verifying...</p>;
//   }

//   return (
//     <div>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         <p>
//           Email verification complete. You can now <a href="/login">login</a>.
//         </p>
//       )}
//     </div>
//   );
// };

// export default VerifyEmail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/verify/${token}`);
        if (response.ok) {
          toast.success("Email verified successfully!");
          navigate("/login");
        } else {
          const errorMessage = await response.text();
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setError("Verification failed. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  if (loading) {
    return <p>Verifying...</p>;
  }

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>Email verification complete. You can now <a href="/login">login</a>.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
