import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accounts from "./Pages/Accounts";
import Home from "./Pages/Home";
import Journals from "./Pages/Journals";
import Login from "./Pages/Login";
import Transactions from "./Pages/Transactions";
import InputMain from "./Pages/InputMain";
import Report1 from "./Pages/Report1"
import Report2 from "./Pages/Report2"
import Report3 from "./Pages/Report3";
import AdjustingEntry from "./Pages/AdjustingEntry";




function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />} />

              <Route path='/input-main/' element={<InputMain />} />
              <Route path='/input-main/adjusting-entry/' element={<AdjustingEntry />} />

              <Route path='/login/' element={<Login />} />
              <Route path='/accounts/' element={<Accounts />} />
              <Route path='/transactions/' element={<Transactions />} />
              <Route path='/journals/' element={<Journals />} />

                {/* Report1 = Report Ledger */}
              <Route path='/report1/' element={<Report1 />} /> 
                {/* Report2 = Report trial balance */}
              <Route path='/report2/' element={<Report2 />} /> 



          </Routes>
      </BrowserRouter>
  );
}

export default App;
