import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DocumentRequirement } from "@/data/exams";
import { toast } from "sonner";
import Loader from "./Loader";

interface UploadedFile {
  file: File;
  preview: string;
  format: string;
  size: number;
  dimensions?: { width: number; height: number };
  isCompliant: boolean;
  issues: string[];
}

interface ConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: DocumentRequirement;
  uploadedFile: UploadedFile;
  onConversionComplete: (file: File) => void;
}

const ConversionDialog = ({ 
  open, 
  onOpenChange, 
  document, 
  uploadedFile,
  onConversionComplete 
}: ConversionDialogProps) => {
  const [targetFormat, setTargetFormat] = useState(document.format[0]);
  const [width, setWidth] = useState(uploadedFile.dimensions?.width.toString() || "800");
  const [height, setHeight] = useState(uploadedFile.dimensions?.height.toString() || "600");
  const [quality, setQuality] = useState([80]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      // Create dummy converted file
      const blob = new Blob(["Converted file content"], { 
        type: `image/${targetFormat.toLowerCase()}` 
      });
      const file = new File(
        [blob], 
        `converted-${uploadedFile.file.name}.${targetFormat.toLowerCase()}`,
        { type: blob.type }
      );
      
      setIsProcessing(false);
      onConversionComplete(file);
      toast.success("Document converted successfully!");
    }, 2000);
  };

  // Parse dimensions from requirement
  const getRecommendedDimensions = () => {
    if (!document.dimensions) return null;
    const match = document.dimensions.match(/(\d+\.?\d*)\s*cm\s*x\s*(\d+\.?\d*)\s*cm/i);
    if (match) {
      const widthCm = parseFloat(match[1]) * 37.8;
      const heightCm = parseFloat(match[2]) * 37.8;
      return { width: Math.round(widthCm), height: Math.round(heightCm) };
    }
    return null;
  };

  const recommended = getRecommendedDimensions();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Convert & Resize Document</DialogTitle>
          <DialogDescription>
            Adjust your document to meet the requirements for {document.name}
          </DialogDescription>
        </DialogHeader>

        {!isProcessing ? (
          <div className="space-y-6 py-4">
            {/* Format Selection */}
            <div className="space-y-2">
              <Label htmlFor="format">Target Format</Label>
              <Select value={targetFormat} onValueChange={setTargetFormat}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {document.format.map((fmt) => (
                    <SelectItem key={fmt} value={fmt}>
                      {fmt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Required: {document.format.join(", ")}
              </p>
            </div>

            {/* Dimensions */}
            {uploadedFile.file.type.startsWith("image/") && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                
                {recommended && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setWidth(recommended.width.toString());
                        setHeight(recommended.height.toString());
                      }}
                    >
                      Use Recommended: {recommended.width} x {recommended.height} px
                    </Button>
                  </div>
                )}

                {document.dimensions && (
                  <p className="text-xs text-muted-foreground">
                    Required dimensions: {document.dimensions}
                  </p>
                )}
              </div>
            )}

            {/* Quality/Compression */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="quality">Quality / Compression</Label>
                <span className="text-sm text-muted-foreground">{quality[0]}%</span>
              </div>
              <Slider
                id="quality"
                value={quality}
                onValueChange={setQuality}
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Lower quality = smaller file size. Max size: {document.maxSize}
              </p>
            </div>

            {/* Current vs Target Info */}
            <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
              <div className="font-medium text-foreground">Preview Changes:</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Current: </span>
                  <span className="text-foreground">
                    {uploadedFile.format}, {(uploadedFile.size / 1024).toFixed(2)} KB
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Target: </span>
                  <span className="text-foreground">
                    {targetFormat}, ~{((uploadedFile.size / 1024) * (quality[0] / 100)).toFixed(2)} KB
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleConvert}>
                Convert Document
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-12">
            <Loader text="Converting your document..." />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConversionDialog;
