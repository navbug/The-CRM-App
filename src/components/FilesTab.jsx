import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaFileAlt, FaSearch } from "react-icons/fa";
import { fetchFiles } from "../api";
import Loading from "./Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "./NoDataWrapper";

const FilesTab = ({ onSelectFile }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllFiles = async () => {
    const fetchedFiles = await fetchFiles();
    setFiles(fetchedFiles);

    setLoading(false);
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  return (
    <div>
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && files.length === 0 && (
        <NoDataWrapper>No File Templates.</NoDataWrapper>
      )}
      {!loading && files.length > 0 && (
        <div className="w-full space-y-4 mt-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="border rounded-md p-4 relative flex items-center gap-4 cursor-pointer"
            >
              <div>
                <FaFileAlt className="w-7 h-9 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold">{file.title}</h3>
                {/* <p className="text-sm text-gray-600 mt-1">PDF 2 pages</p> */}
                <div className="flex gap-2">
                  <p className="text-xs text-gray-400 mt-2">{`Shared ${file.shared} time(s)`}</p>
                </div>
                <button
                  onClick={() => {
                    onSelectFile(file);
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

export default FilesTab;
