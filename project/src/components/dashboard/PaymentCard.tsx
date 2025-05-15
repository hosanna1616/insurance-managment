import { useState } from "react";
import {
  CreditCard,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  CreditCardIcon,
} from "lucide-react";
import { formatCurrency, formatDate } from "../../lib/utils";
import Button from "../ui/Button";

interface PaymentCardProps {
  id: string;
  policyId: string;
  policyType: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  onPayNow?: () => void;
}

const PaymentCard = ({
  id,
  policyId,
  policyType,
  amount,
  dueDate,
  status,
  onPayNow,
}: PaymentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case "Paid":
        return "bg-success-100 text-success-700";
      case "Pending":
        return "bg-warning-100 text-warning-700";
      case "Overdue":
        return "bg-error-100 text-error-700";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Paid":
        return <CheckCircle size={16} className="text-success-700" />;
      case "Pending":
        return <AlertTriangle size={16} className="text-warning-700" />;
      case "Overdue":
        return <AlertTriangle size={16} className="text-error-700" />;
    }
  };

  const isDueSoon = () => {
    if (status === "Paid") return false;

    const dueDateObj = new Date(dueDate);
    const today = new Date();
    const diffTime = dueDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const handlePayNow = () => {
    setShowPaymentModal(true);
    if (onPayNow) onPayNow();
  };

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const closeModals = () => {
    setShowDetails(false);
    setShowPaymentModal(false);
  };

  return (
    <div className="card relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="rounded-full bg-gray-100 p-2">
            <CreditCard size={18} className="text-gray-700" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">
              {policyType} Premium
            </h3>
            <p className="text-sm text-gray-500">Policy #{policyId}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor()}`}
        >
          {status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(amount)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600">Due Date:</span>
            {isDueSoon() && (
              <span className="ml-2 text-warning-600 text-xs flex items-center">
                <AlertTriangle size={12} className="mr-1" /> Due Soon
              </span>
            )}
          </div>
          <span className="font-medium text-gray-800">
            {formatDate(dueDate)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <div className="flex items-center">
            {getStatusIcon()}
            <span className="ml-1 font-medium">{status}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
        <Button
          onClick={handleViewDetails}
          className="flex-1"
          variant="outline"
        >
          <Info size={16} className="mr-1" /> View Details
        </Button>

        {(status === "Pending" || status === "Overdue") && (
          <Button onClick={handlePayNow} className="flex-1">
            Pay Now
          </Button>
        )}
      </div>

      {/* Payment Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Payment Details</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {policyType} Policy
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Policy ID:</span>
                    <span className="font-medium">{policyId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-medium">{id}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">
                      {formatCurrency(amount)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium">{formatDate(dueDate)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <div className="flex items-center">
                      {getStatusIcon()}
                      <span className={`ml-1 font-medium`}>{status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Payment History
                </h3>
                <div className="space-y-2">
                  {status === "Paid" ? (
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center">
                        <CheckCircle
                          size={16}
                          className="text-success-700 mr-2"
                        />
                        <span>
                          Paid on{" "}
                          {formatDate(
                            new Date(
                              new Date(dueDate).getTime() -
                                3 * 24 * 60 * 60 * 1000
                            ).toString()
                          )}
                        </span>
                      </div>
                      <span className="font-medium">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No payment history available
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              {(status === "Pending" || status === "Overdue") && (
                <Button onClick={handlePayNow} className="w-full">
                  Pay Now
                </Button>
              )}
              {status === "Paid" && (
                <Button
                  variant="outline"
                  onClick={closeModals}
                  className="w-full"
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Make Payment</h2>
            <p className="text-gray-600 mb-4">
              You are about to pay {formatCurrency(amount)} for your{" "}
              {policyType} policy.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Payment Method
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      className="mr-2"
                      defaultChecked
                    />
                    <label htmlFor="card" className="flex items-center">
                      <CreditCardIcon
                        size={16}
                        className="mr-2 text-gray-700"
                      />
                      Credit/Debit Card
                    </label>
                  </div>

                  <div className="pl-6 space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm text-gray-600">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="**** **** **** 1234"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm text-gray-600">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-gray-600">CVV</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Payment Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{policyType} Premium:</span>
                    <span className="font-medium">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="font-medium">{formatCurrency(0)}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">{formatCurrency(amount)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={closeModals}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  alert("Payment processed successfully!");
                  closeModals();
                }}
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
