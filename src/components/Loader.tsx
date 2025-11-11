import { Loader2 } from "lucide-react";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const Loader = ({ text = "Processing...", size = "md" }: LoaderProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
      <p className="text-muted-foreground font-medium">{text}</p>
    </div>
  );
};

export default Loader;
