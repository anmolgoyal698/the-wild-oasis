import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { cabins, isPending, error } = useCabins();
  const [searchParams] = useSearchParams();
  const discountFilter = searchParams.get("discount") || "all";

  console.log(cabins, isPending, error);

  if (isPending) {
    return <Spinner />;
  }

  if (!cabins?.length) {
    return <Empty resourceName="cabins" />;
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
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 2fr">
      <Table.Header>
        <div></div>
        <div>CABIN</div>
        <div>CAPACITY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
};

export default CabinTable;
