import React from 'react';
import { Chat } from '@/chat';
import { Login } from '@/login';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { Toaster } from 'sonner';

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
    return <Login />;
  }

  return (
    <main className={'max-w-md mx-auto border-x min-h-svh'}>
      <Chat />
      <Toaster />
    </main>
  );
};
