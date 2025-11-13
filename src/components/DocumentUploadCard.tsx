import { useState } from "react";
import { FileText, Upload, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentRequirement } from "@/data/exams";
import FilePreview from "./FilePreview";
import ConversionDialog from "./ConversionDialog";

interface DocumentUploadCardProps {
  document: DocumentRequirement;
  examId: string;
}

interface UploadedFile {
  file: File;
  preview: string;
  format: string;
  size: number;
  dimensions?: { width: number; height: number };
  isCompliant: boolean;
  issues: string[];
}

const DocumentUploadCard = ({ document, examId }: DocumentUploadCardProps) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [showConversion, setShowConversion] = useState(false);

  const validateFile = async (file: File): Promise<UploadedFile> => {
    const preview = URL.createObjectURL(file);
    const format = file.type.split("/")[1].toUpperCase();
    const size = file.size;
    const issues: string[] = [];

    // Check format
    if (!document.format.includes(format) && !document.format.includes(format.replace("JPEG", "JPG"))) {
      issues.push(`Format should be ${document.format.join(" or ")}`);
    }

    // Check size
    const maxSizeKB = parseInt(document.maxSize.match(/\d+/)?.[0] || "0");
    const fileSizeKB = size / 1024;
    if (fileSizeKB > maxSizeKB) {
      issues.push(`Size exceeds ${document.maxSize}`);
    }

    // Get dimensions for images
    let dimensions: { width: number; height: number } | undefined;
    if (file.type.startsWith("image/")) {
      dimensions = await getImageDimensions(file);
      
      if (document.dimensions && dimensions) {
        const requiredDims = document.dimensions.match(/(\d+\.?\d*)\s*cm\s*x\s*(\d+\.?\d*)\s*cm/i);
        if (requiredDims) {
          // Convert cm to pixels (rough estimate: 1cm ≈ 37.8 pixels at 96 DPI)
          const reqWidth = parseFloat(requiredDims[1]) * 37.8;
          const reqHeight = parseFloat(requiredDims[2]) * 37.8;
          const tolerance = 50; // pixels
          
          if (Math.abs(dimensions.width - reqWidth) > tolerance || 
              Math.abs(dimensions.height - reqHeight) > tolerance) {
            issues.push(`Dimensions should be approximately ${document.dimensions}`);
          }
        }
      }
    }

    return {
      file,
      preview,
      format,
      size,
      dimensions,
      isCompliant: issues.length === 0,
      issues,
    };
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validated = await validateFile(file);
    setUploadedFile(validated);
  };

  const handleConvert = () => {
    setShowConversion(true);
  };

  const handleConversionComplete = (newFile: File) => {
    validateFile(newFile).then(setUploadedFile);
    setShowConversion(false);
  };

  const getStatusIcon = () => {
    if (!uploadedFile) return null;
    if (uploadedFile.isCompliant) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (uploadedFile.issues.length > 2) {
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
    return <AlertTriangle className="h-5 w-5 text-orange-500" />;
  };

  const getStatusColor = () => {
    if (!uploadedFile) return "border-border";
    if (uploadedFile.isCompliant) return "border-green-500 bg-green-50 dark:bg-green-950";
    if (uploadedFile.issues.length > 2) return "border-destructive bg-destructive/5";
    return "border-orange-500 bg-orange-50 dark:bg-orange-950";
  };

  return (
    <>
      <Card className={`transition-colors ${getStatusColor()}`}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-primary/10 rounded-lg mt-1">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl">{document.name}</CardTitle>
                  {getStatusIcon()}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="grid md:grid-cols-2 gap-2">
                    <div>
                      <span className="text-muted-foreground">Format: </span>
                      <span className="font-medium text-foreground">{document.format.join(", ")}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max Size: </span>
                      <span className="font-medium text-foreground">{document.maxSize}</span>
                    </div>
                    {document.dimensions && (
                      <div className="md:col-span-2">
                        <span className="text-muted-foreground">Dimensions: </span>
                        <span className="font-medium text-foreground">{document.dimensions}</span>
                      </div>
                    )}
                  </div>
                  {document.notes && (
                    <div className="pt-2 border-t border-border">
                      <span className="text-muted-foreground text-xs">{document.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-w-[140px]">
              <label htmlFor={`upload-${document.name}`}>
                <div className="cursor-pointer">
                  <Button type="button" size="sm" className="w-full" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadedFile ? "Replace" : "Upload"}
                    </span>
                  </Button>
                </div>
                <input
                  id={`upload-${document.name}`}
                  type="file"
                  accept={document.format.map(f => `.${f.toLowerCase()}`).join(",")}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </CardHeader>

        {uploadedFile && (
          <CardContent className="border-t border-border">
            <FilePreview 
              uploadedFile={uploadedFile} 
              onConvert={handleConvert}
            />
          </CardContent>
        )}
      </Card>

      {uploadedFile && (
        <ConversionDialog
          open={showConversion}
          onOpenChange={setShowConversion}
          document={document}
          uploadedFile={uploadedFile}
          onConversionComplete={handleConversionComplete}
        />
      )}
    </>
  );
};

export default DocumentUploadCard;
