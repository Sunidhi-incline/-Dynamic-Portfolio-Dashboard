// components/Loader.tsx
import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
      <p className="mt-4 text-gray-600">Loading your portfolio...</p>
    </div>
  );
}