import React from 'react';
import { Button } from './ui/button';
import { X, Calendar, MapPin, Thermometer, Layers } from 'lucide-react';
import { useFontSize } from '../contexts/FontSizeContext';
 
interface TrackPoint {
  timestamp: string;
  center_lat: number;
  center_lon: number;
  pixel_count: number;
  areakm2: number;
  eccentricity: number;
  perimeter_km: number;
  major_axis_length_km: number;
  minor_axis_length_km: number;
  orientation_deg: number;
  mean_tb_k: number;
  min_tb_k: number;
  max_tb_k: number;
  median_tb_k: number;
  std_tb_k: number;
  min_radius_km: number;
  mean_radius_km: number;
  max_radius_km: number;
  mean_cth_km: number;
  max_cth_km: number;
  image_filename: string;
}

interface ImageCompareModalProps {
  images: TrackPoint[];
  onClose: () => void;
}

const ImageCompareModal: React.FC<ImageCompareModalProps> = ({ images, onClose }) => {
  const { getFontSizeClass } = useFontSize();
  
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className={`bg-white rounded-xl max-w-7xl max-h-full overflow-auto shadow-2xl ${getFontSizeClass()}`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-b p-6 flex justify-between items-center rounded-t-xl">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Layers className="w-8 h-8" />
            Image Comparison Dashboard
          </h2>
          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {images.map((image, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-100 hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=350&fit=crop&q=80&sig=${index}`}
                    alt={image.image_filename}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Image {index + 1}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gov-navy mb-4 break-all">{image.image_filename}</h3>
                  
                  <div className="space-y-4">
                    {/* Timestamp */}
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="text-sm font-semibold text-gray-600">Timestamp:</span>
                        <p className="text-sm font-mono text-gray-800">{formatTimestamp(image.timestamp)}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div>
                          <span className="text-sm font-semibold text-gray-600">Latitude:</span>
                          <p className="text-sm font-mono text-gray-800">{image.center_lat.toFixed(4)}°</p>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-600">Longitude:</span>
                          <p className="text-sm font-mono text-gray-800">{image.center_lon.toFixed(4)}°</p>
                        </div>
                      </div>
                    </div>

                    {/* Temperature Data */}
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Thermometer className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-gray-700">Temperature Data</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white p-2 rounded">
                          <strong className="text-gray-600">Mean BT:</strong>
                          <p className="text-gray-800 font-mono">{image.mean_tb_k.toFixed(1)} K</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <strong className="text-gray-600">Min BT:</strong>
                          <p className="text-gray-800 font-mono">{image.min_tb_k.toFixed(1)} K</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <strong className="text-gray-600">Median BT:</strong>
                          <p className="text-gray-800 font-mono">{image.median_tb_k.toFixed(1)} K</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <strong className="text-gray-600">Std BT:</strong>
                          <p className="text-gray-800 font-mono">{image.std_tb_k.toFixed(1)} K</p>
                        </div>
                      </div>
                    </div>

                    {/* Physical Properties */}
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-gray-700">Physical Properties</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white p-2 rounded">
                          <strong className="text-gray-600">Pixel Count:</strong>
                          <p className="text-gray-800 font-mono">{image.pixel_count.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <strong className="text-gray-600">Mean Radius:</strong>
                          <p className="text-gray-800 font-mono">{image.mean_radius_km.toFixed(1)} km</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <strong className="text-gray-600">Max Radius:</strong>
                          <p className="text-gray-800 font-mono">{image.max_radius_km.toFixed(1)} km</p>
                        </div>
                        <div className="bg-white p-2 rounded">
                          <strong className="text-gray-600">Mean CTH:</strong>
                          <p className="text-gray-800 font-mono">{image.mean_cth_km.toFixed(1)} km</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompareModal;
