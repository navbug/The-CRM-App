import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaGreaterThan } from "react-icons/fa6";
import { FaAngleRight, FaSearch } from "react-icons/fa";
import { fetchPages } from "../api";
import { RiPagesFill } from "react-icons/ri";
import Loading from "./Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "./NoDataWrapper";

const PagesTab = ({ onSelectPage }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPages = async () => {
    const fetchedPages = await fetchPages();
    setPages(fetchedPages);

    setLoading(false);
  };

  useEffect(() => {
    fetchAllPages();
  }, []);

  return (
    <div>
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && pages.length === 0 && (
        <NoDataWrapper>No Page Templates.</NoDataWrapper>
      )}
      {!loading && pages.length > 0 && (
        <div className="w-full space-y-4 mt-4">
          {pages.map((page, index) => (
            <div
              key={index}
              className="border rounded-md p-4 relative flex items-center gap-4"
            >
              <div>
                <RiPagesFill className="w-8 h-10 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold">{page.title}</h3>
                <div className="flex gap-2">
                  <p className="text-xs text-gray-400 mt-2">{`Shared ${page.shared} time(s)`}</p>
                </div>
                <button
                  onClick={() => {
                    onSelectPage(page);
                  }}
                  className="absolute flex items-center gap-2 right-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white px-4 py-1 rounded-md hover:bg-teal-600 transition duration-300"
                >
                  Select <FaAngleRight className="w-2 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagesTab;
