import React, { useState, useEffect } from "react";
// import "./styles.css";

export default function App() {
  const [packageName, setPackageName] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [favourite, setFavourite] = useState(
    JSON.parse(localStorage.getItem("favourite")) || []
  );

  const searchPackage = async () => {
    const res = await fetch(`https://api.npms.io/v2/search?q=${packageName}`);
    const data = await res.json();
    if (data.results.length > 0) {
      setPackageData(data.results[0].package);
    }
    setPackageName("");
  };

  const addFavourite = (name, description) => {
    setFavourite([...favourite, { name, description }]);
  };

  const handleFavouriteClick = () => {
    const description = prompt("why do you like this package?");
    if (description) {
      addFavourite(packageData.name, description);
    }
  };

  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favourite));
  }, [favourite]);

  return (
    <div>
      <h4>Search for NPM packages</h4>
      <input
        type="text"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
      />

      <button onClick={searchPackage}>Search</button>

      {packageData && (
        <div>
          <h2>{packageData.name}</h2>
          <p>{packageData.description}</p>
          <button onClick={handleFavouriteClick}>Favourite</button>
        </div>
      )}

      {favourite.length > 0 && (
        <div>
          <h2>My favourite</h2>
          <ul>
            {favourite.map(({ name, description }, index) => (
              <li key={index}>
                <h3>{name}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
