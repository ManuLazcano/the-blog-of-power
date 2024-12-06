const ProfileSkeleton = () => {
    return (
      <div className="animate-pulse space-y-6 max-w-sm w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mt-2"></div>
          
        <div className="space-y-4 mt-6">
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
          
        <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto mt-4"></div>
      </div>
    );
  };
  
  export { ProfileSkeleton };