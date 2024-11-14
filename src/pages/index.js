import ProductList from "../components/ProductList";
import SideBar from "@/components/SideBar/index.jsx";
import {useState} from "react";
import { FaFilter } from "react-icons/fa6";

export default function HomePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

  return (
      <div className="relative">
          <button
              onClick={toggleSidebar}
              className="fixed top-20 left-4 z-40 bg-green-800 hover:bg-white text-white hover:text-green-800 hover:border-green-800 border-2 py-2 px-4 rounded-xl flex items-center gap-2"
          >
              Filter
              <FaFilter />
          </button>

          <div><SideBar isOpen={isSidebarOpen} onClose={closeSidebar}/></div>

          <div><ProductList/></div>
      </div>
  )
}
