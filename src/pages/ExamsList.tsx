import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { exams } from "@/data/exams";
import { useState } from "react";

const ExamsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = exams.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(exams.map((exam) => exam.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-br from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                All Exams
              </h1>
              <p className="text-lg text-muted-foreground">
                Find document requirements for your exam
              </p>

              <div className="max-w-xl mx-auto mt-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search exams..."
                    className="pl-12 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          {categories.map((category) => {
            const categoryExams = filteredExams.filter(
              (exam) => exam.category === category
            );

            if (categoryExams.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryExams.map((exam) => (
                    <Link key={exam.id} to={`/exams/${exam.id}`}>
                      <Card className="hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-xl">{exam.name}</CardTitle>
                            <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                              {exam.category}
                            </span>
                          </div>
                          <CardDescription className="line-clamp-2">
                            {exam.fullName}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground mt-2">
                            {exam.documents.length} documents required
                          </p>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredExams.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No exams found matching your search.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExamsList;
