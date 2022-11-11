export const REACT_SELECT_STYLES = {
  control: (base) => ({
    ...base,
    height: 27,
    minHeight: 27,
    fontSize: 13,
    borderColor: "gray",
    border: "1px solid gray",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid gray"
    }
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    justifyContent: "center"
  }),
  input: (provided, state) => ({
    ...provided,
    padding: 0
  }),
  option: (provided, state) => ({
    ...provided,
    textAlign: "center"
  }),
  placeholder(base, state) {
    return {
      ...base,
      display: "none"
    }
  },
  indicatorSeparator: (state) => ({
    display: "none"
  }),
  indicatorsContainer: (state) => ({
    display: "none"
  })
}
