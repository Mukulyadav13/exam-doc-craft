import { 
  FileImage, 
  Image, 
  Scissors, 
  Minimize2, 
  FileText,
  FilePlus2,
  FileMinus2,
  Crop,
  Eraser
} from "lucide-react";
import ToolCard from "@/components/ToolCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Tools = () => {
  const tools = [
    {
      title: "Image to PDF",
      description: "Convert images to PDF format",
      icon: FileImage,
      link: "/tools/image-to-pdf"
    },
    {
      title: "PDF to Image",
      description: "Extract images from PDF files",
      icon: Image,
      link: "/tools/pdf-to-image"
    },
    {
      title: "Resize Image",
      description: "Adjust image dimensions",
      icon: Scissors,
      link: "/tools/resize-image"
    },
    {
      title: "Compress Image",
      description: "Reduce image file size",
      icon: Minimize2,
      link: "/tools/compress-image"
    },
    {
      title: "Compress PDF",
      description: "Reduce PDF file size",
      icon: FileText,
      link: "/tools/compress-pdf"
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files",
      icon: FilePlus2,
      link: "/tools/merge-pdf"
    },
    {
      title: "Split PDF",
      description: "Split PDF into multiple files",
      icon: FileMinus2,
      link: "/tools/split-pdf"
    },
    {
      title: "Crop Image",
      description: "Crop and trim your images",
      icon: Crop,
      link: "/tools/crop-image"
    },
    {
      title: "Remove Background",
      description: "Remove image background",
      icon: Eraser,
      link: "/tools/remove-bg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Document Processing Tools
              </h1>
              <p className="text-lg text-muted-foreground">
                Professional tools to prepare your documents perfectly for any exam
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tools;
