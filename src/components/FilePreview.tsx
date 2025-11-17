import { CheckCircle, AlertCircle, AlertTriangle, Download, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface UploadedFile {
  file: File;
  preview: string;
  format: string;
  size: number;
  dimensions?: { width: number; height: number };
  isCompliant: boolean;
  issues: string[];
}

interface FilePreviewProps {
  uploadedFile: UploadedFile;
  onConvert: () => void;
  documentName: string;
}

const FilePreview = ({ uploadedFile, onConvert, documentName }: FilePreviewProps) => {
  const formatSize = (bytes: number) => {
    const kb = bytes / 1024;
    return kb < 1024 ? `${kb.toFixed(2)} KB` : `${(kb / 1024).toFixed(2)} MB`;
  };

  const getStatusBadge = () => {
    if (uploadedFile.isCompliant) {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Compliant
        </Badge>
      );
    }
    if (uploadedFile.issues.length > 2) {
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Needs Fixing
        </Badge>
      );
    }
    return (
      <Badge className="bg-orange-500 hover:bg-orange-600">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Needs Adjustment
      </Badge>
    );
  };

  const handleDownload = () => {
    try {
      const url = URL.createObjectURL(uploadedFile.file);
      const a = document.createElement("a");
      a.href = url;
      
      // Create filename with format: documentname_resize.extension
      const fileExtension = uploadedFile.file.name.split('.').pop();
      const formattedName = documentName.toLowerCase().replace(/\s+/g, '_');
      a.download = `${formattedName}_resize.${fileExtension}`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${formattedName}_resize.${fileExtension}`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap md:flex-nowrap">
        {/* Thumbnail Preview */}
        <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted border border-border">
          {uploadedFile.file.type.startsWith("image/") ? (
            <img 
              src={uploadedFile.preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl text-muted-foreground">📄</span>
            </div>
          )}
        </div>

        {/* File Details */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-foreground">{uploadedFile.file.name}</span>
            {getStatusBadge()}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Format: </span>
              <span className="font-medium text-foreground">{uploadedFile.format}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Size: </span>
              <span className="font-medium text-foreground">{formatSize(uploadedFile.size)}</span>
            </div>
            {uploadedFile.dimensions && (
              <div className="col-span-2">
                <span className="text-muted-foreground">Dimensions: </span>
                <span className="font-medium text-foreground">
                  {uploadedFile.dimensions.width} x {uploadedFile.dimensions.height} px
                </span>
              </div>
            )}
          </div>

          {/* Issues */}
          {uploadedFile.issues.length > 0 && (
            <div className="space-y-1">
              {uploadedFile.issues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {!uploadedFile.isCompliant && (
              <Button size="sm" onClick={onConvert} variant="default">
                <Wrench className="h-4 w-4 mr-2" />
                Resize/Convert
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
