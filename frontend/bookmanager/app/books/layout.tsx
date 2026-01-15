'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, validateToken } from '@/lib/storage';
import Topbar from '@/components/Topbar';


export default function BooksLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const isValid = await validateToken(); 

            if (!isValid) {
                router.replace('/login');
            } else {
                setIsValidating(false);
            }
        };

        checkAuth();
    }, [router]);

    
    if (isValidating) {
        return (
            <div className="min-h-screen bg-black text-green-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-green-400">...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-green-100">
            <Topbar />
            <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        </div>
    );

}