import React from "react";
import { useParams } from "react-router-dom";

const PaymentFail = () => {
  let { trnID } = useParams();
  return <div>PaymentFail {trnID}</div>;
};

export default PaymentFail;
