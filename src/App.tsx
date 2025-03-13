
import './App.css'
import KepekHelye from './components/KepekHelye'
import Table from './components/Table'
import feltoltes from "./data/feltoltes.json";
import { GlobalDataProvider } from './components/GlobalDataContext';
import Footer from './components/Footer';


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


    <Footer />

      



    </>
  )
}

export default App
