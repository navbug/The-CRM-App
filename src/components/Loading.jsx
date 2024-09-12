const Loading = ({ children, height = "60" }) => {
  return (
    <div className="w-full flex-center">
      <div className={`flex justify-center items-center h-[${height}vh]`}>
        {children}
      </div>
    </div>
  );
};

export default Loading;
