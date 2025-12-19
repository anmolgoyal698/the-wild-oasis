import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
  const { cabins, isPending, error } = useCabins();
  const [searchParams] = useSearchParams();
  const discountFilter = searchParams.get("discount") || "all";

  console.log(cabins, isPending, error);

  if (isPending) {
    return <Spinner />;
  }

  let filteredCabins = cabins;

  if (discountFilter === "with-discount") {
    filteredCabins = cabins?.filter(
      (cabin) => cabin.discount && cabin.discount > 0
    );
  } else if (discountFilter === "no-discount") {
    filteredCabins = cabins?.filter(
      (cabin) => !cabin.discount || cabin.discount === 0
    );
  }
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedCabins;

  if (field === "name") {
    // Sorting non-ASCII characters
    sortedCabins = filteredCabins?.sort(
      (a, b) => a["name"].localeCompare(b["name"]) * modifier
    );
  } else {
    sortedCabins = filteredCabins?.sort(
      (a, b) => (a[field] - b[field]) * modifier
    );
  }
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>CABIN</div>
        <div>CAPACITY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
        <div></div>
      </TableHeader>
      {sortedCabins!.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
};

export default CabinTable;
