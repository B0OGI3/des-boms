import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - DES-BOMS',
  description: 'Privacy Policy for DES-BOMS application',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              DES-BOMS collects and processes manufacturing data including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Customer information and contact details</li>
              <li>Purchase orders and manufacturing specifications</li>
              <li>Batch routing and production data</li>
              <li>Quality control records and inspection data</li>
              <li>Workstation confirmations and operator information</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              Your information is used to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Manage manufacturing orders and batch routing</li>
              <li>Synchronize customer data with QuickBooks Online</li>
              <li>Track production progress and quality control</li>
              <li>Generate reports and analytics for your operations</li>
              <li>Provide technical support and system maintenance</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. QuickBooks Integration
            </h2>
            <p className="text-gray-700 mb-4">
              When you connect DES-BOMS to QuickBooks Online:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>We access customer data from your QuickBooks account</li>
              <li>Customer information is synchronized between both systems</li>
              <li>We comply with Intuit&apos;s privacy and security requirements</li>
              <li>You can disconnect the integration at any time</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Data Storage and Security
            </h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Data is stored in secure, encrypted databases</li>
              <li>Access is restricted to authorized personnel only</li>
              <li>Regular security audits and updates are performed</li>
              <li>Backup and disaster recovery procedures are in place</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Data Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your data to third parties except:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>QuickBooks Online integration (with your explicit consent)</li>
              <li>As required by law or legal processes</li>
              <li>To protect our rights, property, or safety</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access and review your personal data</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Disconnect QuickBooks integration at any time</li>
              <li>Export your data in standard formats</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Cookies and Tracking
            </h2>
            <p className="text-gray-700 mb-4">
              DES-BOMS uses cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Maintain user sessions and preferences</li>
              <li>Analyze system usage and performance</li>
              <li>Provide a better user experience</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. 
              We will notify you of any changes by posting the new policy on this page.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us through our support channels.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Back to Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
