export interface Exam {
  id: string;
  name: string;
  fullName: string;
  category: string;
  documents: DocumentRequirement[];
  officialSource?: string;
}

export interface DocumentRequirement {
  name: string;
  format: string[];
  maxSize: string;
  minSize?: string;
  dimensions?: string;
  dpi?: number;
  backgroundColor?: string;
  notes?: string;
}

export const exams: Exam[] = [
  {
    id: "upsc-cse",
    name: "UPSC CSE",
    fullName: "Union Public Service Commission - Civil Services Examination",
    category: "Government",
    officialSource: "https://upsconline.nic.in",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        minSize: "20 KB",
        maxSize: "200 KB",
        dimensions: "3.5cm x 4.5cm",
        dpi: 200,
        backgroundColor: "white or light colored",
        notes: "Recent passport-size photograph with 3/4th face coverage (75% of photo area). Photo must be clear and show full face."
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        minSize: "20 KB",
        maxSize: "100 KB",
        dimensions: "4cm x 3cm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Clear signature in black ink on white paper. Signature must be within the box."
      },
      {
        name: "ID Proof",
        format: ["PDF"],
        maxSize: "300 KB",
        notes: "Aadhaar Card, PAN Card, Passport, or Voter ID. Document must be clear and readable."
      }
    ]
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    fullName: "Staff Selection Commission - Combined Graduate Level",
    category: "Government",
    officialSource: "https://ssc.gov.in",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        minSize: "20 KB",
        maxSize: "50 KB",
        dimensions: "4cm x 3cm",
        dpi: 200,
        backgroundColor: "light colored",
        notes: "Recent passport-size photograph with light background. File must be between 20-50 KB."
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        minSize: "10 KB",
        maxSize: "20 KB",
        dimensions: "4cm x 2cm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Signature in black ink on white paper. File must be between 10-20 KB."
      }
    ]
  },
  {
    id: "jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination - Main",
    category: "Engineering",
    officialSource: "https://jeemain.nta.nic.in",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        minSize: "10 KB",
        maxSize: "200 KB",
        dimensions: "3.5cm x 4.5cm",
        dpi: 200,
        backgroundColor: "white or light colored",
        notes: "Recent passport-size photograph (3.5cm x 4.5cm). 80% face, colored image. File size: 10-200 KB."
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        minSize: "4 KB",
        maxSize: "30 KB",
        dimensions: "3.5cm x 1.5cm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Signature on white paper in black/blue ink. File size: 4-30 KB."
      },
      {
        name: "Category Certificate",
        format: ["PDF"],
        maxSize: "500 KB",
        notes: "If applicable (SC/ST/OBC/PwD). Document must be issued by competent authority."
      }
    ]
  },
  {
    id: "neet-ug",
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test - Undergraduate",
    category: "Medical",
    officialSource: "https://neet.nta.nic.in",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        minSize: "10 KB",
        maxSize: "200 KB",
        dimensions: "3.5cm x 4.5cm",
        dpi: 200,
        backgroundColor: "white or light colored",
        notes: "Recent passport-size photograph without cap/goggles/sunglasses. 80% face area, colored image. File size: 10-200 KB."
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        minSize: "4 KB",
        maxSize: "30 KB",
        dimensions: "3.5cm x 1.5cm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Signature in black/blue ink on white paper. File size: 4-30 KB."
      },
      {
        name: "Left Thumb Impression",
        format: ["JPG", "JPEG"],
        minSize: "10 KB",
        maxSize: "50 KB",
        dimensions: "3.5cm x 3.5cm",
        backgroundColor: "white",
        notes: "Left thumb impression on white paper. Clear and legible."
      }
    ]
  },
  {
    id: "gate",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    category: "Engineering",
    officialSource: "https://gate2025.iitr.ac.in",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        minSize: "50 KB",
        maxSize: "100 KB",
        dimensions: "3.5cm x 4.5cm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Recent passport-size photograph with white background. File size: 50-100 KB."
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        minSize: "20 KB",
        maxSize: "50 KB",
        dimensions: "4cm x 2cm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Clear signature on white paper. File size: 20-50 KB."
      }
    ]
  },
  {
    id: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    category: "Management",
    officialSource: "https://iimcat.ac.in",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        maxSize: "80 KB",
        dimensions: "248 x 300 pixels (approx 3.5cm x 4.5cm)",
        dpi: 200,
        backgroundColor: "white or light colored",
        notes: "Recent passport-size photograph. Dimensions: 248x300 pixels. File size: max 80 KB."
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        maxSize: "80 KB",
        dimensions: "80mm x 35mm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Signature on white paper. Dimensions: 80mm x 35mm. File size: max 80 KB."
      }
    ]
  },
  {
    id: "ibps-po",
    name: "IBPS PO",
    fullName: "Institute of Banking Personnel Selection - Probationary Officer",
    category: "Banking",
    officialSource: "https://ibps.in",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        minSize: "20 KB",
        maxSize: "50 KB",
        dimensions: "4.5cm x 3.5cm",
        dpi: 200,
        backgroundColor: "light colored",
        notes: "Recent photograph with light background. File size: 20-50 KB."
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        minSize: "10 KB",
        maxSize: "20 KB",
        dimensions: "3cm x 1cm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Clear signature on white paper. File size: 10-20 KB."
      },
      {
        name: "Left Thumb Impression",
        format: ["JPG", "JPEG"],
        minSize: "10 KB",
        maxSize: "20 KB",
        dimensions: "2.5cm x 2.5cm",
        backgroundColor: "white",
        notes: "Clear left thumb impression on white paper. File size: 10-20 KB."
      }
    ]
  },
  {
    id: "railway-ntpc",
    name: "Railway NTPC",
    fullName: "Railway Recruitment Board - Non-Technical Popular Categories",
    category: "Government",
    officialSource: "https://rrbapply.gov.in",
    documents: [
      {
        name: "Photograph",
        format: ["JPG", "JPEG"],
        minSize: "20 KB",
        maxSize: "100 KB",
        dimensions: "3.5cm x 3.5cm",
        dpi: 200,
        backgroundColor: "light colored",
        notes: "Recent passport-size photograph with light background. File size: 20-100 KB."
      },
      {
        name: "Signature",
        format: ["JPG", "JPEG"],
        minSize: "10 KB",
        maxSize: "50 KB",
        dimensions: "4cm x 2cm",
        dpi: 200,
        backgroundColor: "white",
        notes: "Signature on white paper in black ink. File size: 10-50 KB."
      }
    ]
  }
];

export const popularExams = exams.slice(0, 6);
