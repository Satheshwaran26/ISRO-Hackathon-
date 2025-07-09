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

const TrackDetail = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<TrackPoint | null>(null);
  const [selectedImages, setSelectedImages] = useState<TrackPoint[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const { increaseFontSize, decreaseFontSize, fontSize } = useFontSize();
  const imageMap = import.meta.glob('/src/assets/img/*', { eager: true });


  // Helper functions to calculate aggregated values from track points
  const getMaxCthKm = (trackPoints: TrackPoint[]) => {
    if (!trackPoints || trackPoints.length === 0) return 0;
    return Math.max(...trackPoints.map(point => point.max_cth_km || 0));
  };

  const getMinBtK = (trackPoints: TrackPoint[]) => {
    if (!trackPoints || trackPoints.length === 0) return 0;
    return Math.min(...trackPoints.map(point => point.min_tb_k || Infinity));
  };

  const getLatLonBounds = (trackPoints: TrackPoint[]) => {
    if (!trackPoints || trackPoints.length === 0) {
      return { min_lat: 0, max_lat: 0, min_lon: 0, max_lon: 0 };
    }
    
    const lats = trackPoints.map(point => point.center_lat);
    const lons = trackPoints.map(point => point.center_lon);
    
    return {
      min_lat: Math.min(...lats),
      max_lat: Math.max(...lats),
      min_lon: Math.min(...lons),
      max_lon: Math.max(...lons)
    };
  };

  const track = trackData.tracks.find(t => t.tcc_id === trackId);

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

  const NavBar = () => (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleBackToDashboard}
              variant="ghost"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Button>
            <span className="text-2xl font-poppins font-bold text-blue-600">
              Team Lava
            </span>
              </div>

          <div className="flex items-center space-x-8">
            {/* Font Size Controls */}
            <div className="flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2">
                <Button 
                  onClick={decreaseFontSize}
                variant="ghost"
                className="hover:bg-blue-100 text-blue-600 font-medium w-8 h-8 rounded-full p-0"
                  disabled={fontSize === "xs"}
                >
                  A-
                </Button>
              <span className="text-blue-600 font-medium px-2">A</span>
                <Button 
                  onClick={increaseFontSize}
                variant="ghost"
                className="hover:bg-blue-100 text-blue-600 font-medium w-8 h-8 rounded-full p-0"
                  disabled={fontSize === "2xl"}
                >
                  A+
              </Button>
            </div>
            </div>
          </div>
        </div>
      </nav>
  );

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Adjust top padding to account for fixed navbar */}
      <div className="pt-24">
      {/* Track Details Section */}
      <div className="container mx-auto py-12 px-6">
        <Card className="shadow-xl border-none rounded-2xl overflow-hidden bg-white mb-8">
          <CardHeader className="bg-blue-600 text-white p-8">
            <CardTitle className="text-3xl font-bold flex items-center gap-3 font-govt">
              <MapPin className="w-8 h-8" />
              Track Details: {track.tcc_id}
            </CardTitle>
            <p className="text-blue-100 mt-2 text-lg">Tropical Cyclone Tracking System</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 text-lg">Basin</span>
                </div>
                <Badge className={`${getBasinColor(track.basin)} text-lg font-medium px-4 py-2`}>
                  {track.basin}
                </Badge>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 text-lg">Start Time</span>
                </div>
                <p className="text-gray-600 text-lg">{formatTimestamp(track.start_time)}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 text-lg">End Time</span>
                </div>
                <p className="text-gray-600 text-lg">{formatTimestamp(track.end_time)}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 text-lg">Duration</span>
                </div>
                <p className="text-gray-600 text-lg">{track.total_duration_hours.toFixed(1)} hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compare Controls */}
        {selectedImages.length > 0 && (
          <Card className="mb-8 bg-blue-50 border-2 border-blue-200 rounded-xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-blue-900 font-semibold text-lg">
                    Selected Images: {selectedImages.length}/2
                  </span>
                  <Button
                    onClick={clearSelection}
                    variant="outline"
                    size="lg"
                    className="text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    Clear Selection
                  </Button>
                </div>
                <Button
                  onClick={handleCompare}
                  disabled={selectedImages.length !== 2}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg shadow-md"
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
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-8"
          onClick={closeImageModal}
        >
          <div className="relative w-full max-w-[90vw] max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl" 
               onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col lg:flex-row h-full">
              {/* Larger Image Section */}
              <div className="flex-1 bg-black flex items-center justify-center p-4">
                <img 
                  src={(imageMap[`/src/assets/img/${selectedImage.image_filename}`] as { default: string })?.default}
                  alt={selectedImage.image_filename}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>

              {/* Data Section */}
              <div className="w-full lg:w-[400px] bg-white overflow-y-auto">
                <div className="sticky top-0 bg-blue-600 text-white p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Layers className="w-7 h-7" />
                    Image Analysis
                  </h3>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Filename Section */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <label className="font-semibold text-blue-900 flex items-center gap-2 mb-3 text-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      File Information
                    </label>
                    <p className="text-sm font-mono break-all bg-white p-3 rounded-lg shadow-inner">
                      {selectedImage.image_filename}
                    </p>
                  </div>
                  
                  {/* Timestamp Section */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <label className="font-semibold text-blue-900 flex items-center gap-2 mb-3 text-lg">
                      <Clock className="w-5 h-5 text-green-600" />
                      Time Data
                    </label>
                    <p className="text-base bg-white p-3 rounded-lg shadow-inner">
                      {formatTimestamp(selectedImage.timestamp)}
                    </p>
                  </div>
                  
                  {/* Location Section */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <label className="font-semibold text-blue-900 flex items-center gap-2 mb-3 text-lg">
                      <MapPin className="w-5 h-5 text-red-600" />
                      Location Data
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-inner">
                        <span className="text-sm text-gray-600 block mb-1">Latitude</span>
                        <p className="text-base font-mono text-blue-900">{selectedImage.center_lat.toFixed(4)}°</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-inner">
                        <span className="text-sm text-gray-600 block mb-1">Longitude</span>
                        <p className="text-base font-mono text-blue-900">{selectedImage.center_lon.toFixed(4)}°</p>
                      </div>
                    </div>
                  </div>

                  {/* Temperature Data */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <label className="font-semibold text-blue-900 flex items-center gap-2 mb-3 text-lg">
                      <Thermometer className="w-5 h-5 text-orange-600" />
                      Temperature Analysis
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Mean BT', value: selectedImage.mean_tb_k.toFixed(2) },
                        { label: 'Min BT', value: selectedImage.min_tb_k.toFixed(2) },
                        { label: 'Median BT', value: selectedImage.median_tb_k.toFixed(2) },
                        { label: 'Std BT', value: selectedImage.std_tb_k.toFixed(2) }
                      ].map(item => (
                        <div key={item.label} className="bg-white p-3 rounded-lg shadow-inner">
                          <span className="text-sm text-gray-600 block mb-1">{item.label}</span>
                          <span className="text-base font-mono text-blue-900">{item.value} K</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Physical Properties */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <label className="font-semibold text-blue-900 mb-3 block text-lg">Physical Properties</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Pixel Count', value: selectedImage.pixel_count.toLocaleString() },
                        { label: 'Mean Radius', value: `${selectedImage.mean_radius_km.toFixed(2)} km` },
                        { label: 'Max Radius', value: `${selectedImage.max_radius_km.toFixed(2)} km` },
                        { label: 'Mean CTH', value: `${selectedImage.mean_cth_km.toFixed(2)} km` },
                        { label: 'Max CTH', value: `${selectedImage.max_cth_km.toFixed(2)} km` }
                      ].map(item => (
                        <div key={item.label} className="bg-white p-3 rounded-lg shadow-inner">
                          <span className="text-sm text-gray-600 block mb-1">{item.label}</span>
                          <span className="text-base font-mono text-blue-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <Button
              onClick={closeImageModal}
              className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
            >
              <X className="w-6 h-6" />
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
    </div>
  );
};

export default TrackDetail;
