import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronUp, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchFiles } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setInitialFiles } from "../../redux/reducers/contentReducer";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "../../components/NoDataWrapper";

const Files = () => {
  const [files, setFiles] = useState([]);
  const { files: filesInformation } = useSelector((state) => state.content);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAllFiles = async () => {
    const fetchedFiles = await fetchFiles();
    setFiles(fetchedFiles);
    dispatch(setInitialFiles(fetchedFiles));

    setLoading(false);
  };

  const filteredFiles = filesInformation.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchAllFiles();
  }, []);

  console.log(filteredFiles);
  return (
    <div>
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && files.length === 0 && (
        <NoDataWrapper>No Files Found.</NoDataWrapper>
      )}
      {!loading && files.length > 0 && (
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow flex items-center">
              <input
                type="text"
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-2 mx-auto text-gray-500" />
            </div>
          </div>

          {filteredFiles.length === 0 && (
            <NoDataWrapper height={10}>No File</NoDataWrapper>
          )}
          {filteredFiles.length > 0 && (
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
                {filteredFiles.map((file, index) => (
                  <tr
                    onClick={() => navigate(`/content/file/${file._id}`)}
                    key={index}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-4">{file.title.slice(0, 30)}</td>
                    <td className="py-3 px-4">{file.shared}</td>
                    <td className="py-3 px-4">{file.lastShared || "-"}</td>
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

export default Files;
