/**
 * Parts Master Demo Page
 * Demonstrates the new Parts Master system with unique part IDs and BOM structure
 * Fixed: Number conversion for toFixed() calls
 */

'use client';

import { useState, useEffect } from 'react';
import { PartTypeIndicator } from '../components/ui/PartTypeIndicator';
import { BOMVisualization } from '../components/ui/BOMVisualization';

interface Part {
  id: string;
  partNumber: string;
  partName: string;
  partType: 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
  partTypeDescription: string;
  description?: string;
  standardCost?: number;
  unitOfMeasure?: string;
  materialSpec?: string;
  leadTime?: number;
  _count: {
    parentBOMs: number;
    childBOMs: number;
    orderLineItems: number;
  };
}

export default function PartsDemo() {
  const [parts, setParts] = useState<Part[]>([]);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<
    'ALL' | 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL'
  >('ALL');

  // Load parts on component mount
  useEffect(() => {
    loadParts();
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadParts = async () => {
    setLoading(true);
    try {
      const filterParam = filter !== 'ALL' ? `?partType=${filter}` : '';
      const response = await fetch(`/api/parts${filterParam}`);
      const result = await response.json();
      if (result.success) {
        setParts(result.data);
      }
    } catch (error) {
      console.error('Error loading parts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Parts Master System Demo</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-blue-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-blue-800'>Total Parts</h3>
          <p className='text-2xl font-bold text-blue-600'>{parts.length}</p>
        </div>
        <div className='bg-green-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-green-800'>Finished Parts</h3>
          <p className='text-2xl font-bold text-green-600'>
            {parts.filter(p => p.partType === 'FINISHED').length}
          </p>
        </div>
        <div className='bg-yellow-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-yellow-800'>Semi-Finished</h3>
          <p className='text-2xl font-bold text-yellow-600'>
            {parts.filter(p => p.partType === 'SEMI_FINISHED').length}
          </p>
        </div>
        <div className='bg-purple-50 p-4 rounded-lg'>
          <h3 className='font-semibold text-purple-800'>Raw Materials</h3>
          <p className='text-2xl font-bold text-purple-600'>
            {parts.filter(p => p.partType === 'RAW_MATERIAL').length}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className='mb-6'>
        <div className='flex gap-2'>
          {['ALL', 'FINISHED', 'SEMI_FINISHED', 'RAW_MATERIAL'].map(
            filterOption => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption as any)}
                className={`px-4 py-2 rounded ${
                  filter === filterOption
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filterOption.replace('_', ' ')}
              </button>
            )
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Parts List */}
        <div>
          <h2 className='text-xl font-semibold mb-4'>Parts Master</h2>
          {loading ? (
            <p className='text-gray-600'>Loading...</p>
          ) : (
            <div className='space-y-2 max-h-96 overflow-y-auto'>
              {parts.map(part => (
                <button
                  key={part.id}
                  type='button'
                  onClick={() => setSelectedPart(part)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPart(part);
                    }
                  }}
                  className='w-full p-4 border rounded-lg hover:bg-gray-50 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <span className='font-mono text-sm font-bold text-blue-600'>
                          {part.partNumber}
                        </span>
                        <PartTypeIndicator
                          partType={part.partType}
                          partNumber={part.partNumber}
                          hasComponents={part._count.childBOMs > 0}
                          componentCount={part._count.childBOMs}
                          size='xs'
                          showDetails={true}
                        />
                      </div>
                      <h3 className='font-semibold'>{part.partName}</h3>
                      {part.description && (
                        <p className='text-sm text-gray-600'>
                          {part.description}
                        </p>
                      )}
                    </div>
                    <div className='text-right text-sm text-gray-500'>
                      {part.standardCost && (
                        <p>${Number(part.standardCost).toFixed(2)}</p>
                      )}
                      <p>{part._count.childBOMs} components</p>
                      <p>{part._count.orderLineItems} orders</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* BOM Structure */}
        <div>
          <h2 className='text-xl font-semibold mb-4'>Bill of Materials</h2>
          {selectedPart ? (
            <div>
              <div className='bg-blue-50 p-4 rounded-lg mb-4'>
                <h3 className='font-semibold text-blue-800 flex items-center gap-2'>
                  {selectedPart.partNumber} - {selectedPart.partName}
                  <PartTypeIndicator
                    partType={selectedPart.partType}
                    partNumber={selectedPart.partNumber}
                    hasComponents={selectedPart._count.childBOMs > 0}
                    componentCount={selectedPart._count.childBOMs}
                    size='sm'
                    showDetails={true}
                  />
                </h3>
                <p className='text-sm text-blue-600'>
                  {selectedPart.partTypeDescription}
                </p>
              </div>

              <BOMVisualization
                partId={selectedPart.id}
                quantity={1}
                showMaterialRequirements={true}
                showCosts={true}
                maxLevels={3}
                onComponentClick={component => {
                  console.log('Component clicked:', component);
                  // Could open component details or drill down
                }}
              />
            </div>
          ) : (
            <p className='text-gray-600'>
              Select a part to view its BOM structure
            </p>
          )}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className='mt-8 bg-gray-50 p-6 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>
          Parts Master System Features
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h4 className='font-medium text-green-700'>✅ Unique Part IDs</h4>
            <ul className='text-sm text-gray-600 ml-4'>
              <li>• FG-YYYY-#### for Finished Goods</li>
              <li>• SF-YYYY-#### for Semi-Finished Parts</li>
              <li>• RM-YYYY-#### for Raw Materials</li>
            </ul>
          </div>
          <div>
            <h4 className='font-medium text-green-700'>✅ BOM Structure</h4>
            <ul className='text-sm text-gray-600 ml-4'>
              <li>• Multi-level Bill of Materials</li>
              <li>• Component relationships</li>
              <li>• Material consumption tracking</li>
            </ul>
          </div>
          <div>
            <h4 className='font-medium text-green-700'>✅ Cost Management</h4>
            <ul className='text-sm text-gray-600 ml-4'>
              <li>• Standard costs per part</li>
              <li>• Automatic cost rollup in BOMs</li>
              <li>• Scrap factor calculations</li>
            </ul>
          </div>
          <div>
            <h4 className='font-medium text-green-700'>✅ Integration Ready</h4>
            <ul className='text-sm text-gray-600 ml-4'>
              <li>• Links to purchase orders</li>
              <li>• Manufacturing routing</li>
              <li>• Batch tracking support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
