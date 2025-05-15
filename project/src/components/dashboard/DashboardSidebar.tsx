import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  FileText,
  CreditCard,
  Settings,
  AlertCircle,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
      isActive ? "bg-primary-700 text-white" : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="bg-white h-full border-r border-gray-200 w-64 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">InsureEase</h2>
        {user && (
          <div className="mt-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        )}
        {/* Added Go to Home button near welcoming section */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          Go to Home
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavItem
          to="/dashboard"
          icon={<HomeIcon size={18} />}
          label="Dashboard"
          isActive={pathname === "/dashboard"}
        />
        <NavItem
          to="/policies"
          icon={<FileText size={18} />}
          label="Policies"
          isActive={pathname === "/policies"}
        />
        <NavItem
          to="/claims"
          icon={<AlertCircle size={18} />}
          label="Claims"
          isActive={pathname === "/claims" || pathname === "/submit-claim"}
        />
        <NavItem
          to="/payments"
          icon={<CreditCard size={18} />}
          label="Payments"
          isActive={pathname === "/payments"}
        />
        <NavItem
          to="/profile"
          icon={<User size={18} />}
          label="Profile"
          isActive={pathname === "/profile"}
        />
        <NavItem
          to="/settings"
          icon={<Settings size={18} />}
          label="Settings"
          isActive={pathname === "/settings"}
        />
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
