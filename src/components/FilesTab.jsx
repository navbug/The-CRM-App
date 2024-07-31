import { useSelector } from "react-redux";
import { FaAngleRight, FaFileAlt, FaSearch } from "react-icons/fa";

const FilesTab = ({ onSelectFile }) => {
  const files = useSelector((state) => state.content.files);
  console.log(files);

  return <div>
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search files"
        className="w-full px-4 py-2 bg-gray-100 rounded-md"
      />
      <FaSearch className="absolute right-2 mx-auto text-gray-500"/>
    </div>
    <div className="w-full space-y-4 mt-4">
      {files.map((file, index) => (
        <div key={index} className="border rounded-md p-4 relative flex items-center gap-4 cursor-pointer">
          <div>
            <FaFileAlt className="w-7 h-9 text-gray-500"/>
          </div>
          <div>
            <h3 className="font-semibold">{file.title}</h3>
            <p className="text-sm text-gray-600 mt-1">PDF 2 pages</p>
            <div className="flex gap-2">
              <p className="text-xs text-gray-400 mt-2">{`Shared ${file.sharedTimes} time(s) | Last Shared ${file.lastShared}`}</p>
            </div>
            <button onClick={() => {
              onSelectFile(file)
            }} className="absolute flex items-center gap-2 right-4 top-1/2 transform -translate-y-1/2 bg-teal-500 text-white px-4 py-1 rounded-md hover:bg-teal-600 transition duration-300">
              Select <FaAngleRight className="w-2 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
};

export default FilesTab;