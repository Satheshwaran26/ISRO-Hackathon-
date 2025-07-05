
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Thermometer, MapPin, Calendar, Layers, X } from 'lucide-react';
import TrackPointsTable from '@/components/TrackPointsTable';
import ImageCompareModal from '@/components/ImageCompareModal';
import { trackData } from '@/data/trackData';
import { useFontSize } from '@/contexts/FontSizeContext';

interface TrackPoint {
  timestamp: string;
  centroid_lat: number;
  centroid_lon: number;
  pixel_count: number;
  mean_bt_k: number;
  min_bt_k: number;
  median_bt_k: number;
  std_bt_k: number;
  min_radius_km: number;
  mean_radius_km: number;
  max_radius_km: number;
  mean_cth_km: number;
  max_cth_km: number;
  image_filename: string;
}

const TrackDetail = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<TrackPoint | null>(null);
  const [selectedImages, setSelectedImages] = useState<TrackPoint[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const { increaseFontSize, decreaseFontSize } = useFontSize();

  const track = trackData.tracks.find(t => t.tcc_track_id === trackId);

  if (!track) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-govt text-gov-navy mb-4">Track Not Found</h1>
          <Button onClick={() => navigate('/')} className="bg-gov-saffron hover:bg-orange-600">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getBasinColor = (basin: string) => {
    switch (basin) {
      case 'NIO':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'SIO':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleImageClick = (trackPoint: TrackPoint) => {
    setSelectedImage(trackPoint);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleImageSelect = (trackPoint: TrackPoint) => {
    setSelectedImages(prev => {
      const existing = prev.find(img => img.image_filename === trackPoint.image_filename);
      if (existing) {
        return prev.filter(img => img.image_filename !== trackPoint.image_filename);
      } else if (prev.length < 2) {
        return [...prev, trackPoint];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedImages.length === 2) {
      setShowCompareModal(true);
    }
  };

  const clearSelection = () => {
    setSelectedImages([]);
  };

  const handleBackToDashboard = () => {
    navigate('/', { state: { showDashboard: true } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gov-navy text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gov-saffron rounded-full flex items-center justify-center font-bold text-white">
                ISRO
              </div>
              <div>
                <h1 className="text-lg font-govt font-semibold">Indian Space Research Organisation</h1>
                <p className="text-sm text-blue-200">भारतीय अंतरिक्ष अनुसंधान संगठन</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={decreaseFontSize}
                  size="sm"
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                >
                  A-
                </Button>
                <Button 
                  onClick={increaseFontSize}
                  size="sm"
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                >
                  A+
                </Button>
              </div>
              <Button 
                onClick={handleBackToDashboard}
                className="bg-gov-saffron hover:bg-orange-600 text-white flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Track Details */}
      <div className="container mx-auto py-8 px-4">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-slate-50 to-blue-50 mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Track Details: {track.tcc_track_id}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Basin:</span>
                  <Badge className={`${getBasinColor(track.basin)} font-medium px-3 py-1`}>
                    {track.basin}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-gray-700">Start Time:</span>
                </div>
                <p className="text-gray-600 text-sm">{formatTimestamp(track.start_time)}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="font-semibold text-gray-700">End Time:</span>
                </div>
                <p className="text-gray-600 text-sm">{formatTimestamp(track.end_time)}</p>
              </div>
              <div className="space-y-2">
                <span className="font-semibold text-gray-700">Duration:</span>
                <p className="text-gray-600">{track.total_duration_hours.toFixed(1)} hours</p>
              </div>
              <div className="space-y-2">
                <span className="font-semibold text-gray-700">Max CTH:</span>
                <p className="text-gray-600">{track.max_cth_km.toFixed(1)} km</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-gray-700">Min BT:</span>
                </div>
                <p className="text-gray-600">{track.min_bt_k.toFixed(1)} K</p>
              </div>
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <span className="font-semibold text-gray-700">Coordinates Range:</span>
                <p className="text-gray-600">
                  Latitude: {track.min_lat.toFixed(2)} to {track.max_lat.toFixed(2)} | 
                  Longitude: {track.min_lon.toFixed(2)} to {track.max_lon.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compare Controls */}
        {selectedImages.length > 0 && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-blue-900 font-semibold">
                    Selected Images: {selectedImages.length}/2
                  </span>
                  <Button
                    onClick={clearSelection}
                    variant="outline"
                    size="sm"
                    className="text-blue-700 border-blue-300"
                  >
                    Clear Selection
                  </Button>
                </div>
                <Button
                  onClick={handleCompare}
                  disabled={selectedImages.length !== 2}
                  className="bg-gov-saffron hover:bg-orange-600 text-white"
                >
                  Compare Images ({selectedImages.length})
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Track Points Table */}
        <TrackPointsTable 
          trackPoints={track.track_points} 
          onImageClick={handleImageClick}
          selectedImages={selectedImages}
          onImageSelect={handleImageSelect}
        />
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-7xl max-h-full bg-white rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex">
              <div className="flex-1">
                <img 
                  src={`https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop`}
                  alt={selectedImage.image_filename}
                  className="w-full h-auto object-contain max-h-96"
                />
              </div>
              <div className="w-96 bg-gradient-to-br from-slate-50 to-blue-50 overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Layers className="w-6 h-6" />
                    Image Data
                  </h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Filename:
                    </label>
                    <p className="text-sm font-mono break-all bg-gray-50 p-2 rounded">{selectedImage.image_filename}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      Timestamp:
                    </label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{formatTimestamp(selectedImage.timestamp)}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-red-600" />
                      Location:
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-xs text-gray-600">Latitude:</span>
                        <p className="text-sm font-mono">{selectedImage.centroid_lat.toFixed(4)}°</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-xs text-gray-600">Longitude:</span>
                        <p className="text-sm font-mono">{selectedImage.centroid_lon.toFixed(4)}°</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      Temperature Data:
                    </label>
                    <div className="space-y-2">
                      {[
                        { label: 'Mean BT', value: selectedImage.mean_bt_k.toFixed(2) },
                        { label: 'Min BT', value: selectedImage.min_bt_k.toFixed(2) },
                        { label: 'Median BT', value: selectedImage.median_bt_k.toFixed(2) },
                        { label: 'Std BT', value: selectedImage.std_bt_k.toFixed(2) }
                      ].map(item => (
                        <div key={item.label} className="bg-gray-50 p-2 rounded flex justify-between">
                          <span className="text-xs text-gray-600">{item.label}:</span>
                          <span className="text-sm font-mono">{item.value} K</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <label className="font-semibold text-gray-700 mb-3 block">Physical Properties:</label>
                    <div className="space-y-2">
                      {[
                        { label: 'Pixel Count', value: selectedImage.pixel_count.toLocaleString() },
                        { label: 'Mean Radius', value: `${selectedImage.mean_radius_km.toFixed(2)} km` },
                        { label: 'Max Radius', value: `${selectedImage.max_radius_km.toFixed(2)} km` },
                        { label: 'Mean CTH', value: `${selectedImage.mean_cth_km.toFixed(2)} km` },
                        { label: 'Max CTH', value: `${selectedImage.max_cth_km.toFixed(2)} km` }
                      ].map(item => (
                        <div key={item.label} className="bg-gray-50 p-2 rounded flex justify-between">
                          <span className="text-xs text-gray-600">{item.label}:</span>
                          <span className="text-sm font-mono">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <ImageCompareModal
          images={selectedImages}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
};

export default TrackDetail;
