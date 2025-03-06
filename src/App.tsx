
import './App.css'
import Table from './components/Table'

function App() {

  return (
    <>
      <div id="menubar">

      </div>
      <div id="content" className="content">
        <Table />
      </div>




      <div id="footer" className="w-full p-4 bg-white border-t border-gray-200 md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">

        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"> Készítette: Vécsei Balázs | © 2025 Budapest | balazs.vecsei@gmail.com
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="mailto:balazs.vecsei@gmail.com" className="hover:underline me-4 md:me-6">E-mail</a>
          </li>
          <li>
            <a href="http://github.com/bavecs" className="hover:underline me-4 md:me-6">Github</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Messenger</a>
          </li>
        </ul>
      </div>



    </>
  )
}

export default App
