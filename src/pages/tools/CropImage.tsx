import { useState } from "react";
import { Crop, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import FileUploadBox from "@/components/FileUploadBox";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const CropImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleProcess = () => {
    if (files.length === 0) {
      toast.error("Please upload an image");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast.success("Image cropped successfully!");
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob(["Dummy cropped image"], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cropped-image.jpg";
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
                  <Crop className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Crop Image
              </h1>
              <p className="text-lg text-muted-foreground">
                Crop and trim your images to the perfect size
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Crop Your Image</CardTitle>
                <CardDescription>
                  Upload an image and select the area you want to keep
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isComplete ? (
                  <>
                    <FileUploadBox
                      accept="image/*"
                      onFilesSelected={setFiles}
                    />
                    
                    {files.length > 0 && !isProcessing && (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">
                            Interactive crop tool would appear here
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            (This is a demo - actual cropping functionality would be implemented)
                          </p>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleProcess}>
                            Crop Image
                          </Button>
                        </div>
                      </div>
                    )}

                    {isProcessing && (
                      <Loader text="Cropping image..." />
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Crop Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        Your cropped image is ready to download
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Crop Another Image
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

export default CropImage;
