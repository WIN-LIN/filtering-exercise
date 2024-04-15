import { useCallback } from "react";
import "./AgeGroupSelect.css";
const MAX_AGE = 20;

export default function AgeGroupSelect({
  startAge,
  setStartAge,
  endAge,
  setEndAge,
  error
}) {
  const handleStartAgeChange = useCallback(
    (e) => {
      const newStartAge = parseInt(e.target.value, 10);
      setStartAge(newStartAge);
    },
    [setStartAge]
  );

  const handleEndAgeChange = useCallback(
    (e) => {
      const newEndAge = parseInt(e.target.value, 10);
      setEndAge(newEndAge);
    },
    [setEndAge]
  );

  return (
    <div className="ageGroupSelect">
      <div className="title">年齡</div>
      <div className="ageWrapper">
        <label className="ageLabel" htmlFor="startAge" />
        <div className={`ageSelectWrapper ${error ? "error" : ""}`}>
          <select
            id="startAge"
            value={startAge}
            onChange={handleStartAgeChange}
          >
            {Array.from({ length: endAge + 1 }, (_, i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        ~<label className="ageLabel" htmlFor="endAge" />
        <div className={`ageSelectWrapper ${error ? "error" : ""}`}>
          <select value={endAge} onChange={handleEndAgeChange}>
            {Array.from({ length: MAX_AGE - startAge + 1 }, (_, i) => (
              <option key={i + startAge} value={i + startAge}>
                {i + startAge}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
