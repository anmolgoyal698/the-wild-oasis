import { useSearchParams } from "react-router-dom";
import Select from "./Select"

const SortBy = ({ options }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || options[0].value;

  function handleChange(event) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select options={options} type="white" onChange={handleChange} value={currentSortBy} />
  )
}

export default SortBy;