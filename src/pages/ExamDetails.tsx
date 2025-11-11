import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { exams } from "@/data/exams";

const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const exam = exams.find((e) => e.id === id);

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
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    {exam.name}
                  </h1>
                  <span className="text-sm px-4 py-2 bg-primary/10 text-primary rounded-full">
                    {exam.category}
                  </span>
                </div>
                <p className="text-xl text-muted-foreground">{exam.fullName}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                Document Requirements
              </h2>
              <Button asChild>
                <Link to="/bulk">
                  <Download className="mr-2 h-4 w-4" />
                  Start Bulk Processing
                </Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {exam.documents.map((doc, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-grow">
                        <CardTitle className="text-xl mb-2">{doc.name}</CardTitle>
                        <CardContent className="p-0 space-y-3">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                Accepted Formats
                              </p>
                              <p className="text-foreground font-medium">
                                {doc.format.join(", ")}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                Maximum Size
                              </p>
                              <p className="text-foreground font-medium">{doc.maxSize}</p>
                            </div>
                            {doc.dimensions && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Dimensions
                                </p>
                                <p className="text-foreground font-medium">
                                  {doc.dimensions}
                                </p>
                              </div>
                            )}
                          </div>
                          {doc.notes && (
                            <div className="pt-3 border-t border-border">
                              <p className="text-sm font-medium text-muted-foreground mb-1">
                                Additional Notes
                              </p>
                              <p className="text-foreground">{doc.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Ready to Prepare Your Documents?</CardTitle>
                <CardContent className="p-0 pt-4">
                  <p className="text-center text-muted-foreground mb-6">
                    Use our bulk processing tool to handle all your documents at once
                  </p>
                  <div className="flex justify-center">
                    <Button size="lg" asChild>
                      <Link to="/bulk">
                        <Download className="mr-2 h-5 w-5" />
                        Start Bulk Processing
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExamDetails;
