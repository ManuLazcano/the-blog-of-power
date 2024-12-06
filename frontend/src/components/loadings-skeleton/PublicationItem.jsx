const PublicationItemSkeleton = () => {
  return (
    <article className="w-full max-w-xl shadow-md rounded-lg p-4 bg-gray-200 animate-pulse flex flex-col">
      <header>
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
      </header>
        <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div>
      <footer className="mt-4 flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-8 bg-gray-300 rounded w-24"></div>
      </footer>
    </article>
  )
}
  
export { PublicationItemSkeleton }