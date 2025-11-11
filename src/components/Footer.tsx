import { Link } from "react-router-dom";
import { FileText, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <FileText className="h-6 w-6" />
              <span>ExamDoc</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop solution for all exam document processing needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/exams" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Exams
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/bulk" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Bulk Process
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tools/image-to-pdf" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Image to PDF
                </Link>
              </li>
              <li>
                <Link to="/tools/compress-image" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Compress Image
                </Link>
              </li>
              <li>
                <Link to="/tools/resize-image" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resize Image
                </Link>
              </li>
              <li>
                <Link to="/tools/merge-pdf" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Merge PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ExamDoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
