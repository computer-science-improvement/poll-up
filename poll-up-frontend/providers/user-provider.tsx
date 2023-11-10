'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface UserContextProps {
  id: string | null;
  setId: (id: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<UserContextProps['id']>(null);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
