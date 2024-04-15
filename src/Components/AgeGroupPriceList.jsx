import PriceInput from "./PriceInput";
import AgeGroupSelect from "./AgeGroupSelect";
import "./AgeGroupPriceList.css";
import { useMemo, useState } from "react";
import { getNumberIntervals } from "../utils/getNumberIntervals";

const initialAgePriceItem = { startAge: 0, endAge: 20, price: 0 };

export default function AgeGroupPriceList() {
  const [agePriceItems, setAgePriceItems] = useState([initialAgePriceItem]);
  const isOverLap = useMemo(() => {
    const intervals = agePriceItems.map((item) => [item.startAge, item.endAge]);
    console.log("intervals", intervals);
    const { overlap } = getNumberIntervals(intervals);
    console.log("overlap", overlap);
    return overlap.length > 0;
  }, [agePriceItems]);

  const addItem = () => {
    setAgePriceItems([...agePriceItems, initialAgePriceItem]);
  };

  const removeItem = (index) => {
    const newAgePriceItem = agePriceItems.filter((_, i) => i !== index);
    setAgePriceItems(newAgePriceItem);
  };

  const handleAgeChange = (index, startOrEnd, value) => {
    const updatedItems = agePriceItems.map((item, i) =>
      i === index ? { ...item, [startOrEnd]: value } : item
    );
    setAgePriceItems(updatedItems);
  };

  const handlePriceChange = (index, value) => {
    const updatedItems = agePriceItems.map((item, i) =>
      i === index ? { ...item, price: value } : item
    );
    setAgePriceItems(updatedItems);
  };

  return (
    <ul className="list">
      {agePriceItems.map((item, index) => {
        return (
          <li key={index}>
            <div className="inputHeader">
              <div>{`價格設定 - ${index + 1}`}</div>
              {agePriceItems.length > 1 && (
                <button onClick={() => removeItem(index)}>X 移除</button>
              )}
            </div>
            <div className="inputWrapper">
              <AgeGroupSelect
                startAge={item.startAge}
                endAge={item.endAge}
                setStartAge={(newStartAge) => {
                  handleAgeChange(index, "startAge", newStartAge);
                }}
                setEndAge={(newEndAge) => {
                  handleAgeChange(index, "endAge", newEndAge);
                }}
                error={isOverLap ? "年齡區間不可重疊" : ""}
              />
              <PriceInput
                price={item.price}
                setPrice={(newPrice) => {
                  handlePriceChange(index, newPrice);
                }}
              />
            </div>
          </li>
        );
      })}
      <button className="addItem" onClick={addItem}>
        + 新增價格設定
      </button>
    </ul>
  );
}
