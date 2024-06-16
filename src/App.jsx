import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import ReactionTimeTest from "./pages/ReactionTimeTest";
import SequenceMemoryTest from "./pages/SequenceMemoryTest";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/reactiontime" element={<ReactionTimeTest />}></Route>
          <Route path="/sequencememory" element={<SequenceMemoryTest />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
