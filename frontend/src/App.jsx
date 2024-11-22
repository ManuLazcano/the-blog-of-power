import { NavBar } from "./components/NavBar"
import { PublicationItem } from "./components/PublicationItem"
import { PublicationList } from "./components/PublicationList"


function App() {

  return (
    <>
      <NavBar />

      <PublicationList >
        <PublicationItem />
        <PublicationItem />
        <PublicationItem />
      </PublicationList >
    </>
  )
}

export default App
