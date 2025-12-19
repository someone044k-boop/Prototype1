import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User roles
export type UserRole = 'listener' | 'student' | 'manager' | 'admin';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: UserRole;
    courses: string[]; // purchased course IDs
    createdAt: Date;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    updateUserRole: (userId: string, role: UserRole) => void;
    addCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Role permissions
export const rolePermissions = {
    listener: ['courses', 'notifications', 'messages'],
    student: ['courses', 'notifications', 'messages', 'myth', 'write_master'],
    manager: ['courses', 'notifications', 'messages', 'myth', 'write_master', 'orders'],
    admin: ['courses', 'notifications', 'messages', 'myth', 'write_master', 'orders', 'users', 'settings'],
};

export const hasPermission = (role: UserRole, permission: string): boolean => {
    return rolePermissions[role]?.includes(permission) || false;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                setUser({ ...parsed, createdAt: new Date(parsed.createdAt) });
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    // Save user to localStorage when changed
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email: string, password: string) => {
        // Simulate API call
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Demo: create user based on email for testing different roles
        let role: UserRole = 'listener';
        if (email.includes('admin')) role = 'admin';
        else if (email.includes('manager')) role = 'manager';
        else if (email.includes('student')) role = 'student';

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            role,
            courses: role === 'student' || role === 'manager' || role === 'admin' ? ['course1'] : [],
            createdAt: new Date(),
        };
        
        setUser(newUser);
        setIsLoading(false);
    };

    const register = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // New users always start as listeners
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            role: 'listener',
            courses: [],
            createdAt: new Date(),
        };
        
        setUser(newUser);
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
    };

    const updateUserRole = (userId: string, role: UserRole) => {
        if (user && user.id === userId) {
            setUser({ ...user, role });
        }
    };

    const addCourse = (courseId: string) => {
        if (user) {
            const updatedCourses = [...user.courses, courseId];
            // Auto-upgrade to student if they buy a course
            const newRole = user.role === 'listener' ? 'student' : user.role;
            setUser({ ...user, courses: updatedCourses, role: newRole });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout,
            updateUserRole,
            addCourse,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
