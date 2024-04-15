import { useCallback, useState } from "react";
import "./AgeGroupSelect.css";
const MAX_AGE = 20;

export default function AgeGroupSelect() {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(20);

  const handleStartAgeChange = useCallback(
    (e) => {
      const newStartAge = parseInt(e.target.value, 10);
      setStartAge(newStartAge);
      if (newStartAge > endAge) {
        setEndAge(newStartAge);
      }
    },
    [endAge]
  );

  const handleEndAgeChange = useCallback(
    (e) => {
      const newEndAge = parseInt(e.target.value, 10);
      setEndAge(newEndAge);
      if (startAge > newEndAge) {
        setStartAge(newEndAge);
      }
    },
    [startAge]
  );

  return (
    <div className="ageWrapper">
      <label className="ageLabel">Start Age:</label>
      <div className="ageSelectWrapper">
        <select id="startAge" value={startAge} onChange={handleStartAgeChange}>
          {Array.from({ length: endAge + 1 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      ~<label className="ageLabel">End Age:</label>
      <div className="ageSelectWrapper">
        <select value={endAge} onChange={handleEndAgeChange}>
          {Array.from({ length: MAX_AGE - startAge + 1 }, (_, i) => (
            <option key={i + startAge} value={i + startAge}>
              {i + startAge}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
