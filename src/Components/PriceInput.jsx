import { useState } from "react";
import "./PriceInput.css";
import { addComma } from "../utils/addComma";

export default function PriceInput() {
  const [price, setPrice] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const priceOnChange = (e) => {
    const value = e.target.value.replace("/,/g", "");
    setPrice(value);
    console.log("value", value);
  };
  const handleOnBlur = () => {
    if (price === "") {
      setErrMsg("不可以輸入空白");
      return;
    }
    if (isNaN(price)) {
      setErrMsg("不可以輸入非數字字元");
      return;
    }

    setPrice(addComma(price));
  };

  const handleOnFocus = () => {
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
