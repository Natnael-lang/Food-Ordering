import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isOwner, setIsOwner] = useState(false);

    return (
        <AuthContext.Provider value={{ isOwner, setIsOwner }}>
            {children}
        </AuthContext.Provider>
    );
};