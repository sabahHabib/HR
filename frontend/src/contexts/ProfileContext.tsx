import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { api } from '../api/apiClient';


interface Profile {
  cnic: string;
  phone_no: string;
  address: string;
  blood_group: string;
  gender: string;
  department: string;
  user_id: string;
  image_url:File | null;

}

interface ProfileContextType {
  profile: Profile | null;
  profileExists: boolean;
  fetchProfile: () => void;
  createProfile: (profileData: FormData) => void;
  updateProfile: (profileData: FormData) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: ReactNode;
}

function ProfileProvider({ children }: ProfileProviderProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileExists, setProfileExists] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await api.get('/profile');
      console.log('Profile fetched:', response.data);
      setProfile(response.data);
      setProfileExists(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfileExists(false);
    }
  }, []);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [fetchProfile, token]);

  const createProfile = async (profileData: FormData) => {
    try {
      const response = await api.post('/profile', profileData);
      console.log('Profile created:', response.data);
      setProfile(response.data);
      setProfileExists(true);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const updateProfile = async (profileData: FormData) => {
    try {
        for (let [key, value] of profileData.entries()) {
  console.log(key, value);
}
      const response = await api.put('/profile', profileData);
      console.log('Profile updated:', response.data);
      setProfile(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, profileExists, fetchProfile, createProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export { ProfileProvider, useProfile };