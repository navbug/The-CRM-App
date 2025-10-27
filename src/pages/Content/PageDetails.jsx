import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  FaGreaterThan,
  FaTelegramPlane,
  FaEye,
  FaDownload,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { API_BARE_BASE_URL, API_BASE_URL } from "../../../config";
import EditDefaultMessageModal from "../../components/EditDefaultMessageModal";
import { deletePage, fetchPage, updatePageData } from "../../api";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { PuffLoader } from "react-spinners";
import NoDataWrapper from "../../components/NoDataWrapper";

const PageDetails = () => {
  const [page, setPage] = useState(null);
  const [isDefaultMessageModalOpen, setIsDefaultMessageModalOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleOpenDefaultMessageModal = () => {
    setIsDefaultMessageModalOpen(true);
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleCloseDefaultMessageModal = () =>
    setIsDefaultMessageModalOpen(false);

  const handleSaveDefaultMessage = async (templateMessage) => {
    const updatedPage = {
      ...page,
      template: templateMessage,
      activity: JSON.stringify(page.activity),
    };

    await updatePageData(updatedPage);
    await fetchPageDetails(id);
    handleCloseDefaultMessageModal();

    toast.success(`Page Default Message Updated`);
  };

  const fetchPageDetails = async (id) => {
    let fetchedPage = await fetchPage(id);
    setPage(fetchedPage);

    setLoading(false);
  };

  const handleDeletePage = async () => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      await deletePage(id);
      navigate("/content/pages");

      toast.remove(`Page Template Deleted`);
    }
  };

  const handleDownloadPDF = () => {
    if (page && page.pdfLink) {
      window.open(`${API_BARE_BASE_URL}${page.pdfLink}`, "_blank");
    }
  };

  useEffect(() => {
    fetchPageDetails(id);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {loading && (
        <Loading>
          <PuffLoader color="#09e34f" speedMultiplier={3} />
        </Loading>
      )}
      {!loading && !page && (
        <NoDataWrapper>No Page Template with the ID: {id} found.</NoDataWrapper>
      )}
      {!loading && page && <div>
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <nav className="text-sm flex items-center">
            <NavLink
              to="/content/pages"
              className="text-gray-600 hover:text-gray-700 underline font-bold"
            >
              Content
            </NavLink>
            <span className="mx-2 text-gray-600">
              <FaGreaterThan className="w-[8px] h-[10px]" />
            </span>
            <NavLink
              to="/content/pages"
              className="text-gray-600 hover:text-gray-700 underline font-bold"
            >
              Pages
            </NavLink>
            <span className="mx-2 text-gray-600">
              <FaGreaterThan className="w-[8px] h-[10px]" />
            </span>
            <span className="text-gray-600 font-bold">{page.title}</span>
          </nav>
        </div>
        <div className="flex justify-between items-center relative">
          <h1 className="text-3xl font-bold">{page.title}</h1>
          <button
            onClick={toggleOptions}
            className={`flex items-center justify-center gap-1 px-4 py-2 ${
              isOptionsOpen
                ? "text-white bg-teal-800"
                : "text-gray-600 hover:bg-gray-200"
            } font-semibold rounded-sm  transition duration-300`}
          >
            Options
            <BsThreeDotsVertical />
          </button>
          {isOptionsOpen && (
            <div className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <div
                  onClick={handleOpenDefaultMessageModal}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Edit Default Message
                </div>
                <button
                  onClick={handleDeletePage}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete Page
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4 pl-2">Preview</h2>
          <div className="w-full min-h-64 space-y-4 flex flex-col bg-white rounded-sm shadow-md p-4 flex-grow gap-4">
            <div className="h-84 flex flex-col justify-center items-center gap-2">
              <iframe
                src={`http://localhost:4000${page.pdfLink}`}
                title={page.title}
                width="100%"
                height="500px"
              />
              <div className="flex items-center text-lg gap-2 text-teal-500 font-semibold">
                <FaEye /> Page Preview
              </div>
            </div>
            <div className="hover:bg-gray-100 p-2">
              <h3 className="font-semibold">DEFAULT SHARE MESSAGE</h3>
              <br />
              {page.template}
            </div>
            {page.pdfLink && (
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-300"
              >
                <FaDownload /> Download PDF
              </button>
            )}
          </div>

          <div className="text-gray-600 px-2 py-4 font-semibold">
            Page last updated {page.lastUpdated}. Created {page.created}.
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Sharing History</h2>
          <div className="bg-white rounded-sm shadow-md px-6 py-3 flex-grow mb-4 flex justify-between font-semibold">
            <span>Total Sent</span>
            <span>{page.shared}</span>
          </div>

          <h2 className="text-xl font-bold mb-4">Timeline</h2>
          <div className="bg-white rounded-sm shadow-md p-6 flex-grow ">
            <div className="space-y-6">
              {page.activity.map((activity, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                      <FaTelegramPlane className="text-blue-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-500">
                        {activity.dateAndTime}
                      </p>
                    </div>
                    <p className="font-semibold">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditDefaultMessageModal
        isOpen={isDefaultMessageModalOpen}
        onClose={handleCloseDefaultMessageModal}
        onSave={handleSaveDefaultMessage}
        templateMessage={page.template}
        filename={page.title}
      />
      </div>}
    </div>
  );
};

export default PageDetails;
