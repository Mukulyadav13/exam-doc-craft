import { useState } from "react";
import { Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploadBox from "@/components/FileUploadBox";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

type ProcessingStep = "upload" | "preview" | "processing" | "complete";

const BulkProcessor = () => {
  const [currentStep, setCurrentStep] = useState<ProcessingStep>("upload");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handlePreview = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one file");
      return;
    }
    setCurrentStep("preview");
  };

  const handleProcess = () => {
    setCurrentStep("processing");
    
    // Simulate processing
    setTimeout(() => {
      setCurrentStep("complete");
      toast.success("Documents processed successfully!");
    }, 1500);
  };

  const handleDownload = () => {
    // Create dummy ZIP file (in reality, you'd generate actual processed files)
    const blob = new Blob(["Dummy processed documents"], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "processed-documents.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download started!");
  };

  const handleReset = () => {
    setCurrentStep("upload");
    setSelectedFiles([]);
  };

  const steps = [
    { id: "upload", label: "Upload" },
    { id: "preview", label: "Preview" },
    { id: "processing", label: "Process" },
    { id: "complete", label: "Download" }
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Bulk Document Processing
              </h1>
              <p className="text-lg text-muted-foreground">
                Upload multiple documents and process them all at once
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                          index <= currentStepIndex
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index < currentStepIndex ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <p
                        className={`text-sm font-medium mt-2 ${
                          index <= currentStepIndex
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-4 transition-colors ${
                          index < currentStepIndex ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === "upload" && "Upload Your Documents"}
                  {currentStep === "preview" && "Preview Your Files"}
                  {currentStep === "processing" && "Processing Your Documents"}
                  {currentStep === "complete" && "Processing Complete"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === "upload" && (
                  <>
                    <FileUploadBox
                      multiple
                      accept="image/*,.pdf"
                      onFilesSelected={handleFilesSelected}
                      maxFiles={10}
                    />
                    {selectedFiles.length > 0 && (
                      <div className="flex justify-end">
                        <Button onClick={handlePreview}>
                          Continue to Preview
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {currentStep === "preview" && (
                  <>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Review your selected files before processing:
                      </p>
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted/50 rounded-lg"
                          >
                            <p className="font-medium text-foreground">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button variant="outline" onClick={handleReset}>
                        Back to Upload
                      </Button>
                      <Button onClick={handleProcess}>
                        Process Documents
                      </Button>
                    </div>
                  </>
                )}

                {currentStep === "processing" && (
                  <Loader text="Processing your documents..." size="lg" />
                )}

                {currentStep === "complete" && (
                  <div className="text-center space-y-6 py-8">
                    <div className="flex justify-center">
                      <div className="p-4 bg-success/10 rounded-full">
                        <CheckCircle className="h-16 w-16 text-success" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Processing Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        Your documents have been processed and are ready to download
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download ZIP
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Process More Files
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

export default BulkProcessor;
