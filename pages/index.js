import userCurrentValuesJson from "./usCurrentValues.json";
import { Table } from "reactstrap";
import ReactCountryFlag from "react-country-flag";
import {getName} from 'country-list';

const Index = (props) => {
  const numberWithCommas = (x) => {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return x;
  };

  const calcPastTime = (dateTime, type = false) => {
    let curDate = new Date();

    let unixTimeNow = Math.floor(curDate.valueOf());
    let unixTimeItem;
    if (type == false) unixTimeItem = new Date(dateTime).valueOf();
    if (type == "unix") unixTimeItem = dateTime.valueOf();

    let difference = Math.floor((unixTimeNow - unixTimeItem) / 1000);
    let posted = "";

    if (difference < 3600) {
      posted = Math.round(difference / 60);
      if (posted == 1) posted += " min ago";
      else posted += " mins ago";
    } else if (difference < 86400) {
      posted = Math.round(difference / 60 / 60);
      if (posted == 1) posted += " hour ago";
      else posted += " hours ago";
    } else if (difference < 2592000) {
      posted = Math.round(difference / 60 / 60 / 24);
      if (posted == 1) posted += " day ago";
      else posted += " days ago";
    } else {
      posted = Math.round(difference / 60 / 60 / 24 / 30);
      if (posted == 1) posted += " month ago";
      else posted += " months ago";
    }

    return posted;
  };

  var tempDate = new Date(
    userCurrentValuesJson[userCurrentValuesJson.length - 1].lastUpdated
  );
  const lastUpdatedRelative = calcPastTime(new Date(tempDate.valueOf()));

  const getCountryName = (code) => {
    switch(code) {
      case "US":
        return "USA";
      case "UK":
        return "UK";
      default:
        return getName(code);
    }
  }
  return (
    <div className="lifeasnormal-widget one-country-stats">
      <h2 className="widget-title text-center">
        COVID-19 (Coronavirus) Statistics
      </h2>
      <Table borderless>
        <thead>
          <tr>
            <th scope="col">&nbsp;</th>
            <th scope="col">CASES</th>
            <th scope="col">DEATHS</th>
            <th scope="col">RECOVERED</th>
          </tr>
        </thead>
        <tbody>
          {userCurrentValuesJson &&
            userCurrentValuesJson.length > 0 &&
            userCurrentValuesJson.map((item, nIndex) => {
              return (
                <tr key={nIndex}>
                  <td>
                    <div className="country-wrap">
                      <ReactCountryFlag
                        countryCode={
                          item.country === "UK" ? "GB" : item.country
                        }
                        svg
                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                        cdnSuffix="svg"
                        aria-label="United States"
                        code="US"
                      />
                      <p>
                        {getCountryName(item.country)}
                      </p>
                    </div>
                  </td>
                  <td>
                    {numberWithCommas(item.positive)}
                    {item.todayCases != "" && (
                      <span
                        className="text-warning"
                        style={{ fontWeight: "bold" }}
                      >
                        {" "}
                        +{numberWithCommas(item.todayCases)}
                      </span>
                    )}
                  </td>
                  <td>
                    {numberWithCommas(item.death)}
                    {item.todayDeaths != "" && (
                      <span
                        className="text-danger"
                        style={{ fontWeight: "bold" }}
                      >
                        {" "}
                        +{numberWithCommas(item.todayDeaths)}
                      </span>
                    )}
                  </td>
                  <td>{numberWithCommas(item.recovered)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="widget-footer">
        <span className="last-updated">
          Last Updated: {lastUpdatedRelative}
        </span>
      </div>
      <div>
        <span className="d-flex justify-content-center my-3">
          <h6>
            Powered by <a href="https://lifeasnormal.com/">#lifeaasnormal</a>
          </h6>
        </span>
      </div>
    </div>
  );
};

export default Index;
