import React, { useState } from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { REGION_LIST } from "./REGION_LIST";
import MapContainer from "./MapContainer";

export default function Map() {

  // searchValue: "",
  let regions = REGION_LIST;
  const [region, setRegion] = useState('')
  const [center, setCenter] = useState(regions[0].coordinates)
  let myMap
  const handleChange = (e) => {
    setRegion(e.target.value)
    setCenter(regions.filter((item) => item.city === e.target.value)[0].coordinates)

  }
  return (
    <div className="map mt-4">
      <div className="container mx-auto">
        <div className="md:flex gap-4 justify-between	items-center">
          <h2 className='text-orange uppercase golos text-3xl md:mb-0 mb-4 '>Карта магазинов дикси</h2>
          <div className="col-lg-auto">

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Выберите регион
              </InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={region}
                onChange={handleChange}
                label="Выберите регион"
                inputProps={{
                  name: "Выберите регион",
                  id: "outlined-age-native-simple",
                }}
              >
                {regions.map((item, index) => (
                  <MenuItem value={item.city} key={index}>{item.city}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <MapContainer center={center} myMap={myMap} />
      </div>
    </div>
  );
}
