import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, AlertTriangle, FileText, CreditCard, MessageSquare } from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import PolicyCard from '../components/dashboard/PolicyCard';
import PaymentCard from '../components/dashboard/PaymentCard';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { generatePolicyId } from '../lib/utils';

// Mock data
const mockPolicies = [
  {
    id: 'AB-123456',
    type: 'Auto' as const,
    status: 'Active' as const,
    coverage: 50000,
    premium: 200,
    renewalDate: '2025-10-15',
  },
  {
    id: 'HM-789012',
    type: 'Home' as const,
    status: 'Active' as const,
    coverage: 350000,
    premium: 150,
    renewalDate: '2026-02-28',
  },
  {
    id: 'LF-345678',
    type: 'Life' as const,
    status: 'Pending' as const,
    coverage: 500000,
    premium: 75,
    renewalDate: '2025-12-15',
  },
];

const mockPayments = [
  {
    id: 'PMT-12345',
    policyId: 'AB-123456',
    policyType: 'Auto Insurance',
    amount: 200,
    dueDate: '2025-10-15',
    status: 'Pending' as const,
  },
  {
    id: 'PMT-67890',
    policyId: 'HM-789012',
    policyType: 'Home Insurance',
    amount: 150,
    dueDate: '2025-08-05',
    status: 'Paid' as const,
  },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [policies] = useState(mockPolicies);
  const [payments] = useState(mockPayments);
  
  // Count policies by status
  const activeCount = policies.filter(p => p.status === 'Active').length;
  const pendingCount = policies.filter(p => p.status === 'Pending').length;
  
  // Calculate upcoming payment total
  const upcomingPaymentsTotal = payments
    .filter(p => p.status === 'Pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back, {user?.name || 'User'}
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stats Card 1 */}
            <div className="card bg-white flex items-center">
              <div className="rounded-full bg-primary-100 p-3 mr-4">
                <FileText className="h-6 w-6 text-primary-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Policies</p>
                <h3 className="text-2xl font-bold">{activeCount}</h3>
              </div>
            </div>
            
            {/* Stats Card 2 */}
            <div className="card bg-white flex items-center">
              <div className="rounded-full bg-warning-100 p-3 mr-4">
                <AlertTriangle className="h-6 w-6 text-warning-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Policies</p>
                <h3 className="text-2xl font-bold">{pendingCount}</h3>
              </div>
            </div>
            
            {/* Stats Card 3 */}
            <div className="card bg-white flex items-center">
              <div className="rounded-full bg-secondary-100 p-3 mr-4">
                <CreditCard className="h-6 w-6 text-secondary-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Payments</p>
                <h3 className="text-2xl font-bold">${upcomingPaymentsTotal}</h3>
              </div>
            </div>
          </div>
          
          {/* Policies Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Policies</h2>
              <Button
                onClick={() => navigate('/policies')}
                variant="outline"
                className="text-sm"
                icon={<Plus size={16} />}
              >
                Add Policy
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {policies.map((policy) => (
                <PolicyCard
                  key={policy.id}
                  id={policy.id}
                  type={policy.type}
                  status={policy.status}
                  coverage={policy.coverage}
                  premium={policy.premium}
                  renewalDate={policy.renewalDate}
                  onClick={() => navigate(`/policies/${policy.id}`)}
                />
              ))}
            </div>
          </section>
          
          {/* Payments Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Payments</h2>
              <Button
                onClick={() => navigate('/payments')}
                variant="outline"
                className="text-sm"
              >
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payments
                .filter(payment => payment.status !== 'Paid')
                .map((payment) => (
                  <PaymentCard
                    key={payment.id}
                    id={payment.id}
                    policyId={payment.policyId}
                    policyType={payment.policyType}
                    amount={payment.amount}
                    dueDate={payment.dueDate}
                    status={payment.status}
                    onPayNow={() => navigate(`/payments/${payment.id}`)}
                  />
                ))}
            </div>
          </section>
          
          {/* Quick Actions Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button
                onClick={() => navigate('/submit-claim')}
                className="py-6 bg-primary-700 hover:bg-primary-800 transition-colors"
              >
                File a Claim
              </Button>
              <Button
                onClick={() => navigate('/policies')}
                className="py-6 bg-secondary-500 hover:bg-secondary-600 transition-colors"
              >
                Renew Policy
              </Button>
              <Button
                onClick={() => navigate('/contact-support')}
                className="py-6 bg-accent-600 hover:bg-accent-700 transition-colors"
                icon={<MessageSquare size={18} />}
              >
                Contact Support
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;