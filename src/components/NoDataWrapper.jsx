const NoDataWrapper = ({ children, height = "40"}) => {
  return (
    <div className="w-full flex-center">
      <div className={`flex justify-center items-center h-[${height}vh] text-xl font-bold text-gray-600`}>
        {children}
      </div>
    </div>
  );
};

export default NoDataWrapper;
