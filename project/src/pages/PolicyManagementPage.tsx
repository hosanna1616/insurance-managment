import { useState } from 'react';
import { Search, Filter, ChevronDown, Download, Plus } from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { generatePolicyId, formatDate } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

// Mock data for policies
const mockPolicies = [
  {
    id: 'AB-123456',
    type: 'Auto',
    startDate: '2024-05-15',
    endDate: '2025-10-15',
    status: 'Active',
    premium: 200,
  },
  {
    id: 'HM-789012',
    type: 'Home',
    startDate: '2024-03-28',
    endDate: '2025-03-28',
    status: 'Active',
    premium: 150,
  },
  {
    id: 'LF-345678',
    type: 'Life',
    startDate: '2024-06-15',
    endDate: '2025-06-15',
    status: 'Pending',
    premium: 75,
  },
  {
    id: 'HT-901234',
    type: 'Health',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    premium: 350,
  },
  {
    id: 'TR-567890',
    type: 'Travel',
    startDate: '2023-12-10',
    endDate: '2024-01-10',
    status: 'Expired',
    premium: 80,
  },
];

const PolicyManagementPage = () => {
  const { user } = useAuth();
  const [policies] = useState(mockPolicies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter and sort policies
  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        policy.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || policy.type === filterType;
    const matchesStatus = filterStatus === 'All' || policy.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    } else if (sortBy === 'premium-high') {
      return b.premium - a.premium;
    } else {
      return a.premium - b.premium;
    }
  });
  
  // Get unique policy types for filter
  const policyTypes = ['All', ...new Set(policies.map(policy => policy.type))];
  
  // Get unique policy statuses for filter
  const policyStatuses = ['All', ...new Set(policies.map(policy => policy.status))];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success-100 text-success-700';
      case 'Pending':
        return 'bg-warning-100 text-warning-700';
      case 'Expired':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Policy Management</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back, {user?.name || 'User'}
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {/* Search and Filter Controls */}
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search by policy ID or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-5 w-5 text-gray-400" />}
              />
            </div>
            
            <div className="flex space-x-3">
              <div className="relative flex-1">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    className="input pr-10"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    {policyTypes.map(type => (
                      <option key={type} value={type}>{type} Types</option>
                    ))}
                  </select>
                  <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 pointer-events-none" />
                </div>
              </div>
              
              <div className="relative flex-1">
                <div className="flex items-center">
                  <select
                    className="input pr-10"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    {policyStatuses.map(status => (
                      <option key={status} value={status}>{status} Status</option>
                    ))}
                  </select>
                  <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                icon={<Download className="h-5 w-5" />}
              >
                Export
              </Button>
              <Button
                className="flex-1"
                icon={<Plus className="h-5 w-5" />}
              >
                Add Policy
              </Button>
            </div>
          </div>
          
          {/* Sorting Controls */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredPolicies.length}</span> policies
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                className="text-sm border border-gray-300 rounded-md py-1 px-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="premium-high">Premium (High to Low)</option>
                <option value="premium-low">Premium (Low to High)</option>
              </select>
            </div>
          </div>
          
          {/* Policies Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Policy ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Premium
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPolicies.map((policy) => (
                    <tr key={policy.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{policy.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{policy.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(policy.startDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(policy.endDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                          {policy.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${policy.premium}/month</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="text-primary-700 hover:text-primary-800 font-medium">
                            View
                          </button>
                          {policy.status === 'Active' && (
                            <button className="text-secondary-700 hover:text-secondary-800 font-medium">
                              Renew
                            </button>
                          )}
                          <button className="text-gray-700 hover:text-gray-800 font-medium">
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPolicies.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-gray-500">No policies match your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PolicyManagementPage;