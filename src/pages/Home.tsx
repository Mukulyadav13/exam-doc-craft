import { Link } from "react-router-dom";
import { Search, FileImage, FileText, Scissors, Minimize2, Download, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolCard from "@/components/ToolCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { popularExams } from "@/data/exams";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Home = () => {
  const popularTools = [
    {
      title: "Image to PDF",
      description: "Convert your images to PDF format instantly",
      icon: FileImage,
      link: "/tools/image-to-pdf"
    },
    {
      title: "Compress Image",
      description: "Reduce image file size without quality loss",
      icon: Minimize2,
      link: "/tools/compress-image"
    },
    {
      title: "Resize Image",
      description: "Adjust image dimensions to meet requirements",
      icon: Scissors,
      link: "/tools/resize-image"
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDFs into a single file",
      icon: FileText,
      link: "/tools/merge-pdf"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Prepare Your Exam Documents with Ease
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Get document requirements, resize images, convert formats, and prepare complete exam document sets - all in one place
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl mx-auto mt-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for exams (e.g., UPSC, JEE, NEET)..."
                    className="pl-12 h-14 text-lg"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Button size="lg" asChild>
                  <Link to="/bulk">
                    <FolderOpen className="mr-2 h-5 w-5" />
                    Prepare My Documents
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/exams">Browse Exams</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Exams */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Exams
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select your exam to view document requirements and start preparing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {popularExams.map((exam) => (
              <Link key={exam.id} to={`/exams/${exam.id}`}>
                <Card className="hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{exam.name}</CardTitle>
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {exam.category}
                      </span>
                    </div>
                    <CardDescription className="line-clamp-2">{exam.fullName}</CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      {exam.documents.length} documents required
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/exams">View All Exams</Link>
            </Button>
          </div>
        </section>

        {/* Popular Tools */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Document Processing Tools
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional tools to prepare your documents for exam applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {popularTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/tools">View All Tools</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6 text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Prepare Your Documents?
              </h2>
              <p className="text-lg opacity-90">
                Upload multiple documents and process them all at once with our bulk processing tool
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/bulk">
                  <Download className="mr-2 h-5 w-5" />
                  Start Bulk Processing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
