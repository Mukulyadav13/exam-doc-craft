import { useState } from "react";
import { Minimize2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import FileUploadBox from "@/components/FileUploadBox";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const CompressImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState([80]);
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
      toast.success("Image compressed successfully!");
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob(["Dummy compressed image"], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed-image.jpg";
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
                  <Minimize2 className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Compress Image
              </h1>
              <p className="text-lg text-muted-foreground">
                Reduce image file size without significant quality loss
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Compress Your Image</CardTitle>
                <CardDescription>
                  Upload an image and adjust the compression quality
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
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label>Compression Quality</Label>
                            <span className="text-sm font-medium text-primary">
                              {quality[0]}%
                            </span>
                          </div>
                          <Slider
                            value={quality}
                            onValueChange={setQuality}
                            min={1}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            Lower values = smaller file size, higher values = better quality
                          </p>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button onClick={handleProcess}>
                            Compress Image
                          </Button>
                        </div>
                      </div>
                    )}

                    {isProcessing && (
                      <Loader text="Compressing image..." />
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-6 py-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Compression Complete!
                      </h3>
                      <p className="text-muted-foreground">
                        Your compressed image is ready (Quality: {quality[0]}%)
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Compress Another Image
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

export default CompressImage;
