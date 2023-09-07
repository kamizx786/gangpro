import React, { useContext } from "react";
import { NavbarContext } from "../App";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import ProtectedRoute from "../components/helpers/ProtectRoute";
import Profile from "../views/profile";
import PricingPage from "../views/pricing";
import CleanupCalculator from "../views/cleanupCalculator/index";
import GcQualify from "../views/planify/GcQualify";
import ProjectBoardList from "../views/projectBoardList/ProjectBoardList";
import { ProjectBoard } from "../views/projectBoard/ProjectBoard";
import Home from "../views/home";
import DocumentGenerator from "../views/proposal/documentGenerator";
import Proposal from "../views/proposal";
import ProposalTemplate from "../views/proposal/proposalTemplate";
import Planify from "../views/planify";
import PlanRoom from "../views/planify/planroom";
import ProjectFavorite from "../views/projects/favorite";
import ProjectArchive from "../views/projects/archived";
import Calculator from "../views/cleanupCalculator/calculator_index";
import CleanupRates from "../views/cleanupCalculator/cleanup_rates";
import CompanyDetailsForms from "../views/prequelMasterKey/CompanyDetailsForms";
import PDF from "../components/PDF/PDF";
import PDFVersion_A from "../components/PDF/Versions/PDFVersion_A"
import PDFVersion_B from "../components/PDF/Versions/PDFVersion_B"

const AuthRoutes = () => {
  const { showLargeScreenNav } = useContext(NavbarContext);
  return (
    <>
      <Navbar />
      <div
      // className={classNames(
      //   "page-container",
      //   showLargeScreenNav ? "move-page" : "unmove-page"
      // )}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/my_proposal" element={<DocumentGenerator />} />
          <Route path="my_proposal/edit/:id" element={<DocumentGenerator />} />
          <Route
            path="/cleanup_calculator_overview"
            element={<Calculator />}
          ></Route>
          <Route path="/cleanup_calculator" element={<CleanupCalculator />} />
          <Route path="/cleanup_rates" element={<CleanupRates />} />
          <Route path="/pre_qualify" element={<GcQualify />} />
          <Route path="/planify" element={<Planify />} />
          <Route
            path="/cleanup_calculator/edit/:id"
            element={<CleanupCalculator />}
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/project_board" element={<ProjectBoardList />} />
          <Route
            path="/project_board/:projectSlug"
            element={<ProjectBoard />}
          />
          {/*<Route path="/myproposal" element={<MyProposal />} />*/}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/proposal_templates" element={<ProposalTemplate />} />
          <Route path="/plan_room" element={<PlanRoom />} />
          <Route
            path="/myganarpro/favorites"
            element={
              <ProtectedRoute>
                <ProjectFavorite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myganarpro/hiddenProjects"
            element={
              <ProtectedRoute>
                <ProjectArchive />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prequel-masterkey"
            element={
              <ProtectedRoute>
                <CompanyDetailsForms />
              </ProtectedRoute>
            }
          />
          {/* PDF */}
          <Route path="/pdf" element={<PDF/>} />
          <Route path="/pdf/Version-A" element={<PDFVersion_A />} />
          <Route path="/pdf/Version-B" element={<PDFVersion_B />} />

        </Routes>
      </div>
    </>
  );
};

export default AuthRoutes;
