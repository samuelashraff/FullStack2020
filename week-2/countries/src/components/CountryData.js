import Weather from "./Weather";

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <ul>
        <li>{country.capital}</li>
        <li>{country.area}</li>
        
        <h3>Languages:</h3>
        <ul>
            {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
            ))}
        </ul>
      </ul>
      <img src={country.flags.png} alt={"Flag"} />
      <Weather city={country.capital} />
    </div>
  );
};

export default CountryData;