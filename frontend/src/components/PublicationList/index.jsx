const PublicationList = ({ children }) => {
  return(
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 w-full max-w-6xl">
      {children}
    </section>     
  )
}

export { PublicationList }