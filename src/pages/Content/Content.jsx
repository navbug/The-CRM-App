// import React, { useState } from 'react';
// import { NavLink, Outlet, useLocation, useNavigation } from 'react-router-dom';
// import { FaUpload, FaPlus } from "react-icons/fa6";

// import { contentTabs } from '../../constants';
// import NewMessageTemplateModal from '../../components/NewMessageTemplateModal';
// import FileUploadModal from '../../components/FileUploadModal';

// const Content = () => {
//   const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
//   const [isFileModalOpen, setIsFileModalOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigation();

//   const tabName = location.pathname.split('/')[2];

//   const addButton = () => {
//     let buttonContent = "";
//     let onClickHandler = () => {};

//     if(tabName === "messages") {
//       buttonContent = `+ New Message`;
//       onClickHandler = () => setIsMessageModalOpen(true);
//     } else if(tabName === "files") {
//       buttonContent = `↑ Upload File`;
//       onClickHandler = () => setIsFileModalOpen(true);
//     } else if(tabName === "pages") {
//       buttonContent = `+ Create Page`;
//       onClickHandler = () => navigate(`/content/pages/new`);
//     }

//     return (
//       <button 
//         onClick={onClickHandler} 
//         className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
//       >
//         {buttonContent}
//       </button>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold">Content</h1>
//         {addButton()}
//       </div>

//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="flex border-b">
//           {contentTabs.map((tab) => (
//             <NavLink
//               key={tab.name}
//               to={tab.path}
//               end={tab.path === '/content'}
//               className={({ isActive }) =>
//                 `py-4 px-6 font-medium ${isActive
//                   ? 'border-b-2 border-teal-500 text-teal-500'
//                   : 'text-gray-500 hover:text-gray-700'
//                 }`
//               }
//             >
//               {tab.name}
//             </NavLink>
//           ))}
//         </div>
//         <Outlet />
//       </div>

//       <NewMessageTemplateModal 
//         isOpen={isMessageModalOpen} 
//         onClose={() => setIsMessageModalOpen(false)} 
//       />
//       <FileUploadModal 
//         isOpen={isFileModalOpen} 
//         onClose={() => setIsFileModalOpen(false)} 
//       />
//     </div>
//   );
// };

// export default Content;

import React, { useState, useCallback } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { FaUpload, FaPlus } from "react-icons/fa6";

import { contentTabs } from '../../constants';
import NewMessageTemplateModal from '../../components/NewMessageTemplateModal';
import FileUploadModal from '../../components/FileUploadModal';

const Content = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const location = useLocation();

  const tabName = location.pathname.split('/')[2];

  const handleOpenMessageModal = useCallback(() => setIsMessageModalOpen(true), []);
  const handleCloseMessageModal = useCallback(() => setIsMessageModalOpen(false), []);
  const handleOpenFileModal = useCallback(() => setIsFileModalOpen(true), []);
  const handleCloseFileModal = useCallback(() => setIsFileModalOpen(false), []);

  const renderAddButton = () => {
    switch(tabName) {
      case 'messages':
        return (
          <button onClick={handleOpenMessageModal} className="add-button">
            + New Message
          </button>
        );
      case 'files':
        return (
          <button onClick={handleOpenFileModal} className="add-button">
            ↑ Upload File
          </button>
        );
      case 'pages':
        return (
          <Link to="/content/pages/new" className="add-button">
            + Create Page
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Content</h1>
        <div className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'>{renderAddButton()}</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <nav className="flex border-b">
          {contentTabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.path === '/content/messages'}
              className={({ isActive }) =>
                `py-4 px-6 font-medium ${
                  isActive
                    ? 'border-b-2 border-teal-500 text-teal-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>

      <NewMessageTemplateModal 
        isOpen={isMessageModalOpen} 
        onClose={handleCloseMessageModal} 
      />
      <FileUploadModal 
        isOpen={isFileModalOpen} 
        onClose={handleCloseFileModal} 
      />
    </div>
  );
};

export default Content;