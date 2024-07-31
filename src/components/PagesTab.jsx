import { useSelector } from "react-redux";
import { FaGreaterThan } from "react-icons/fa6";
import { FaAngleRight, FaSearch } from "react-icons/fa";

const PagesTab = ({ onSelectPage }) => {
  const pages = useSelector((state) => state.content.pages);
  console.log(pages);

  return <div>
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search files"
        className="w-full px-4 py-2 bg-gray-100 rounded-md"
      />
      <FaSearch className="absolute right-2 mx-auto text-gray-500" />
    </div>
    <div className="w-full space-y-4 mt-4">
      {pages.map((page, index) => (
        <div key={index} className="border rounded-md p-4 relative flex items-center gap-4">
          <div>
            <img className="w-full" src='https://via.placeholder.com/60x50' alt="" />
          </div>
          <div>
            <h3 className="font-semibold">{page.title}</h3>
            <div className="flex gap-2">
              <p className="text-xs text-gray-400 mt-2">{`Shared ${page.sharedTimes} time(s) | Last Shared ${page.lastShared}`}</p>
            </div>
            <button onClick={() => {
              onSelectPage(page)
            }} className="absolute flex items-center gap-2 right-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white px-4 py-1 rounded-md hover:bg-teal-600 transition duration-300">
              Select <FaAngleRight className="w-2 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
};

export default PagesTab;