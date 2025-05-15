import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

// Mock data for policies
const mockPolicies = [
  { id: 'AB-123456', type: 'Auto' },
  { id: 'HM-789012', type: 'Home' },
  { id: 'LF-345678', type: 'Life' },
  { id: 'HT-901234', type: 'Health' },
];

const ClaimSubmissionPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    policyId: '',
    incidentDate: '',
    incidentDescription: '',
    claimAmount: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      
      // Clear file error if it exists
      if (errors.files) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.files;
          return newErrors;
        });
      }
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.policyId) {
      newErrors.policyId = 'Please select a policy';
    }
    
    if (!formData.incidentDate) {
      newErrors.incidentDate = 'Please enter the incident date';
    }
    
    if (!formData.incidentDescription.trim()) {
      newErrors.incidentDescription = 'Please describe the incident';
    } else if (formData.incidentDescription.trim().length < 50) {
      newErrors.incidentDescription = 'Description should be at least 50 characters';
    }
    
    if (files.length === 0) {
      newErrors.files = 'Please upload at least one document';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Redirect to dashboard after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 1500);
  };
  
  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Submit a Claim</h1>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto">
              <div className="card text-center py-10">
                <div className="rounded-full bg-success-100 p-4 mx-auto mb-6 w-20 h-20 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-success-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Claim Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your claim has been received. A claim specialist will review your submission and contact you within 48 hours.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto mb-6">
                  <p className="text-sm text-gray-700 font-medium">Claim Reference Number:</p>
                  <p className="text-xl font-bold text-gray-800">CLM-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                <Button
                  onClick={() => navigate('/dashboard')}
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Submit a Claim</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back, {user?.name || 'User'}
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Claim Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Policy Selector */}
                <div>
                  <label htmlFor="policyId" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Policy
                  </label>
                  <select
                    id="policyId"
                    name="policyId"
                    className={`input ${errors.policyId ? 'border-error-500 focus:ring-error-500' : ''}`}
                    value={formData.policyId}
                    onChange={handleChange}
                  >
                    <option value="">Select a policy</option>
                    {mockPolicies.map(policy => (
                      <option key={policy.id} value={policy.id}>
                        {policy.id} - {policy.type} Insurance
                      </option>
                    ))}
                  </select>
                  {errors.policyId && (
                    <p className="mt-1 text-sm text-error-600">{errors.policyId}</p>
                  )}
                </div>
                
                {/* Incident Date */}
                <div>
                  <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Incident
                  </label>
                  <Input
                    type="date"
                    id="incidentDate"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    error={errors.incidentDate}
                    max={new Date().toISOString().split('T')[0]} // Prevent future dates
                  />
                </div>
                
                {/* Incident Description */}
                <div>
                  <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Incident Description
                  </label>
                  <textarea
                    id="incidentDescription"
                    name="incidentDescription"
                    rows={5}
                    className={`input ${errors.incidentDescription ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="Please provide a detailed description of the incident..."
                    value={formData.incidentDescription}
                    onChange={handleChange}
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum 50 characters. Please include all relevant details about the incident.
                  </p>
                  {errors.incidentDescription && (
                    <p className="mt-1 text-sm text-error-600">{errors.incidentDescription}</p>
                  )}
                </div>
                
                {/* Claim Amount */}
                <div>
                  <label htmlFor="claimAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Claim Amount (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <Input
                      type="number"
                      id="claimAmount"
                      name="claimAmount"
                      className="pl-7"
                      placeholder="0.00"
                      value={formData.claimAmount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Document Upload */}
                <div>
                  <label htmlFor="documents" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Documents
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.files ? 'border-error-300' : 'border-gray-300'}`}>
                    <div className="mb-3">
                      <FileUp className="h-8 w-8 mx-auto text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your files here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Supported formats: PDF, PNG, JPEG (Max: 10MB per file)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('documents')?.click()}
                    >
                      Browse Files
                    </Button>
                    <input
                      type="file"
                      id="documents"
                      className="hidden"
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                  </div>
                  {errors.files && (
                    <p className="mt-1 text-sm text-error-600">{errors.files}</p>
                  )}
                  
                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Uploaded Documents:</p>
                      <ul className="border rounded-lg divide-y">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between py-2 px-4">
                            <div className="flex items-center">
                              <FileUp className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm truncate max-w-xs">{file.name}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-error-500"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Submission Notice */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-primary-700 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-primary-800">Important Notice</h4>
                    <p className="text-sm text-primary-700 mt-1">
                      By submitting this claim, you certify that all information provided is accurate and complete to the best of your knowledge. False information may result in denial of your claim.
                    </p>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Submit Claim
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClaimSubmissionPage;