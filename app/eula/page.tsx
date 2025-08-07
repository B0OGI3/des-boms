import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'End User License Agreement - DES-BOMS',
  description: 'End User License Agreement for DES-BOMS application',
};

export default function EULAPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            End User License Agreement
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing and using DES-BOMS (Delivered Engineering Solutions - Batch Order Management System), 
              you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. License Grant
            </h2>
            <p className="text-gray-700 mb-4">
              Subject to the terms of this agreement, we grant you a limited, non-exclusive, 
              non-transferable license to use DES-BOMS for your manufacturing operations.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. QuickBooks Integration
            </h2>
            <p className="text-gray-700 mb-4">
              DES-BOMS integrates with QuickBooks Online to synchronize customer data. 
              By using this integration, you agree to QuickBooks&apos; terms of service and 
              authorize the application to access your QuickBooks data for synchronization purposes.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Data Usage
            </h2>
            <p className="text-gray-700 mb-4">
              Your manufacturing data and customer information are used solely for the 
              operation of the DES-BOMS system and QuickBooks synchronization. 
              We do not share your data with third parties except as required for system operation.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-4">
              DES-BOMS is provided &quot;as is&quot; without warranty of any kind. 
              We shall not be liable for any damages arising from the use of this software.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              For questions about this EULA, please contact us through our support channels.
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
