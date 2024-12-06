const Error = ({ message = "Hubo un error inesperado" }) => {
  return (
    <div className="w-full max-w-xl shadow-md rounded-lg p-4 bg-red-100 text-red-700 text-center">
      <p className="text-lg font-semibold">{message}</p>
    </div>
  )
}
  
export { Error }