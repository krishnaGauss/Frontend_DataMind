import React from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './components/auth/LoginPage';
import { ChatApp } from './components/chat/ChatApp';

const App = () => {
  const { isLoggedIn, token, login, logout } = useAuth();

  return (
    <div className="font-sans antialiased">
      {isLoggedIn ? (
        <ChatApp token={token} onLogout={logout} />
      ) : (
        <LoginPage onLogin={login} />
      )}
    </div>
  );
};

export default App;