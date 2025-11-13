// Real image processing utilities for document conversion

export interface ConversionOptions {
  targetFormat: string;
  targetWidth?: number;
  targetHeight?: number;
  targetSizeKB?: number;
  quality?: number;
  dpi?: number;
}

export const convertImage = async (
  file: File,
  options: ConversionOptions
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Set dimensions
        let width = options.targetWidth || img.width;
        let height = options.targetHeight || img.height;

        // Maintain aspect ratio if only one dimension is provided
        if (options.targetWidth && !options.targetHeight) {
          height = (img.height / img.width) * width;
        } else if (options.targetHeight && !options.targetWidth) {
          width = (img.width / img.height) * height;
        }

        canvas.width = width;
        canvas.height = height;

        // Fill white background (important for JPG conversion)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to target format with compression
        let quality = options.quality || 0.85;
        const mimeType = options.targetFormat === "PNG" 
          ? "image/png" 
          : "image/jpeg";

        const attemptConversion = (q: number): Promise<Blob> => {
          return new Promise((res, rej) => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  rej(new Error("Conversion failed"));
                  return;
                }

                // Check if size matches requirement
                if (options.targetSizeKB) {
                  const sizeKB = blob.size / 1024;
                  
                  // If too large and quality can be reduced, try again
                  if (sizeKB > options.targetSizeKB && q > 0.1) {
                    const newQuality = q * (options.targetSizeKB / sizeKB) * 0.9;
                    attemptConversion(Math.max(0.1, newQuality))
                      .then(res)
                      .catch(rej);
                  } else {
                    res(blob);
                  }
                } else {
                  res(blob);
                }
              },
              mimeType,
              q
            );
          });
        };

        attemptConversion(quality).then(resolve).catch(reject);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

export const cmToPixels = (cm: number, dpi: number = 200): number => {
  // 1 inch = 2.54 cm
  // pixels = (cm / 2.54) * dpi
  return Math.round((cm / 2.54) * dpi);
};

export const parseDimensions = (dimensionStr: string, dpi: number = 200): { width: number; height: number } | null => {
  // Try to parse various dimension formats
  
  // Format: "3.5cm x 4.5cm" or "3.5 cm x 4.5 cm"
  const cmMatch = dimensionStr.match(/(\d+\.?\d*)\s*cm\s*x\s*(\d+\.?\d*)\s*cm/i);
  if (cmMatch) {
    const widthCm = parseFloat(cmMatch[1]);
    const heightCm = parseFloat(cmMatch[2]);
    return {
      width: cmToPixels(widthCm, dpi),
      height: cmToPixels(heightCm, dpi),
    };
  }

  // Format: "248 x 300 pixels" or "248x300"
  const pxMatch = dimensionStr.match(/(\d+)\s*x\s*(\d+)/i);
  if (pxMatch) {
    return {
      width: parseInt(pxMatch[1]),
      height: parseInt(pxMatch[2]),
    };
  }

  // Format: "80mm x 35mm"
  const mmMatch = dimensionStr.match(/(\d+)\s*mm\s*x\s*(\d+)\s*mm/i);
  if (mmMatch) {
    const widthMm = parseFloat(mmMatch[1]);
    const heightMm = parseFloat(mmMatch[2]);
    return {
      width: cmToPixels(widthMm / 10, dpi),
      height: cmToPixels(heightMm / 10, dpi),
    };
  }

  return null;
};

export const parseFileSize = (sizeStr: string): { min?: number; max: number } => {
  // Parse size like "20 KB", "20-200 KB", "max 80 KB"
  const rangeMatch = sizeStr.match(/(\d+)\s*(?:KB)?\s*-\s*(\d+)\s*KB/i);
  if (rangeMatch) {
    return {
      min: parseInt(rangeMatch[1]),
      max: parseInt(rangeMatch[2]),
    };
  }

  const maxMatch = sizeStr.match(/(?:max\s*)?(\d+)\s*KB/i);
  if (maxMatch) {
    return { max: parseInt(maxMatch[1]) };
  }

  return { max: 500 }; // Default
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
};

export const compressImageToTargetSize = async (
  file: File,
  targetKB: number,
  maxAttempts: number = 10
): Promise<Blob> => {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Could not get canvas context");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  let quality = 0.9;
  let attempt = 0;

  while (attempt < maxAttempts) {
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Blob creation failed"))),
        "image/jpeg",
        quality
      );
    });

    const sizeKB = blob.size / 1024;

    if (sizeKB <= targetKB) {
      return blob;
    }

    // Adjust quality for next attempt
    quality *= targetKB / sizeKB * 0.9;
    quality = Math.max(0.1, quality);
    attempt++;
  }

  // If still too large after max attempts, return last attempt
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Final compression failed"))),
      "image/jpeg",
      quality
    );
  });
};

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
