import React from 'react';
import { Toaster } from 'react-hot-toast';
import AuthCheck from './components/AuthCheck';
import CharacterCreationWizard from './components/CharacterCreationWizard';

function App() {
  return (
    <AuthCheck>
      <CharacterCreationWizard />
      <Toaster />
    </AuthCheck>
  );
}

export default App;