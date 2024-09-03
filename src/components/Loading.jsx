const Loading = ({ children }) => {
  return (
    <div className="w-full flex-center">
      <div className="flex justify-center items-center h-[40vh]">
        {children}
      </div>
    </div>
  );
};

export default Loading;
