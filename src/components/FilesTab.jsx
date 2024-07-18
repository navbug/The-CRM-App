import { useSelector } from "react-redux";
import { FaGreaterThan } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";

const FilesTab = ({ onSelectFile }) => {
  const files = useSelector((state) => state.content.files);
  console.log(files);

  return <div>
    <div className="relative">
      <input
        type="text"
        placeholder="Search files"
        className="w-full px-4 py-2 bg-gray-100 rounded-md"
      />
      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <div className="flex justify-end mt-2 text-sm text-gray-500">
      SORT BY: RECENTLY USED ▼
    </div>
    <div className="w-full space-y-4 mt-4">
      {files.map((file, index) => (
        <div key={index} className="border rounded-md p-4 relative flex items-center gap-4">
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
              Select <FaGreaterThan className="w-2 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
};

export default FilesTab;