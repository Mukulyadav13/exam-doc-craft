import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { exams } from "@/data/exams";
import DocumentUploadCard from "@/components/DocumentUploadCard";
import { useState } from "react";

const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const exam = exams.find((e) => e.id === id);
  const [uploadedCount, setUploadedCount] = useState(0);

  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Exam Not Found</h1>
            <Button asChild variant="outline">
              <Link to="/exams">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Exams
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button variant="ghost" asChild className="mb-6">
                <Link to="/exams">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Exams
                </Link>
              </Button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    {exam.name}
                  </h1>
                  <span className="text-sm px-4 py-2 bg-primary/10 text-primary rounded-full">
                    {exam.category}
                  </span>
                </div>
                <p className="text-xl text-muted-foreground">{exam.fullName}</p>
                {exam.officialSource && (
                  <a 
                    href={exam.officialSource} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Official Source: {exam.officialSource}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Document Requirements & Upload
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload your documents below. We'll validate them and help you fix any issues.
                </p>
              </div>
              {uploadedCount > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">
                    {uploadedCount} of {exam.documents.length} uploaded
                  </span>
                </div>
              )}
            </div>

            <div className="grid gap-6">
              {exam.documents.map((doc, index) => (
                <DocumentUploadCard 
                  key={index} 
                  document={doc} 
                  examId={exam.id}
                />
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExamDetails;
