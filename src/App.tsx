import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExamsList from "./pages/ExamsList";
import ExamDetails from "./pages/ExamDetails";
import BulkProcessor from "./pages/BulkProcessor";
import Tools from "./pages/Tools";
import ImageToPDF from "./pages/tools/ImageToPDF";
import PDFToImage from "./pages/tools/PDFToImage";
import ResizeImage from "./pages/tools/ResizeImage";
import CompressImage from "./pages/tools/CompressImage";
import CompressPDF from "./pages/tools/CompressPDF";
import MergePDF from "./pages/tools/MergePDF";
import SplitPDF from "./pages/tools/SplitPDF";
import CropImage from "./pages/tools/CropImage";
import RemoveBG from "./pages/tools/RemoveBG";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exams" element={<ExamsList />} />
          <Route path="/exams/:id" element={<ExamDetails />} />
          <Route path="/bulk" element={<BulkProcessor />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/image-to-pdf" element={<ImageToPDF />} />
          <Route path="/tools/pdf-to-image" element={<PDFToImage />} />
          <Route path="/tools/resize-image" element={<ResizeImage />} />
          <Route path="/tools/compress-image" element={<CompressImage />} />
          <Route path="/tools/compress-pdf" element={<CompressPDF />} />
          <Route path="/tools/merge-pdf" element={<MergePDF />} />
          <Route path="/tools/split-pdf" element={<SplitPDF />} />
          <Route path="/tools/crop-image" element={<CropImage />} />
          <Route path="/tools/remove-bg" element={<RemoveBG />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
