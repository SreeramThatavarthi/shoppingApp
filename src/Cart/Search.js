import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";


export const Search=()=> {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
  var country=['Rings','Bracelet','Necklace','Coins'];

    setFilteredCountries(
      country.filter((country) =>
        country.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  

  return (
    <div className="App">
    <button >j,bb</button>
      {
          (false)?(<input
            type="text"
            placeholder="Search Countries"
            onChange={(e) => setSearch(e.target.value)}
          />
          ):(<></>)
      }
      {filteredCountries.map((country, idx) => (
           <div>{country}</div>
          ))}
    </div>
  );
}

const CountryDetail = (props) => {
  const { name, flag } = props;

  return (
    <>
      <p>
        <img src={flag} alt={name} style={{ width: "20px", height: "20px" }} />
      </p>
      <p>{name}</p>
    </>
  );
};

