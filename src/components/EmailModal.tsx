import { useState, useEffect } from 'react';
import { supabase, ChartData } from '../lib/supabase';
import { callSuccessData } from './Charts';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (email: string, data: typeof callSuccessData) => void;
}

export function EmailModal({ isOpen, onClose, onSave }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previousData, setPreviousData] = useState<any>(null);
  const [customData, setCustomData] = useState(callSuccessData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Check if user has previous data
      const { data: existingData, error: fetchError } = await supabase
        .from('chart_data')
        .select('*')
        .eq('email', email)
        .eq('chart_type', 'call_success')
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingData) {
        setPreviousData(existingData.data);
        setCustomData(existingData.data);
      } else {
        setPreviousData(null);
        setCustomData(callSuccessData);
      }

      setShowForm(true);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataChange = (index: number, field: string, value: string) => {
    const newData = [...customData];
    newData[index] = {
      ...newData[index],
      [field]: field.includes('Rate') ? parseInt(value) : value,
    };
    setCustomData(newData);
  };

  const handleSaveData = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (previousData) {
        const { error: updateError } = await supabase
          .from('chart_data')
          .update({
            data: customData,
            updated_at: new Date().toISOString(),
          })
          .eq('email', email)
          .eq('chart_type', 'call_success');

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('chart_data')
          .insert([
            {
              email,
              chart_type: 'call_success',
              data: customData,
            },
          ]);

        if (insertError) throw insertError;
      }

      onSave(email, customData);
      handleClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setShowForm(false);
    setPreviousData(null);
    setCustomData(callSuccessData);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-gray-700">
        <div className="p-6">
          {!showForm ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Customize Your Analytics</h2>
              <p className="text-gray-400 text-sm mb-6">
                Enter your email to save and manage your custom chart values.
              </p>

              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-accent hover:opacity-90 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                  {isLoading ? 'Loading...' : 'Continue'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Edit Call Success Data</h2>
              
              {previousData && (
                <div className="mb-4 p-3 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg">
                  <p className="text-sm text-blue-300 mb-2">
                    <strong>Note:</strong> You have previous values saved. These will be overwritten.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCustomData(previousData)}
                    className="text-sm text-blue-400 hover:text-blue-300 underline"
                  >
                    Restore previous values
                  </button>
                </div>
              )}

              <form onSubmit={handleSaveData} className="max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {customData.map((entry, index) => (
                    <div key={index} className="bg-gray-700 bg-opacity-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400 mb-2">Time: {entry.time}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Success Rate (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={entry.successRate}
                            onChange={(e) =>
                              handleDataChange(index, 'successRate', e.target.value)
                            }
                            className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Failure Rate (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={entry.failureRate}
                            onChange={(e) =>
                              handleDataChange(index, 'failureRate', e.target.value)
                            }
                            className="w-full px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-accent hover:opacity-90 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition duration-200"
                  >
                    {isLoading ? 'Saving...' : 'Save Data'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
