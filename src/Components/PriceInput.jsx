import { useState } from "react";
import "./PriceInput.css";
const isValueValid = (value) => {
  if (value === "") {
    return "不可以為空白";
  }
  if (!value.match(/^\d*(,\d{3})*(\.\d+)?$/)) {
    return "不可以輸入非數字字元";
  }
  return "";
};

export default function PriceInput() {
  const [price, setPrice] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const priceOnChange = (e) => {
    const value = e.target.value.replace("/,/g", "");
    setPrice(value);
    console.log("value", value);
  };
  const handleOnBlur = () => {
    const errMsg = isValueValid(price);
    if (errMsg) {
      setErrMsg(errMsg);
    } else {
      setPrice(parseFloat(price).toLocaleString());
    }
  };

  const handleOnFocus = () => {
    setPrice(price.replace("/,/g", ""));
    setErrMsg("");
  };

  return (
    <>
      <div className="title">入住費用（每人每晚）</div>
      <div className="priceWrapper">
        <label className="priceLabel" htmlFor="price">
          TWD
        </label>

        <input
          className={`priceInput ${errMsg ? "error" : ""}`}
          data-error={errMsg ? errMsg : ""}
          type="text"
          placeholder="請輸入費用"
          onChange={priceOnChange}
          value={price}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
        />
        {errMsg && <span className="error-message">{errMsg}</span>}
        <span className="priceInfo">輸入 0 表示免費</span>
      </div>
    </>
  );
}
