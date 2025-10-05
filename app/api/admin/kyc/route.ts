import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock KYC requests - replace with actual API calls
    const kycRequests = [
      {
        id: 'KYC001',
        name: 'John Smith',
        email: 'john.smith@example.com',
        country: 'United States',
        documents: ['passport.pdf', 'utility_bill.pdf'],
        submittedAt: '2024-10-01T14:30:00Z',
        status: 'pending'
      },
      {
        id: 'KYC002',
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        country: 'Spain',
        documents: ['id_card.pdf', 'bank_statement.pdf'],
        submittedAt: '2024-10-02T09:15:00Z',
        status: 'pending'
      },
      {
        id: 'KYC003',
        name: 'David Chen',
        email: 'david.chen@example.com',
        country: 'Canada',
        documents: ['driver_license.pdf', 'proof_of_address.pdf'],
        submittedAt: '2024-10-03T16:45:00Z',
        status: 'pending'
      }
    ];
    
    return NextResponse.json(kycRequests);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch KYC requests' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, action } = await request.json();
    
    if (!id || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }
    
    // Mock KYC approval/rejection - replace with actual API calls
    console.log(`${action === 'approve' ? 'Approving' : 'Rejecting'} KYC request ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: `KYC request ${action}d successfully` 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process KYC request' },
      { status: 500 }
    );
  }
}