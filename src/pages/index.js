import ProductList from "../components/ProductList";
import FilterSidebar from "../components/Navbar";

export default function HomePage() {

  return (
      <div>
        <div><FilterSidebar/></div>
        <div><ProductList/></div>
      </div>
  )
}
