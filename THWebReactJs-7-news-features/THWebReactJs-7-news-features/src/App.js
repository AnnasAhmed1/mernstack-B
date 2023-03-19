import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Index";
import NewsFeatures from "./Pages/NewsFeatures/Index";
import Places from "./Pages/Places/Index";
import Guides from "./Pages/Guides/Index";
import PlaceDetails from "./Pages/Places/PlaceDetails";
import NewsFeaturesDetails from "./Pages/NewsFeatures/Details";
import GuideDetails from "./Pages/Guides/GuideDetails";
import Membership from "./Pages/Membership/Index";
import MembershipPerks from "./Pages/HunterMemberPerks/Index";
import About from "./Pages/About/Index";
import Faqs from "./Pages/Faqs/Index";
import Dummy from "./Pages/dummy";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default/Home */}
        <Route path="/" element={<Home />} />
        {/* News & Features */}
        <Route path="/news-features" element={<NewsFeatures />} />
        <Route path="/news-features/:id" element={<NewsFeaturesDetails />} />

        <Route path="/places" element={<Places />} />
        <Route path="/places/:placeName" element={<Places />} />
        <Route path="/placeDetails/:id" element={<PlaceDetails />} />
        <Route path="/place/:placeName" element={<PlaceDetails />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:guidesname" element={<Guides />} />
        <Route path="/guides/:guidesname/:id" element={<GuideDetails />} />
        <Route path="/guideDetails/:id" element={<GuideDetails />} />
        {/* <Route path="/guides/:guideName" element={<Guides />} /> */}

        {/* Membership */}
        <Route path="/membership" element={<Membership />} />

        {/* Membership Perks */}
        <Route path="/membership-perks" element={<MembershipPerks />} />
        <Route path="/perks" element={<MembershipPerks />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* About */}
        <Route path="/faq" element={<Faqs />} />
        <Route path="/Dummy" element={<Dummy />} />
      </Routes>
    </Router>
  );
}

export default App;
