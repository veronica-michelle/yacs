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
  
  // Mock academic data (self-contained; no external hooks)
  const majors = [
    { name: "Computer Science", tracks: ["AI/Machine Learning"] },
    { name: "Mathematics", tracks: ["Applied Mathematics"] },
  ];
  const minors = [
    { name: "Business Administration", tracks: ["Entrepreneurship"] },
  ];
  const pathways = [
    { name: "Arts" },
  ];

  // Mock academic profile state
  const [academicProfile, setAcademicProfile] = useState<AcademicProfile>({
    major: "Computer Science",
    secondMajor: "Mathematics",
    track: "AI/Machine Learning",
    secondMajorTrack: "Applied Mathematics",
    minor: "Business Administration",
    secondMinor: undefined,
    minorTrack: "Entrepreneurship",
    secondMinorTrack: undefined,
    hassPathway: "Arts",
  });

  // Mock GPA data
  const gpaData = {
    gpa: 3.75,
    totalEarnedHours: 95,
  };

  // Modal states for editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<string>("");
  const [tempValue, setTempValue] = useState<string>("");
  const [showPrimaryDropdown, setShowPrimaryDropdown] = useState(false);
  const [showSecondaryDropdown, setShowSecondaryDropdown] = useState(false);
  const [primarySearchResults, setPrimarySearchResults] = useState<string[]>([]);
  const [secondarySearchResults, setSecondarySearchResults] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Use service data instead of hardcoded arrays
  const getMajorNames = () => majors.map(m => m.name);
  const getMinorNames = () => minors.map(m => m.name);
  const getPathwayNames = () => pathways.map(p => p.name);
  
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
      gpa: gpaData?.gpa || 0.0,
      email: "johna@rpi.edu",
    };
  });

  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.relative')) {
        setShowPrimaryDropdown(false);
        setShowSecondaryDropdown(false);
      }
    };

    if (showPrimaryDropdown || showSecondaryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showPrimaryDropdown, showSecondaryDropdown]);

  const handleEditProfile = () => {
    alert("Feature not added yet");
  };

  const handleMajorClick = () => {
    alert("Major progress tracking functionality coming soon!");
  };

  const handleMinorClick = () => {
    alert("Minor progress tracking functionality coming soon!");
  };

  const handleNavigateToProgress = (type: string, program?: string) => {
    if (type === 'major') {
      alert(`Major progress for ${program} - Feature coming soon!`);
    } else if (type === 'minor') {
      alert("Minor progress tracking - Feature coming soon!");
    } else if (type === 'pathway') {
      alert("Pathway progress tracking - Feature coming soon!");
    }
  };

  const handleEdit = (field: string) => {
    alert("Feature not added yet");
  };

  const handlePrimarySearchInput = (value: string) => {
    if (editingField === "major") {
      // Update the actual profile major value
      setProfile((prev: UserProfile) => ({ ...prev, major: value }));
      const filtered = getMajorNames().filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      );
      setPrimarySearchResults(filtered);
    } else if (editingField === "minor") {
      // Update the actual profile minor value
      setProfile((prev: UserProfile) => ({ ...prev, minor: value }));
      const filtered = getMinorNames().filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      );
      setPrimarySearchResults(filtered);
    } else if (editingField === "hassPathway") {
      setTempValue(value);
      const filtered = getPathwayNames().filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      );
      setPrimarySearchResults(filtered);
    }
    setShowPrimaryDropdown(true);
  };

  const handleSecondarySearchInput = (value: string) => {
    setTempValue(value);
    let options: string[] = [];
    
    if (editingField === "major" || editingField === "secondMajor") {
      options = getMajorNames().filter(name => name !== academicProfile.major); // Exclude primary major
    } else if (editingField === "minor" || editingField === "secondMinor") {
      options = getMinorNames().filter(name => name !== profile.minor); // Exclude primary minor
    }
    
    const filtered = options.filter(name => 
      name.toLowerCase().includes(value.toLowerCase())
    );
    setSecondarySearchResults(filtered);
    setShowSecondaryDropdown(true);
  };

  const selectPrimaryOption = (option: string) => {
    if (editingField === "major") {
      setProfile((prev: UserProfile) => ({ ...prev, major: option }));
    } else if (editingField === "minor") {
      setProfile((prev: UserProfile) => ({ ...prev, minor: option }));
    } else if (editingField === "hassPathway") {
      setTempValue(option);
    }
    setShowPrimaryDropdown(false);
  };

  const selectSecondaryOption = (option: string) => {
    setTempValue(option);
    setShowSecondaryDropdown(false);
  };

  const saveEdit = () => {
    // Validation
    if (editingField === "gpa") {
      const gpaValue = parseFloat(tempValue);
      if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
        setErrorMessage("GPA must be a number between 0.0 and 4.0");
        return;
      }
      setProfile((prev: UserProfile) => ({ ...prev, gpa: gpaValue }));
    } else if (editingField === "secondMajor") {
      if (tempValue && tempValue === profile.major) {
        setErrorMessage("Second major cannot be the same as your primary major.");
        return;
      }
      setAcademicProfile((prev: AcademicProfile) => ({ ...prev, secondMajor: tempValue || undefined }));
    } else if (editingField === "secondMinor") {
      if (tempValue && tempValue === profile.minor) {
        setErrorMessage("Second minor cannot be the same as your primary minor.");
        return;
      }
      setAcademicProfile((prev: AcademicProfile) => ({ ...prev, secondMinor: tempValue || undefined }));
    } else if (editingField === "hassPathway") {
      if (!tempValue.trim()) {
        setErrorMessage("Please select a HASS pathway.");
        return;
      }
      setAcademicProfile((prev: AcademicProfile) => ({ ...prev, hassPathway: tempValue }));
    } else if (editingField === "major") {
      setAcademicProfile((prev: AcademicProfile) => ({ ...prev, major: profile.major }));
    } else if (editingField === "minor") {
      setAcademicProfile((prev: AcademicProfile) => ({ ...prev, minor: profile.minor || undefined }));
    }

    // Close modal
    setShowEditModal(false);
    setShowPrimaryDropdown(false);
    setShowSecondaryDropdown(false);
    setErrorMessage("");
  };

  const handleSelectTrack = (programName: string, trackType: string) => {
    alert(`Track selection for ${programName} (${trackType}) - Feature coming soon!`);
  };

  // Function to check if program has tracks using real data
  const getTracksForProgram = (programName: string, isMinor: boolean = false): any[] => {
    if (isMinor) {
      const minor = minors.find(m => m.name === programName);
      return minor?.tracks || [];
    } else {
      const major = majors.find(m => m.name === programName);
      return major?.tracks || [];
    }
  };

