import React, { KeyboardEvent, useState, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Input, List } from "antd";

let cachedVal = "";
const acceptedKeys = [38, 40, 13, 27];

type Suggestion = google.maps.places.AutocompletePrediction;

const LocationPicker = ({ location, onChange }) => {
  const [currIndex, setCurrIndex] = useState<number | null>(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const hasSuggestions = status === "OK";

  const dismissSuggestions = (): void => {
    setCurrIndex(null);
    clearSuggestions();
  };

  const ref = useOnclickOutside(dismissSuggestions);

  const handleInput = (e) => {
    setValue(e.target.value);
    cachedVal = e.target.value;
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    dismissSuggestions();
  };

  const getCoordinates = (item) =>
    getGeocode({ address: item.description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
        onChange({ address: item.description, lat, lng });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });

  const handleEnter = (idx: number) => (): void => {
    setCurrIndex(idx);
  };

  const handleLeave = (): void => {
    setCurrIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!hasSuggestions || !acceptedKeys.includes(e.keyCode)) return;

    if (e.keyCode === 13 || e.keyCode === 27) {
      dismissSuggestions();
      return;
    }

    let nextIndex: number;

    if (e.keyCode === 38) {
      e.preventDefault();
      nextIndex = currIndex ?? data.length;
      nextIndex = nextIndex > 0 ? nextIndex - 1 : null;
    } else {
      nextIndex = currIndex ?? -1;
      nextIndex = nextIndex < data.length - 1 ? nextIndex + 1 : null;
    }

    setCurrIndex(nextIndex);
    setValue(data[nextIndex] ? data[nextIndex].description : cachedVal, false);
  };

  useEffect(() => {
    if (!data || currIndex === null) {
      return;
    }
    getCoordinates(data[currIndex]);
  }, [currIndex]);

  useEffect(() => {
    setValue(location.address, false);
  }, []);

  useEffect(() => {
    console.log("ready changed: ", ready);
  }, [ready]);

  return (
    <div ref={ref}>
      <Input
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={!ready}
        placeholder="Event location"
      />
      {hasSuggestions && (
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={(item, idx) => {
            const {
              id,
              structured_formatting: { main_text, secondary_text },
            } = item;
            return (
              <List.Item
                onClick={handleSelect(item)}
                onMouseEnter={handleEnter(idx)}
                onMouseLeave={handleLeave}
                className={idx === currIndex ? `bg-gray-800 text-white` : ``}
              >
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
};

export default LocationPicker;
