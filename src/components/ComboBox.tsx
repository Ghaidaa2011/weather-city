import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { governments } from "../data/governments";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

interface IComboBoxProps {
  selectCityHanlder: (city: string) => void;
}

export default function ComboBox({ selectCityHanlder }: IComboBoxProps) {
  const { t, i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: string;
  } | null>(null);

  // Generate options based on current language
  const options = governments.map((gov) => ({
    label: i18n.language === "ar" ? gov.ar : gov.en,
    value: gov.en,
  }));

  // Update selectedOption when language changes
  useEffect(() => {
    if (selectedOption) {
      const currentGov = governments.find(
        (gov) => gov.en === selectedOption.value
      );
      if (currentGov) {
        setSelectedOption({
          label: i18n.language === "ar" ? currentGov.ar : currentGov.en,
          value: currentGov.en,
        });
      }
    }
  }, [i18n.language]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.label}
      value={selectedOption} // Controlled value
      onChange={(_event, newValue) => {
        setSelectedOption(newValue); // Update local state
        if (newValue) {
          selectCityHanlder(newValue.value); // Pass English name to App
        }
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value} // Custom equality test
      sx={{
        width: { xs: "300px", sm: "400px", md: "500px" },
        marginBottom: "10vh",
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
          transition: " border-color 0.5s",
        },
      }}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{
            color: "#0052d0", // Change text color to blue
          }}
        >
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t("Choose a government")}
          sx={{
            "& .MuiFormLabel-root": { color: "white" },
            "& .MuiSvgIcon-root": { color: "white" },
            "& .MuiAutocomplete-input": { color: "white" },
          }}
        />
      )}
    />
  );
}
