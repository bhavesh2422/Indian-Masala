export type AppScreen =
  | 'welcome'
  | 'verify-phone'
  | 'profile-setup'
  | 'upload-docs'
  | 'review-success'
  | 'trace-ledger';

export interface UploadedDoc {
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
}

export interface UserProfile {
  phoneNumber: string;
  fullName: string;
  farmName: string;
  city: string;
  state: string;
  spices: string[];
  farmPhotoUrl?: string;
  farmPhotoName?: string;
  fssaiDoc?: UploadedDoc | null;
  organicDoc?: UploadedDoc | null;
  spicesBoardDoc?: UploadedDoc | null;
  producerId: string;
  isVerified: boolean;
  traceabilityScore: number;
}

export interface SpiceBatch {
  id: string;
  batchNumber: string;
  spiceName: string;
  spiceVariant: string;
  origin: string;
  harvestDate: string;
  keyMetric: string; // e.g. "5.4% Curcumin", "95,000 SHU Heat", "1.8% Essential Oil"
  moistureContent: string;
  traceabilityScore: number;
  lotWeightKg: number;
  packagingDate: string;
  labStatus: 'Passed' | 'Certified Premium' | 'Verified Organic';
  fssaiLicenseNo: string;
  organicCertNo: string;
  gpsCoordinates: string;
  farmerStory: string;
  testingLab: string;
  pesticideFree: boolean;
}
