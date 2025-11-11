import { useState } from "react";
import { FileImage, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FileUploadBox from "@/components/FileUploadBox";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ImageToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleProcess = () => {
    if (files.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast.success("Images converted to PDF!");
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob(["Dummy PDF content"], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download started!");
  };

  const handleReset = () => {
    setFiles([]);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <FileImage className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Image to PDF Converter
              </h1>
              <p className="text-lg text-muted-foreground">
                Convert your images to PDF format instantly
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Convert Images to PDF</CardTitle>
                <CardDescription>
                  Upload one or multiple images to convert them into a single PDF file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isComplete ? (
                  <>
                    <FileUploadBox
                      accept="image/*"
                      multiple
                      onFilesSelected={setFiles}
                      maxFiles={10}
                    />
                    
                    {!isProcessing && files.length > 0 && (
                      <div className="flex justify-end">
                        <Button onClick={handleProcess}>
                          Convert to PDF
                        </Button>
                      </div>
                    )}

                    {isProcessing && (
                      <Loader text="Converting images to PDF..." />
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Conversion Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        Your PDF is ready to download
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Convert More Images
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ImageToPDF;
