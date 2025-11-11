import { useState } from "react";
import { FilePlus2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FileUploadBox from "@/components/FileUploadBox";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleProcess = () => {
    if (files.length < 2) {
      toast.error("Please upload at least 2 PDF files");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast.success("PDFs merged successfully!");
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob(["Dummy merged PDF"], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
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
                  <FilePlus2 className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Merge PDF Files
              </h1>
              <p className="text-lg text-muted-foreground">
                Combine multiple PDF files into a single document
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Merge PDF Files</CardTitle>
                <CardDescription>
                  Upload multiple PDF files to merge them into one
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isComplete ? (
                  <>
                    <FileUploadBox
                      accept=".pdf"
                      multiple
                      onFilesSelected={setFiles}
                      maxFiles={10}
                    />
                    
                    {!isProcessing && files.length >= 2 && (
                      <div className="flex justify-end">
                        <Button onClick={handleProcess}>
                          Merge PDFs
                        </Button>
                      </div>
                    )}

                    {isProcessing && (
                      <Loader text="Merging PDF files..." />
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Merge Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        Your merged PDF is ready to download
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Merge More PDFs
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

export default MergePDF;
