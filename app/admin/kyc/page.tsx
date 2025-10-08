'use client';

import { useEffect, useState } from 'react';
import { KYCRequestsTable } from '@/components/admin/KYCRequestsTable';

interface KYCRequest {
  id: string;
  name: string;
  email: string;
  country: string;
  documents: string[];
  submittedAt: string;
  status: string;
}

export default function KYCPage() {
  const [requests, setRequests] = useState<KYCRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/admin/kyc');
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        }
      } catch (error) {
        console.error('Failed to fetch KYC requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleKYCAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch('/api/admin/kyc', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });

      if (response.ok) {
        // Remove the processed request from the list
        setRequests(prev => prev.filter(req => req.id !== id));
      }
    } catch (error) {
      console.error('Failed to process KYC request:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">KYC Requests</h1>
        <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">KYC Requests</h1>
        <div className="text-xs md:text-sm text-gray-600">
          {requests.length} pending request{requests.length !== 1 ? 's' : ''}
        </div>
      </div>
      <KYCRequestsTable requests={requests} onAction={handleKYCAction} />
    </div>
  );
}