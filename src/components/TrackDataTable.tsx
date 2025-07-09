import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, Thermometer, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackData } from '../data/trackData';

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

interface Track {
  tcc_id: string;
  basin: string;
  start_time: string;
  end_time: string;
  total_duration_hours: number;
  track_points: TrackPoint[];
}

const ITEMS_PER_PAGE = 15;

const TrackDataTable: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(trackData.tracks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedTracks = trackData.tracks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleViewMore = (trackId: string) => {
    navigate(`/track/${trackId}`);
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      // Parse DD-MM-YYYY HH:mm format
      const [datePart, timePart] = timestamp.split(' ');
      const [day, month, year] = datePart.split('-');
      const [hour, minute] = timePart.split(':');
      
      const date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute)
      );

      if (!isNaN(date.getTime())) {
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }

      return timestamp; // Return original if parsing fails
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return timestamp; // Return original on error
    }
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

  const handleDownload = (format: 'netcdf' | 'hdf5' | 'csv') => {
    let filename: string;
    let filePath: string;

    switch (format) {
      case 'netcdf':
        filename = 'tcc_tracked_output.nc';
        filePath = '/src/assets/img/tcc_tracked_output.nc';
        break;
      case 'hdf5':
        filename = 'tcc_tracked_output.h5';
        filePath = '/src/assets/img/tcc_tracked_output.h5';
        break;
      case 'csv':
        filename = 'tcc_tracked_output.csv';
        filePath = '/src/assets/img/tcc_tracked_output.csv';
        break;
    }

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-r from-slate-50 to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Tropical Cyclone Data Dashboard
              </CardTitle>
              <p className="text-blue-100 mt-2">
                Comprehensive tracking data for tropical cyclone systems with detailed meteorological observations
              </p>
              <p className="text-blue-100 mt-1 font-medium">
                Data Coverage: November 2015
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => handleDownload('netcdf')}
                className="bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                NetCDF
              </Button>
              <Button 
                onClick={() => handleDownload('hdf5')}
                className="bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                HDF5
              </Button>
              <Button 
                onClick={() => handleDownload('csv')}
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                CSV
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-blue-100 text-sm">
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, trackData.tracks.length)} of {trackData.tracks.length} tracks
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-blue-200">
                  <TableHead className="text-gray-900 font-bold">Track ID</TableHead>
                  <TableHead className="text-gray-900 font-bold">Basin</TableHead>
                  <TableHead className="text-gray-900 font-bold">Start Time</TableHead>
                  <TableHead className="text-gray-900 font-bold">End Time</TableHead>
                  <TableHead className="text-gray-900 font-bold">Duration (hrs)</TableHead>
                  <TableHead className="text-gray-900 font-bold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedTracks.map((track: Track) => {
                  const bounds = getLatLonBounds(track.track_points);
                  const maxCthKm = getMaxCthKm(track.track_points);
                  const minBtK = getMinBtK(track.track_points);
                  
                  return (
                    <TableRow key={track.tcc_id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-200">
                      <TableCell className="font-mono text-sm font-semibold text-gray-900">
                        {track.tcc_id}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getBasinColor(track.basin)} font-medium px-3 py-1`}>
                          {track.basin}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{formatTimestamp(track.start_time)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-red-500" />
                          <span className="text-sm">{formatTimestamp(track.end_time)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700 font-semibold">
                        {track.total_duration_hours?.toFixed(1) || 'N/A'}
                      </TableCell>

                      <TableCell className="text-center">
                        <Button 
                          onClick={() => handleViewMore(track.tcc_id)}
                          className="bg-gov-saffron hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNum = totalPages - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(pageNum)}
                      className={`w-9 h-9 ${
                        currentPage === pageNum 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackDataTable;
