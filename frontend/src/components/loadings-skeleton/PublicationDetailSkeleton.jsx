const PublicationDetailSkeleton = () => {
    return (
      <article className="bg-gray-200 shadow-md rounded-lg w-full p-6 max-w-2xl mx-auto h-auto min-h-[500px] sm:min-h-[600px] flex flex-col animate-pulse">
        <header>
          <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
        </header>
        <div className="flex-grow space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
        <footer className="mt-6 space-y-3">
          <div className="h-8 bg-gray-300 rounded w-24"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </footer>
      </article>
    );
  };
  
  export { PublicationDetailSkeleton };
  