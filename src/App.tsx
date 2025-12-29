import { useState } from 'react';
import './App.css';
import {
  CallSuccessChart,
  LatencyChart,
  SentimentChart,
  CallVolumeChart,
  TTSAccuracyChart,
  callSuccessData,
} from './components/Charts';
import { EmailModal } from './components/EmailModal';

function App() {
  const [chartData, setChartData] = useState(callSuccessData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSaveChartData = (email: string, data: typeof callSuccessData) => {
    setUserEmail(email);
    setChartData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-primary text-white">
      {/* Header */}
      <header className="border-b border-gray-700 sticky top-0 z-40 bg-secondary bg-opacity-95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Voice Agent Analytics
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Real-time monitoring & observability for your voice AI
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-gradient-accent hover:opacity-90 rounded-lg font-semibold transition duration-200"
            >
              {userEmail ? `Manage Data (${userEmail})` : 'Customize Data'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <div className="text-gray-400 text-sm font-medium">Success Rate</div>
            <div className="text-3xl font-bold text-green-400 mt-2">94%</div>
            <div className="text-xs text-gray-500 mt-2">↑ 2.3% from yesterday</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <div className="text-gray-400 text-sm font-medium">Avg Latency</div>
            <div className="text-3xl font-bold text-blue-400 mt-2">795ms</div>
            <div className="text-xs text-gray-500 mt-2">↓ 45ms improvement</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <div className="text-gray-400 text-sm font-medium">Total Calls</div>
            <div className="text-3xl font-bold text-purple-400 mt-2">12.4k</div>
            <div className="text-xs text-gray-500 mt-2">Today</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <div className="text-gray-400 text-sm font-medium">Sentiment</div>
            <div className="text-3xl font-bold text-amber-400 mt-2">65%</div>
            <div className="text-xs text-gray-500 mt-2">Positive feedback</div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur border border-gray-700 rounded-lg p-6">
            <div className="text-gray-400 text-sm font-medium">STT Accuracy</div>
            <div className="text-3xl font-bold text-cyan-400 mt-2">96%</div>
            <div className="text-xs text-gray-500 mt-2">High performance</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Call Success Rate */}
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
              Call Success Rate
            </h3>
            <CallSuccessChart data={chartData} />
            <p className="text-xs text-gray-400 mt-3">
              Customized data • Tap "Customize Data" button to edit values
            </p>
          </div>

          {/* Latency Analysis */}
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
              Pipeline Latency
            </h3>
            <LatencyChart />
            <p className="text-xs text-gray-400 mt-3">
              STT → LLM → TTS processing time breakdown
            </p>
          </div>

          {/* Call Volume */}
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
              Call Volume & Duration
            </h3>
            <CallVolumeChart />
            <p className="text-xs text-gray-400 mt-3">
              Daily call volume and average call duration
            </p>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-amber-400 rounded-full mr-3"></span>
              Sentiment Distribution
            </h3>
            <SentimentChart />
            <p className="text-xs text-gray-400 mt-3">
              Caller sentiment analysis from transcriptions
            </p>
          </div>

          {/* TTS Accuracy */}
          <div className="bg-gray-800 bg-opacity-30 backdrop-blur border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></span>
              Agent Performance (TTS Accuracy)
            </h3>
            <TTSAccuracyChart />
            <p className="text-xs text-gray-400 mt-3">
              Individual agent text-to-speech accuracy metrics
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-6 bg-gray-800 bg-opacity-30 backdrop-blur border border-gray-700 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">About This Dashboard</h3>
          <p className="text-sm text-gray-400">
            This analytics dashboard provides real-time insights into your voice agent performance.
            Click <strong>"Customize Data"</strong> to save your email and modify the call success rate data.
            Your changes will be saved to our database and restored on your next visit.
          </p>
        </div>
      </main>

      {/* Email Modal */}
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveChartData} />
    </div>
  );
}

export default App;
