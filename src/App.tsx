/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ScreenType, UserProfile } from './types';
import { HomeScreen } from './components/HomeScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { PracticeScreen } from './components/PracticeScreen';
import { PlannerScreen } from './components/PlannerScreen';
import { PlannerDetailScreen } from './components/PlannerDetailScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ChatbotScreen } from './components/ChatbotScreen';
import { Navigation } from './components/Navigation';
import { UploadModal } from './components/UploadModal';
import { SettingsModal } from './components/SettingsModal';

const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Đặng Bùi Mai Phương',
  email: 'dangbuimaiphuong@gmail.com',
  studentId: 'MED-2024-889',
  cohort: '2024 - 2030 (K120)',
  academicTrack: 'Y1 - Bác sĩ Đa khoa',
  avatar: '',
  dailyGoalMinutes: 60,
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('medstudy_user_profile');
      if (saved) {
        return { ...DEFAULT_USER_PROFILE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error(e);
    }
    const legacyName = localStorage.getItem('medstudy_user_name');
    const legacyAvatar = localStorage.getItem('medstudy_user_avatar');
    return {
      ...DEFAULT_USER_PROFILE,
      name: legacyName || DEFAULT_USER_PROFILE.name,
      avatar: legacyAvatar || DEFAULT_USER_PROFILE.avatar,
    };
  });

  const [documentTitle, setDocumentTitle] = useState<string>('Sinh học tế bào: Quang hợp ở thực vật');
  const [sourceFileName, setSourceFileName] = useState<string>('Giao_trinh_SinhHoc_Ch4.pdf (48 trang)');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('medstudy_user_profile', JSON.stringify(next));
        if (next.name) localStorage.setItem('medstudy_user_name', next.name);
        if (next.avatar) {
          localStorage.setItem('medstudy_user_avatar', next.avatar);
        } else {
          localStorage.removeItem('medstudy_user_avatar');
        }
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleTriggerUpload = (file?: File) => {
    if (file) {
      setUploadedFile(file);
    } else {
      setUploadedFile(null);
    }
    setIsUploadModalOpen(true);
  };

  const handleProcessedDocument = (newTitle: string, newFileName: string) => {
    setDocumentTitle(newTitle);
    setSourceFileName(newFileName);
    setCurrentScreen('summary');
  };

  // Scroll to top of content container when changing screens
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeff7] flex justify-center items-center sm:py-3 text-[#0f172a] antialiased selection:bg-[#00288e]/10">
      {/* Mobile App Container */}
      <main
        className="w-full max-w-[430px] h-[100dvh] sm:h-[min(900px,94vh)] bg-gradient-to-b from-[#f5f9ff] via-[#f8fbff] to-[#eef4fa] sm:rounded-[38px] shadow-2xl overflow-hidden flex flex-col relative sm:border sm:border-slate-300/80"
        data-purpose="app-viewport"
      >
        {/* Scrollable Screen Content Container - Bottom Navigation is stacked beneath this flex-1 container and NEVER obscures content */}
        <div
          ref={contentScrollRef}
          className="flex-1 w-full overflow-y-auto overscroll-contain flex flex-col"
        >
          {currentScreen === 'home' && (
            <HomeScreen
              userName={userProfile.name}
              userAvatar={userProfile.avatar}
              onNavigate={handleNavigate}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              onTriggerUpload={handleTriggerUpload}
            />
          )}

          {currentScreen === 'summary' && (
            <SummaryScreen
              onNavigate={handleNavigate}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              documentTitle={documentTitle}
              sourceFileName={sourceFileName}
              userAvatar={userProfile.avatar}
            />
          )}

          {currentScreen === 'chatbot' && (
            <ChatbotScreen
              userProfile={userProfile}
              documentTitle={documentTitle}
              sourceFileName={sourceFileName}
              onNavigate={handleNavigate}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
            />
          )}

          {currentScreen === 'practice' && (
            <PracticeScreen
              onNavigate={handleNavigate}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              userAvatar={userProfile.avatar}
            />
          )}

          {currentScreen === 'planner' && (
            <PlannerScreen
              onNavigate={handleNavigate}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
              userAvatar={userProfile.avatar}
            />
          )}

          {currentScreen === 'planner-detail' && (
            <PlannerDetailScreen
              onNavigate={handleNavigate}
              onOpenSettings={() => setIsSettingsModalOpen(true)}
            />
          )}

          {currentScreen === 'library' && (
            <LibraryScreen
              onNavigate={handleNavigate}
              onOpenDocument={handleProcessedDocument}
              onTriggerUpload={() => handleTriggerUpload()}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={handleNavigate}
            />
          )}
        </div>

        {/* Integrated Bottom Navigation - Attached flush to bottom of app, non-overlapping */}
        <Navigation
          currentScreen={currentScreen}
          userAvatar={userProfile.avatar}
          onNavigate={handleNavigate}
        />

        {/* Upload Modal */}
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onProcessed={handleProcessedDocument}
          selectedFile={uploadedFile}
        />

        {/* Settings & Profile Modal */}
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      </main>
    </div>
  );
}
