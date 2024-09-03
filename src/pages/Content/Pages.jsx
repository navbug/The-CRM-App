import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPages } from "../../api";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "../../components/NoDataWrapper";

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log(pages);

  const fetchAllPages = async () => {
    const fetchedPages = await fetchPages();
    setPages(fetchedPages);

    setLoading(false);
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleDelete = async (pageId) => {
  //   if (window.confirm("Are you sure you want to delete this page?")) {
  //     try {
  //       await axios.delete(`http://localhost:4000/api/content/page/${pageId}`);
  //       fetchPages();
  //     } catch (error) {
  //       console.error("Error deleting page:", error);
  //     }
  //   }
  // };

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
        <NoDataWrapper>No Pages Found.</NoDataWrapper>
      )}
      {!loading && pages.length > 0 && (
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow flex items-center">
              <input
                type="text"
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-2 mx-auto text-gray-500" />
            </div>
          </div>

          {filteredPages.length === 0 && (
            <NoDataWrapper height={10}>No Page</NoDataWrapper>
          )}
          {filteredPages.length > 0 && (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium text-gray-500 flex items-center gap-1">
                    TITLE
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    SHARED
                  </th>
                  <th className="text-left py-2 px-4 font-medium text-gray-500">
                    LAST SHARED
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPages?.map((page, index) => (
                  <tr
                    onClick={() => navigate(`/content/page/${page._id}`)}
                    key={index}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-4">{page.title.slice(0, 30)}</td>
                    <td className="py-3 px-4">{page.shared}</td>
                    <td className="py-3 px-4">
                      {page.lastShared ? page.lastShared : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Pages;
