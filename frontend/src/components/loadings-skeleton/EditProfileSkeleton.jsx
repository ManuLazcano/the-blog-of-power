const EditProfileSkeleton = () => {
  return (
    <div className="w-full max-w-sm flex items-center justify-center bg-gray-100 p-6 mt-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 space-y-4 animate-pulse">
        <header className="mb-4 text-center">
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto mt-2"></div>
        </header>
        <div className="space-y-3">
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div className="h-10 bg-gray-300 rounded w-24"></div>
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto mt-6"></div>
      </div>
    </div>
  )
}
  
export { EditProfileSkeleton }
  