import Title from "../../ui/Title";
import Cards from "./Cards";

function NewArrivals() {
  return (
    <div className="container pt-12">
      <Title title={"New Arrivals"} className={"text-center"} />
      <Cards />
      <hr className="border border-b-[1px] mt-10" />
    </div>
  );
}

export default NewArrivals;
