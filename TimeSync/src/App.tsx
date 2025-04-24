import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ParticipantForm from './components/participants/ParticipantForm';
import ParticipantList from './components/participants/ParticipantList';
import MeetingSetup from './components/scheduler/MeetingSetup';
import TimeGrid from './components/scheduler/TimeGrid';
import ShareResults from './components/sharing/ShareResults';
import { ThemeProvider } from './context/ThemeContext';
import { MeetingProvider } from './context/MeetingContext';

function App() {
  return (
    <ThemeProvider>
      <MeetingProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto">
              <MeetingSetup />
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                  <ParticipantForm />
                  {/* More controls could go here */}
                  <ShareResults />
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <ParticipantList />
                  <TimeGrid />
                </div>
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </MeetingProvider>
    </ThemeProvider>
  );
}

export default App;