// import React, { useEffect, useState } from "react";
// import "./GiftCard.css";
// import CryptoJS from "crypto-js";
// import Navbar from '../../components/navbar/Navbar';
// import { useParams } from "react-router-dom";

// const GiftCard = () => {
//   const { Id } = useParams();

//   const [formData, setFormData] = useState({
//     amount: "",
//     tax_amount: "0",
//     total_amount: "",
//     transaction_uuid: "",
//     product_code: "EPAYTEST",
//     product_service_charge: "0",
//     product_delivery_charge: "0",
//     success_url: "https://google.com", //yeslai change gara success bhayo bhane ka jane
//     failure_url: "https://facebook.com", //same here
//     signed_field_names: "total_amount,transaction_uuid,product_code",
//     signature: "",
//     secret: "8gBm/:&EnhH.1/q",
//   });

//   const [data, setData] = useState({ product: {} });

//   const generateSignature = () => {
//     const currentTime = new Date();
//     const formattedTime =
//       currentTime.toISOString().slice(2, 10).replace(/-/g, "") +
//       "-" +
//       currentTime.getHours() +
//       currentTime.getMinutes() +
//       currentTime.getSeconds();

//     const newFormData = {
//       ...formData,
//       transaction_uuid: formattedTime,
//       amount: data.product.price,
//       total_amount: data.product.price,
//     };

//     const { total_amount, transaction_uuid, product_code, secret } =
//       newFormData;
//     const hash = CryptoJS.HmacSHA256(
//       `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
//       secret
//     );
//     const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

//     setFormData({
//       ...newFormData,
//       signature: hashInBase64,
//     });
//   };

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products/${Id}`)
//       .then((response) => response.json())
//       .then((fetchedData) => {
//         console.log(fetchedData);
//         setData(fetchedData);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [Id]);

//   useEffect(() => {
//     if (data.product.price) {
//       generateSignature();
//     }
//   }, [data.product.price]);

//   return (
//     <div className="giftcard">
//       <Navbar />


//       <div className="payment-card">
//         <div className="product-content">
//           <div className="product-image">
//             <img
//               className="product-image"
//               style={{ width: "300px" }}
//               src={`http://localhost:5000${data.product.image}`}
//               alt={data.product.name}
//             />
//           </div>
//         </div>
//         <div className="payment-info">
//           <div className="product-details">
//             <p style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
//               {data.product.name}
//             </p>
//             <p>{data.product.description}</p>
//             <p>Rs.{data.product.price}</p>
//           </div>
//           <form
//             action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
//             method="POST"
//             target="_blank"
//           >
//             {Object.entries(formData).map(([key, value]) => (
//               <input key={key} type="hidden" name={key} value={value} />
//             ))}
//             <button
//               type="submit"
//               className="button"
//               style={{
//                 display: "block",
//                 backgroundColor: "#60bb46",
//                 cursor: "pointer",
//                 color: "#fff",
//                 border: "none",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 borderRadius: "5px",
//                 marginTop: "20px",
//               }}
//             >
//               Pay Rs.{data.product.price} with eSewa
//             </button>
//           </form>
//         </div>
//         </div>

//     </div>
//   );
// };

// export default GiftCard;

import React, { useEffect, useState } from "react";
import "./GiftCard.css";
import CryptoJS from "crypto-js";
import Navbar from '../../components/navbar/Navbar';
import { useParams } from "react-router-dom";

const GiftCard = () => {
  const { Id } = useParams();

  const [formData, setFormData] = useState({
    amount: "",
    tax_amount: "0",
    total_amount: "",
    transaction_uuid: "",
    product_code: "EPAYTEST",
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: "https://google.com",
    failure_url: "https://facebook.com",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  const [data, setData] = useState({ product: {} });

  const generateSignature = () => {
    const currentTime = new Date();
    const formattedTime =
      currentTime.toISOString().slice(2, 10).replace(/-/g, "") +
      "-" +
      currentTime.getHours() +
      currentTime.getMinutes() +
      currentTime.getSeconds();

    const newFormData = {
      ...formData,
      transaction_uuid: formattedTime,
      amount: data.product.price,
      total_amount: data.product.price,
    };

    const { total_amount, transaction_uuid, product_code, secret } = newFormData;
    const hash = CryptoJS.HmacSHA256(
      `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
      secret
    );
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    setFormData({
      ...newFormData,
      signature: hashInBase64,
    });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${Id}`)
      .then((response) => response.json())
      .then((fetchedData) => {
        console.log(fetchedData);
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [Id]);

  useEffect(() => {
    if (data.product.price) {
      generateSignature();
    }
  }, [data.product.price]);

  return (
    <div className="giftcard">
      <Navbar />

      <div className="payment-card">
        {/* Image Section */}
        <div className="product-image">
          <img
            className="product-image"
            style={{ width: "100%", maxWidth: "350px" }}
            src={`http://localhost:5000${data.product.image}`}
            alt={data.product.name}
          />
        </div>

        {/* Product Details Section */}
        <div className="payment-info">
          <div className="product-details">
            <h2>{data.product.name}</h2>
            <p className="description">{data.product.description}</p>
            <p className="price">Rs.{data.product.price}</p>
          </div>

          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
            target="_blank"
          >
            {Object.entries(formData).map(([key, value]) => (
              <input key={key} type="hidden" name={key} value={value} />
            ))}
            <button
              type="submit"
              className="button"
            >
              Pay Rs.{data.product.price} with eSewa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
