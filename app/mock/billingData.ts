export const mockInsuranceData = [
  {
    patientId: "PT1001",
    insuranceProvider: "Blue Cross",
    policyNumber: "BC123456789",
    status: "active",
    coverageDetails: {
      type: "PPO",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      copay: 25,
      deductible: 1500
    }
  },
  {
    patientId: "PT1002",
    insuranceProvider: "Aetna",
    policyNumber: "AE987654321",
    status: "pending",
    coverageDetails: {
      type: "HMO",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      copay: 30,
      deductible: 2000
    }
  }
];

export const mockPaymentHistory = [
  {
    id: "PAY001",
    patientId: "PT1001",
    date: "2023-09-15",
    amount: 150.00,
    type: "payment",
    status: "completed",
    description: "Office visit copay"
  },
  {
    id: "PAY002",
    patientId: "PT1001",
    date: "2023-09-01",
    amount: 75.50,
    type: "adjustment",
    status: "completed",
    description: "Insurance adjustment"
  }
];

export const mockBillingCodes = [
  {
    code: "99213",
    description: "Office visit, established patient, 15 minutes",
    fee: 125.00,
    category: "Evaluation & Management",
    effective: "2023-01-01"
  },
  {
    code: "99396",
    description: "Annual physical, established patient",
    fee: 185.00,
    category: "Preventive Care",
    effective: "2023-01-01"
  },
  {
    code: "99214",
    description: "Office visit, established patient, 25 minutes",
    fee: 165.00,
    category: "Evaluation & Management",
    effective: "2023-01-01"
  },
  {
    code: "90791",
    description: "Psychiatric diagnostic evaluation",
    fee: 250.00,
    category: "Mental Health",
    effective: "2023-01-01"
  },
  {
    code: "99243",
    description: "Office consultation, 40 minutes",
    fee: 200.00,
    category: "Consultation",
    effective: "2023-01-01"
  },
  {
    code: "97110",
    description: "Therapeutic exercises, 15 minutes",
    fee: 75.00,
    category: "Physical Therapy",
    effective: "2023-01-01"
  }
];

export const mockReportData = {
  revenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [12500, 13200, 14100, 13800, 15200, 14900],
    totalRevenue: 83700,
    averageMonthly: 13950
  },
  paymentTypes: {
    labels: ["Insurance", "Patient", "Copay", "Other"],
    data: [65, 20, 10, 5],
    total: 100
  },
  claimStatus: {
    submitted: 150,
    pending: 45,
    denied: 12,
    approved: 93,
    totalClaims: 300,
    approvalRate: "78%"
  },
  topProcedures: [
    { code: "99213", count: 145, revenue: 18125 },
    { code: "99214", count: 98, revenue: 16170 },
    { code: "99396", count: 56, revenue: 10360 }
  ],
  insuranceBreakdown: [
    { provider: "Blue Cross", claims: 85, paid: 45000 },
    { provider: "Aetna", claims: 65, paid: 32500 },
    { provider: "UnitedHealth", claims: 45, paid: 22500 }
  ],
  monthlyTrends: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    claims: [45, 52, 48, 51, 54, 50],
    denials: [3, 4, 2, 5, 3, 4],
    avgProcessingDays: [12, 14, 11, 13, 12, 15]
  }
};

export const mockReportTemplates = [
  {
    id: "RPT001",
    name: "Monthly Revenue Summary",
    type: "financial",
    frequency: "monthly",
    metrics: ["total_revenue", "claim_count", "denial_rate"]
  },
  {
    id: "RPT002",
    name: "Insurance Claims Analysis",
    type: "claims",
    frequency: "weekly",
    metrics: ["pending_claims", "processing_time", "approval_rate"]
  },
  {
    id: "RPT003",
    name: "Procedure Code Usage",
    type: "utilization",
    frequency: "monthly",
    metrics: ["top_codes", "revenue_by_code", "trends"]
  }
];