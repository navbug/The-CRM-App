import React, { useState } from "react";
import { FaGreaterThan, FaPlus } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import { formatDateWithYear } from "../../utils";
import { addPage } from "../../api";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [websiteLink, setWebsiteLink] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    let yOffset = 10;

    if (images.length > 0) {
      const firstImage = images[0];
      const imgData = await getBase64(firstImage);
      doc.addImage(imgData, "JPEG", 10, yOffset, 190, 100);
      yOffset += 110;
    }

    doc.setFontSize(18);
    doc.text(title, 10, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    const splitDescription = doc.splitTextToSize(description, 180);
    doc.text(splitDescription, 10, yOffset);
    yOffset += splitDescription.length * 7;

    for (let i = 1; i < images.length; i++) {
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 10;
      }
      const imgData = await getBase64(images[i]);
      doc.addImage(imgData, "JPEG", 10, yOffset, 190, 100);
      yOffset += 110;
    }

    return doc.output("blob");
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const pdfBlob = await generatePDF();
      const currentDate = formatDateWithYear(new Date());
      const activity = JSON.stringify([
        {
          details: "Page Created",
          dateAndTime: currentDate,
        },
      ]);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("websiteLink", websiteLink);
      formData.append('created', currentDate);
      formData.append('lastUpdated', currentDate);
      formData.append('activity', activity);

      images.forEach((image) => {
        formData.append(`images`, image);
      });
      formData.append("pdf", pdfBlob, "page.pdf");

      await addPage(formData);
      // await axios.post("http://localhost:4000/api/content/page", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      navigate("/content/pages");

      toast.success(`Added New Page Template 🔗`);
    } catch (error) {
      console.error("Error submitting page:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <nav className="text-sm flex items-center">
            <NavLink
              to="/content/messages"
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
            <span className="text-gray-600 font-bold">Create New Page</span>
          </nav>
        </div>
      </header>
      <div>
        <h1 className="text-3xl font-bold mb-6">Create New Page</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Gallery<span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-md p-4">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="image-upload"
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 cursor-pointer"
              >
                <FaPlus />
                Upload Images
              </label>
              {images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="w-20 h-20 relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-gray-700">
            <label htmlFor="website-link" className="block text-sm font-medium mb-1">
              Website Link
            </label>
            <input
              type="url"
              id="website-link"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={() => navigate("/content/pages")}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 border border-transparent rounded-md text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              CREATE PAGE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;


// import React, { useState } from "react";
// import { FaGreaterThan, FaPlus } from "react-icons/fa6";
// import { NavLink, useNavigate } from "react-router-dom";

// const CreateNewPage = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [websiteLink, setWebsiteLink] = useState("");
//   const navigate = useNavigate();

//   const handleImageUpload = (event) => {
//     const files = Array.from(event.target.files);
//     setImages([...images, ...files]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission logic here
//     console.log({
//       title,
//       description,
//       images,
//       websiteLink,
//     });
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <header className="mb-6">
//         <div className="flex justify-between items-center mb-4">
//           <nav className="text-sm flex items-center">
//             <NavLink
//               to="/content/messages"
//               className="text-gray-600 hover:text-gray-700 underline font-bold"
//             >
//               Content
//             </NavLink>
//             <span className="mx-2 text-gray-600">
//               <FaGreaterThan className="w-[8px] h-[10px]" />
//             </span>
//             <NavLink
//               to="/content/pages"
//               className="text-gray-600 hover:text-gray-700 underline font-bold"
//             >
//               Pages
//             </NavLink>
//             <span className="mx-2 text-gray-600">
//               <FaGreaterThan className="w-[8px] h-[10px]" />
//             </span>
//             <span className="text-gray-600 font-bold">File Name</span>
//           </nav>
//         </div>
//       </header>
//       <div>
//         <h1 className="text-3xl font-bold mb-6">Create New Page</h1>
//       </div>
//       <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title input */}
//           <div>
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Title<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//               required
//             />
//           </div>

//           {/* Description textarea */}
//           <div>
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Description<span className="text-red-500">*</span>
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               rows={4}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//             ></textarea>
//           </div>

//           {/* Image Gallery */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Image Gallery<span className="text-red-500">*</span>
//             </label>
//             <div className="border border-gray-300 rounded-md p-4">
//               <input
//                 type="file"
//                 id="image-upload"
//                 multiple
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageUpload}
//               />
//               <label
//                 htmlFor="image-upload"
//                 className="flex items-center gap-2 text-teal-600 hover:text-teal-700 cursor-pointer"
//               >
//                 <FaPlus />
//                 Upload Images
//               </label>
//               {images.length > 0 && (
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {images.map((image, index) => (
//                     <div key={index} className="w-20 h-20 relative">
//                       <img
//                         src={URL.createObjectURL(image)}
//                         alt={`Uploaded ${index + 1}`}
//                         className="w-full h-full object-cover rounded"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="text-gray-700">
//             <label
//               htmlFor="website-link"
//               className="block text-sm font-medium mb-1"
//             >
//               Website Link
//             </label>
//             <input
//               type="url"
//               id="website-link"
//               value={websiteLink}
//               onChange={(e) => setWebsiteLink(e.target.value)}
//               className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//               placeholder="https://example.com"
//             />
//           </div>

//           {/* Form actions */}
//           <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
//             <button
//               type="button"
//               className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//               onClick={() => {
//                 navigate(`/content/pages`);
//               }}
//             >
//               CANCEL
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-teal-600 border border-transparent rounded-md text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//             >
//               CREATE PAGE
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateNewPage;
