import { Calendar, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../../lib/utils';

interface PolicyCardProps {
  id: string;
  type: 'Auto' | 'Home' | 'Life' | 'Health';
  status: 'Active' | 'Pending' | 'Expired';
  coverage: number;
  premium: number;
  renewalDate: string;
  onClick: () => void;
}

const PolicyCard = ({
  id,
  type,
  status,
  coverage,
  premium,
  renewalDate,
  onClick,
}: PolicyCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return 'bg-success-100 text-success-700';
      case 'Pending':
        return 'bg-warning-100 text-warning-700';
      case 'Expired':
        return 'bg-error-100 text-error-700';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'Auto':
        return (
          <div className="rounded-full bg-primary-100 p-2 text-primary-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10H6l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <path d="M9 17h6" />
              <circle cx="17" cy="17" r="2" />
            </svg>
          </div>
        );
      case 'Home':
        return (
          <div className="rounded-full bg-secondary-100 p-2 text-secondary-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        );
      case 'Life':
        return (
          <div className="rounded-full bg-accent-100 p-2 text-accent-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
              <circle cx="20" cy="10" r="2" />
            </svg>
          </div>
        );
      case 'Health':
        return (
          <div className="rounded-full bg-success-100 p-2 text-success-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4H8a4 4 0 0 0-4 4v12h16V8a4 4 0 0 0-4-4Z" />
              <path d="M12 16a4 4 0 0 1-4-4v-4h8v4a4 4 0 0 1-4 4Z" />
              <path d="M12 13a1 1 0 0 0 1-1v0a1 1 0 0 0-1-1v0a1 1 0 0 0-1 1v0a1 1 0 0 0 1 1Z" />
            </svg>
          </div>
        );
    }
  };

  const isRenewalSoon = () => {
    const renewalDateObj = new Date(renewalDate);
    const today = new Date();
    const diffTime = renewalDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <div
      className="card hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {getTypeIcon()}
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{type} Insurance</h3>
            <p className="text-sm text-gray-500">Policy #{id}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <ShieldCheck size={16} className="text-gray-500 mr-2" />
          <span className="text-sm">Coverage: {formatCurrency(coverage)}</span>
        </div>
        
        <div className="flex items-center">
          <Calendar size={16} className="text-gray-500 mr-2" />
          <span className="text-sm">
            Renewal: {formatDate(renewalDate)}
            {isRenewalSoon() && (
              <span className="ml-2 text-warning-600 flex items-center">
                <AlertTriangle size={14} className="mr-1" /> Renew soon
              </span>
            )}
          </span>
        </div>
        
        <div className="flex items-center">
          <CheckCircle size={16} className="text-gray-500 mr-2" />
          <span className="text-sm">Premium: {formatCurrency(premium)}/month</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
        <button className="text-primary-700 hover:text-primary-800 text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PolicyCard;