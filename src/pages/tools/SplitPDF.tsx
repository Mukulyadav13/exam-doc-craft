import { useState } from "react";
import { FileMinus2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FileUploadBox from "@/components/FileUploadBox";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const SplitPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pageRange, setPageRange] = useState("1-5");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleProcess = () => {
    if (files.length === 0) {
      toast.error("Please upload a PDF file");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast.success("PDF split successfully!");
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob(["Dummy split PDFs"], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "split-pdfs.zip";
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
                  <FileMinus2 className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Split PDF
              </h1>
              <p className="text-lg text-muted-foreground">
                Extract specific pages or split PDF into multiple files
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Split Your PDF</CardTitle>
                <CardDescription>
                  Upload a PDF and specify which pages to extract
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isComplete ? (
                  <>
                    <FileUploadBox
                      accept=".pdf"
                      onFilesSelected={setFiles}
                    />
                    
                    {files.length > 0 && !isProcessing && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="pageRange">Page Range</Label>
                          <Input
                            id="pageRange"
                            type="text"
                            value={pageRange}
                            onChange={(e) => setPageRange(e.target.value)}
                            placeholder="e.g., 1-5, 7, 9-12"
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter page numbers or ranges separated by commas
                          </p>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleProcess}>
                            Split PDF
                          </Button>
                        </div>
                      </div>
                    )}

                    {isProcessing && (
                      <Loader text="Splitting PDF..." />
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Split Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        Your split PDF files are ready (Pages: {pageRange})
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Files (ZIP)
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Split Another PDF
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

export default SplitPDF;
