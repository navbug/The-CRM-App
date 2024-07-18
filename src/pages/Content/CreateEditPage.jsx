import React, { useState } from 'react';
import { FaGreaterThan } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

const CreateNewPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [websiteLink, setWebsiteLink] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [youtubeVideo, setYoutubeVideo] = useState('');
  const [googleMap, setGoogleMap] = useState('');

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const handleAttachmentUpload = (event) => {
    setAttachment(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ title, description, images, websiteLink, attachment, youtubeVideo, googleMap });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <nav className="text-sm flex items-center">
            <NavLink to="/content/messages" className="text-gray-600 hover:text-gray-700 underline font-bold">Content</NavLink>
            <span className="mx-2 text-gray-600">
              <FaGreaterThan className='w-[8px] h-[10px]' />
            </span>
            <NavLink to="/content/pages" className="text-gray-600 hover:text-gray-700 underline font-bold">Pages</NavLink>
            <span className="mx-2 text-gray-600">
              <FaGreaterThan className='w-[8px] h-[10px]' />
            </span>
            <span className="text-gray-600 font-bold">File Name</span>
          </nav>
        </div>
      </header>
      <div>
        <h1 className="text-3xl font-bold mb-6">Create New Page</h1>
        <p className="text-lg text-gray-600 mb-6">Product or Event Page</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title input */}
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

          {/* Description textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <p className="text-sm text-gray-500 mb-1">Add a description about your product or event</p>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
          </div>

          {/* Image Gallery */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Gallery<span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-2">Add images by clicking on 'Upload Images' below</p>
            <div className="border border-gray-300 rounded-md p-4">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload" className="flex items-center text-teal-600 hover:text-teal-700 cursor-pointer">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Upload Images
              </label>
              {images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="w-20 h-20 relative">
                      <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover rounded" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Additional fields */}
          <div className="space-y-2">
            {/* Website Link */}
            <div className="bg-blue-50 p-4 rounded-md">
              <label htmlFor="website-link" className="block text-sm font-medium text-blue-700 mb-1">Website Link</label>
              <input
                type="url"
                id="website-link"
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
            </div>

            {/* Attachment */}
            <div className="bg-blue-50 p-4 rounded-md">
              <label htmlFor="attachment" className="block text-sm font-medium text-blue-700 mb-1">Attachment</label>
              <input
                type="file"
                id="attachment"
                onChange={handleAttachmentUpload}
                className="w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* YouTube Video */}
            <div className="bg-blue-50 p-4 rounded-md">
              <label htmlFor="youtube-video" className="block text-sm font-medium text-blue-700 mb-1">YouTube Video</label>
              <input
                type="url"
                id="youtube-video"
                value={youtubeVideo}
                onChange={(e) => setYoutubeVideo(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            {/* Google Map */}
            <div className="bg-blue-50 p-4 rounded-md">
              <label htmlFor="google-map" className="block text-sm font-medium text-blue-700 mb-1">Google Map</label>
              <input
                type="text"
                id="google-map"
                value={googleMap}
                onChange={(e) => setGoogleMap(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Google Maps embed code or link"
              />
            </div>
          </div>

          {/* Form actions */}
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={() => {/* Handle cancel action */ }}
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

export default CreateNewPage;