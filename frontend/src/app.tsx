import React from 'react';
import { Chat } from '@/chat';
import { Login } from '@/login';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { Toaster } from 'sonner';
import { Particles } from '@/components/ui/particles';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <>
        <Particles className={'fixed h-screen'} />
        <Login />
      </>
    );
  }

  return (
    <>
      <Particles className={'fixed h-screen'} />
      <main className={'max-w-md mx-auto border-x min-h-svh'}>
        <Chat />
        <Toaster />
      </main>
    </>
  );
};
