export interface WasteLog {
  id: string;
  date: string; // ISO string
  type: "Organic" | "Recyclable" | "Hazardous";
  confidence: number;
  points: number;
  imagePreview?: string; // Base64 or URL
}

export interface User {
  id: string;
  name: string;
  ward: string;
  scans: number;
  points: number;
}

export const SEED_LOGS: WasteLog[] = [
  { id: "1", date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), type: "Recyclable", confidence: 92.5, points: 10 },
  { id: "2", date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), type: "Organic", confidence: 88.1, points: 10 },
  { id: "3", date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), type: "Hazardous", confidence: 95.0, points: 25 },
  { id: "4", date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), type: "Recyclable", confidence: 78.4, points: 10 },
  { id: "5", date: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), type: "Organic", confidence: 91.2, points: 10 },
  { id: "6", date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), type: "Recyclable", confidence: 85.6, points: 10 },
  { id: "7", date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), type: "Organic", confidence: 82.3, points: 10 },
  { id: "8", date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), type: "Hazardous", confidence: 96.8, points: 25 },
];

export const SEED_USERS: User[] = [
  { id: "u1", name: "Rahul Sharma", ward: "Koramangala Ward", scans: 85, points: 850 },
  { id: "u2", name: "Priya Mehta", ward: "Banjara Hills Ward", scans: 78, points: 780 },
  { id: "u3", name: "Arjun Nair", ward: "Andheri East Ward", scans: 72, points: 720 },
  { id: "u4", name: "Deepika Rao", ward: "Powai Ward", scans: 68, points: 680 },
  { id: "u5", name: "Vikram Singh", ward: "HSR Layout Ward", scans: 65, points: 650 },
  { id: "u6", name: "Ananya Iyer", ward: "Whitefield Ward", scans: 60, points: 600 },
  { id: "u7", name: "Rohan Gupta", ward: "Jubilee Hills Ward", scans: 55, points: 550 },
  { id: "u8", name: "Sneha Patil", ward: "Malad West Ward", scans: 50, points: 500 },
  { id: "u9", name: "Karthik Reddy", ward: "Indiranagar Ward", scans: 45, points: 450 },
  { id: "u10", name: "Meera Joshi", ward: "Madhapur Ward", scans: 40, points: 400 },
  { id: "u11", name: "Aditya Kumar", ward: "Koramangala Ward", scans: 35, points: 350 },
  { id: "u12", name: "Pooja Nair", ward: "Banjara Hills Ward", scans: 30, points: 300 },
  { id: "u13", name: "Sanjay Verma", ward: "Andheri East Ward", scans: 25, points: 250 },
  { id: "u14", name: "Kavya Krishnan", ward: "Powai Ward", scans: 20, points: 200 },
  { id: "u15", name: "Ravi Tiwari", ward: "HSR Layout Ward", scans: 12, points: 120 },
];

export const WARD_DATA = [
  { name: "Koramangala", Organic: 40, Recyclable: 35, Hazardous: 15 },
  { name: "Indiranagar", Organic: 30, Recyclable: 45, Hazardous: 10 },
  { name: "Whitefield", Organic: 20, Recyclable: 68, Hazardous: 12 },
  { name: "HSR Layout", Organic: 50, Recyclable: 30, Hazardous: 5 },
  { name: "Jayanagar", Organic: 45, Recyclable: 40, Hazardous: 8 },
];

export const DAILY_TREND_DATA = Array.from({ length: 14 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  Organic: Math.floor(Math.random() * 50) + 20,
  Recyclable: Math.floor(Math.random() * 40) + 15,
  Hazardous: Math.floor(Math.random() * 10) + 2,
}));

export const PIE_DATA = [
  { name: "Organic", value: 38 },
  { name: "Recyclable", value: 47 },
  { name: "Hazardous", value: 15 },
];
