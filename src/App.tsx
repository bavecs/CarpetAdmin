
import './App.css'
import KepekHelye from './components/KepekHelye'
import Table from './components/Table'
import feltoltes from "./data/feltoltes.json";
import { GlobalDataProvider } from './components/GlobalDataContext';


function App() {


  return (
    <>
      <GlobalDataProvider>
      <div id="menubar">
        <KepekHelye />
      </div>
      <div id="content" className="content">
        
        <Table szonyegekJson={feltoltes.szonyegek} />
        
      </div>
      </GlobalDataProvider>




      



    </>
  )
}

export default App
