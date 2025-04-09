
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Reactor } from '@/hooks/useReactorData';

interface ReactorGaugeProps {
  reactor: Reactor;
  gaugeType: 'radial' | 'linear';
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
        <p className="font-semibold text-industrial-gray">{data.name}</p>
        <p className="text-sm">Temperature: <span className="font-medium">{data.temperature}°C</span></p>
        <p className="text-sm">Pressure: <span className="font-medium">{data.pressure} bar</span></p>
        <p className="text-sm">Status: <span className={`font-medium ${
          data.status === 'normal' ? 'text-industrial-green' :
          data.status === 'warning' ? 'text-industrial-amber' :
          data.status === 'critical' ? 'text-industrial-red' : 'text-gray-500'
        }`}>{data.status}</span></p>
        <p className="text-xs text-gray-500 mt-1">Updated {new Date(data.lastUpdated).toLocaleTimeString()}</p>
      </div>
    );
  }
  return null;
};

const ReactorGauge: React.FC<ReactorGaugeProps> = ({ reactor, gaugeType }) => {
  const { temperature, status } = reactor;
  
  // Calculate gauge percentage (0-100)
  const percentage = Math.min(100, Math.max(0, temperature / 120 * 100));
  
  const getStatusColor = () => {
    switch(status) {
      case 'normal': return '#43a047'; // green
      case 'warning': return '#ffb300'; // amber
      case 'critical': return '#e53935'; // red
      case 'offline': return '#9e9e9e'; // gray
      default: return '#9e9e9e';
    }
  };
  
  const gaugeData = [
    { name: 'value', value: percentage },
    { name: 'rest', value: 100 - percentage }
  ];
  
  const statusColor = getStatusColor();
  
  // For linear gauge
  if (gaugeType === 'linear') {
    return (
      <div className="border border-gray-200 bg-white rounded-lg p-4 h-full">
        <h3 className="font-semibold mb-2">{reactor.name}</h3>
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-500 ease-out"
            style={{ 
              width: `${percentage}%`, 
              backgroundColor: statusColor,
            }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0°C</span>
          <span>60°C</span>
          <span>120°C</span>
        </div>
        <div className="mt-2 text-center">
          <span className="text-lg font-bold">{temperature}°C</span>
          <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
            status === 'normal' ? 'bg-green-100 text-green-800' :
            status === 'warning' ? 'bg-amber-100 text-amber-800' :
            status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </div>
      </div>
    );
  }

  // Default: radial gauge
  return (
    <div className="border border-gray-200 bg-white rounded-lg p-4 h-full">
      <h3 className="font-semibold mb-2">{reactor.name}</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={statusColor} />
              <Cell fill="#f5f5f5" />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold">{temperature}°C</div>
          <div className={`text-xs uppercase font-semibold ${
            status === 'normal' ? 'text-industrial-green' :
            status === 'warning' ? 'text-industrial-amber' :
            status === 'critical' ? 'text-industrial-red' : 'text-gray-500'
          }`}>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactorGauge;
