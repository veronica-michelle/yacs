import React, { useState, useEffect } from "react";

// ---------------------- Types ----------------------
/**
 * Main user profile structure containing all student information
 */
type UserProfile = {
  fullName: string;           // Student's full name
  studentId: string;          // RPI student ID number
  expectedGraduation: string; // Graduation semester and year
  major: string;              // Primary major
  track?: string;             // Concentration/track within major (optional)
  minor?: string;             // Minor program (optional)
  gpa: number;               // Current GPA
  email: string;             // RPI email address
  profilePicture?: string;   // Profile picture URL (optional)
};

type AcademicProfile = {
  major: string;
  secondMajor?: string;
  track?: string;
  secondMajorTrack?: string;
  minor?: string;
  secondMinor?: string;
  minorTrack?: string;
  secondMinorTrack?: string;
  hassPathway: string;
};

// ---------------------- Components ----------------------
/**
 * Profile header component - shows profile picture, name, and basic info
 */
const ProfileHeader: React.FC<{ profile: UserProfile; onEditProfile: () => void }> = ({ profile, onEditProfile }) => (
  <div className="bg-surface border border-border rounded-lg shadow-sm">
    <div className="p-6">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted border-2 border-border overflow-hidden">
            {profile.profilePicture ? (
              <img 
                src={profile.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-foreground/70">
                {profile.fullName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{profile.fullName}</h1>
              <div className="mt-3 space-y-1">
                <p className="text-sm text-foreground/70">Student ID: {profile.studentId}</p>
                <p className="text-sm text-foreground/70">Email: {profile.email}</p>
                <p className="text-sm text-foreground/70">Expected Graduation: {profile.expectedGraduation}</p>
              </div>
            </div>
            <button
              onClick={onEditProfile}
              className="px-4 py-2 text-sm font-medium text-foreground bg-surface border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-surface border border-border rounded-lg shadow-sm">
    <div className="px-6 py-4 border-b border-border">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

// ---------------------- Main Page ----------------------
const PROFILE_STORAGE_KEY = "user_profile_v1";

export default function ProfilePage() {
  
  // Mock academic profile data
  const [academicProfile] = useState<AcademicProfile>({
    major: "Computer Science",
    secondMajor: "Mathematics", // Can be undefined
    track: "AI/Machine Learning",
    secondMajorTrack: "Applied Mathematics",
    minor: "Business Administration",
    secondMinor: undefined, // Can be undefined to show "Add" state
    minorTrack: "Entrepreneurship",
    secondMinorTrack: undefined,
    hassPathway: "Arts"
  });
  
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      fullName: "Alex Johnson",
      studentId: "662012345",
      expectedGraduation: "May 2027",
      major: academicProfile.major,
      track: academicProfile.track,
      minor: academicProfile.minor,
      gpa: 3.75,
      email: "johna@rpi.edu",
    };
  });

  // Mock GPA data
  const gpaData = {
    gpa: 3.75,
    totalEarnedHours: 95
  };

  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handleEditProfile = () => {
    alert("Feature not added yet");
  };

  const handleMajorClick = () => {
    alert("Feature not added yet");
  };

  const handleMinorClick = () => {
    alert("Feature not added yet");
  };

  const handleNavigateToProgress = (type: string, program?: string) => {
    alert("Feature not added yet");
  };

  const handleEdit = (field: string) => {
    alert("Feature not added yet");
  };

  const handleSelectTrack = (programName: string, trackType: string) => {
    alert("Feature not added yet");
  };

