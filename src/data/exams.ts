export interface Exam {
  id: string;
  name: string;
  fullName: string;
  category: string;
  documents: DocumentRequirement[];
}

export interface DocumentRequirement {
  name: string;
  format: string[];
  maxSize: string;
  dimensions?: string;
  notes?: string;
}

export const exams: Exam[] = [
  {
    id: "upsc-cse",
    name: "UPSC CSE",
    fullName: "Union Public Service Commission - Civil Services Examination",
    category: "Government",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "40 KB",
        dimensions: "3.5cm x 4.5cm (width x height)",
        notes: "Recent passport-size photograph with white background"
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "20 KB",
        dimensions: "4cm x 3cm (width x height)",
        notes: "Clear signature on white paper"
      },
      {
        name: "ID Proof",
        format: ["PDF"],
        maxSize: "300 KB",
        notes: "Aadhaar Card, PAN Card, or Passport"
      },
      {
        name: "Educational Certificates",
        format: ["PDF"],
        maxSize: "500 KB",
        notes: "Degree certificate and mark sheets"
      }
    ]
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    fullName: "Staff Selection Commission - Combined Graduate Level",
    category: "Government",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "20 KB - 50 KB",
        dimensions: "4cm x 3cm",
        notes: "Recent photograph with light background"
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "10 KB - 20 KB",
        dimensions: "4cm x 2cm",
        notes: "Signature in black ink on white paper"
      },
      {
        name: "Age Proof",
        format: ["PDF"],
        maxSize: "300 KB",
        notes: "Birth certificate or 10th mark sheet"
      }
    ]
  },
  {
    id: "jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination - Main",
    category: "Engineering",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "10 KB - 200 KB",
        dimensions: "Passport size",
        notes: "Recent photograph with light background"
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "4 KB - 30 KB",
        dimensions: "3.5cm x 1.5cm",
        notes: "Clear signature on white paper"
      },
      {
        name: "Category Certificate",
        format: ["PDF"],
        maxSize: "500 KB",
        notes: "If applicable (SC/ST/OBC)"
      }
    ]
  },
  {
    id: "neet-ug",
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test - Undergraduate",
    category: "Medical",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "10 KB - 200 KB",
        dimensions: "Passport size",
        notes: "Recent photograph with light background, without cap/goggles"
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "4 KB - 30 KB",
        dimensions: "3.5cm x 1.5cm",
        notes: "In black/blue ink on white paper"
      },
      {
        name: "ID Proof",
        format: ["PDF"],
        maxSize: "300 KB",
        notes: "Aadhaar Card mandatory"
      }
    ]
  },
  {
    id: "gate",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    category: "Engineering",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "50 KB - 100 KB",
        dimensions: "Passport size",
        notes: "Recent photograph with light background"
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "20 KB - 50 KB",
        dimensions: "Standard size",
        notes: "Clear signature on white paper"
      },
      {
        name: "Degree Certificate",
        format: ["PDF"],
        maxSize: "500 KB",
        notes: "Final year students can upload provisional certificate"
      }
    ]
  },
  {
    id: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    category: "Management",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "100 KB",
        dimensions: "Passport size",
        notes: "Recent photograph with white background"
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "50 KB",
        dimensions: "Standard size",
        notes: "Signature on white paper"
      }
    ]
  },
  {
    id: "ibps-po",
    name: "IBPS PO",
    fullName: "Institute of Banking Personnel Selection - Probationary Officer",
    category: "Banking",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "50 KB",
        dimensions: "4.5cm x 3.5cm",
        notes: "Recent photograph with light background"
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "20 KB",
        dimensions: "3cm x 1cm",
        notes: "Clear signature"
      },
      {
        name: "Left Thumb Impression",
        format: ["JPG", "JPEG"],
        maxSize: "20 KB",
        dimensions: "2.5cm x 2.5cm",
        notes: "Clear thumb impression on white paper"
      }
    ]
  },
  {
    id: "railway-ntpc",
    name: "Railway NTPC",
    fullName: "Railway Recruitment Board - Non-Technical Popular Categories",
    category: "Government",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "100 KB",
        dimensions: "Passport size",
        notes: "Recent photograph with light background"
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "50 KB",
        dimensions: "Standard size",
        notes: "Signature on white paper"
      }
    ]
  }
];

export const popularExams = exams.slice(0, 6);
