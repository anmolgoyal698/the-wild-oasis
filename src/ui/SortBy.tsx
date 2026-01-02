import { useSearchParams } from "react-router-dom";
import Select from "./Select"
import type React from "react";

const SortBy = ({ options }: { options: { value: string; label: string }[] }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || options[0].value;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select options={options} type="white" onChange={handleChange} value={currentSortBy} />
  )
}

export default SortBy;