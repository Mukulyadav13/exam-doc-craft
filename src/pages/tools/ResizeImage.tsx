import { useState } from "react";
import { Scissors, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUploadBox from "@/components/FileUploadBox";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ResizeImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
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
      toast.success("Image resized successfully!");
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob(["Dummy resized image"], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resized-image.jpg";
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
                  <Scissors className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Resize Image
              </h1>
              <p className="text-lg text-muted-foreground">
                Adjust image dimensions to meet your requirements
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Resize Your Image</CardTitle>
                <CardDescription>
                  Upload an image and specify the desired dimensions
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="width">Width (px)</Label>
                            <Input
                              id="width"
                              type="number"
                              value={width}
                              onChange={(e) => setWidth(e.target.value)}
                              placeholder="800"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="height">Height (px)</Label>
                            <Input
                              id="height"
                              type="number"
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                              placeholder="600"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleProcess}>
                            Resize Image
                          </Button>
                        </div>
                      </div>
                    )}

                    {isProcessing && (
                      <Loader text="Resizing image..." />
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Resize Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        Your resized image is ready ({width}x{height}px)
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Resize Another Image
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

export default ResizeImage;
