import React, { useEffect, useState } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

const CreditCardInput = ({ onChange }) => {
  const [card_number, setCardNumber] = useState("");
  const [expired_date, setExpiredDate] = useState("");
  const [cvv, setCVV] = useState("");

  const {
    meat,
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  const onCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const onExpiredDateChange = (e) => {
    setExpiredDate(e.target.value);
  };

  const onCardCVVChange = (e) => {
    setCVV(e.target.value);
  };

  useEffect(() => {
    if (!card_number || !expired_date || !cvv) {
      return;
    }
    onChange({ card_number, expired_date, cvv });
  }, [card_number, expired_date, cvv]);

  return (
    <PaymentInputsWrapper {...wrapperProps}>
      <svg {...getCardImageProps({ images })} />
      <input {...getCardNumberProps({ onChange: onCardNumberChange })} />
      <input {...getExpiryDateProps({ onChange: onExpiredDateChange })} />
      <input {...getCVCProps({ onChange: onCardCVVChange })} />
    </PaymentInputsWrapper>
  );
};

export default CreditCardInput;
