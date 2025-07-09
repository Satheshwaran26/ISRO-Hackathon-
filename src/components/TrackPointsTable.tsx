
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

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

interface TrackPointsTableProps {
  trackPoints: TrackPoint[];
  onImageClick?: (trackPoint: TrackPoint) => void;
  selectedImages?: TrackPoint[];
  onImageSelect?: (trackPoint: TrackPoint) => void;
}

const ITEMS_PER_PAGE = 10;

const TrackPointsTable: React.FC<TrackPointsTableProps> = ({ 
  trackPoints, 
  onImageClick, 
  selectedImages = [],
  onImageSelect 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(trackPoints.length / ITEMS_PER_PAGE);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleImageClick = (trackPoint: TrackPoint) => {
    if (onImageClick) {
      onImageClick(trackPoint);
    }
  };

  const isSelected = (trackPoint: TrackPoint) => {
    return selectedImages.some(img => img.image_filename === trackPoint.image_filename);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedTrackPoints = trackPoints.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-blue-900">Track Points Details</h4>
        <div className="text-sm text-blue-700">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, trackPoints.length)} of {trackPoints.length} points
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-blue-100">
              {onImageSelect && <TableHead className="text-blue-900 font-semibold">Select</TableHead>}
              <TableHead className="text-blue-900 font-semibold">Timestamp</TableHead>
              <TableHead className="text-blue-900 font-semibold">Latitude</TableHead>
              <TableHead className="text-blue-900 font-semibold">Longitude</TableHead>
              <TableHead className="text-blue-900 font-semibold">Pixel Count</TableHead>
              <TableHead className="text-blue-900 font-semibold">Mean BT (K)</TableHead>
              <TableHead className="text-blue-900 font-semibold">Min BT (K)</TableHead>
              <TableHead className="text-blue-900 font-semibold">Mean Radius (km)</TableHead>
              <TableHead className="text-blue-900 font-semibold">Max CTH (km)</TableHead>
              <TableHead className="text-blue-900 font-semibold">Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTrackPoints.map((point, index) => (
              <TableRow key={startIndex + index} className="hover:bg-blue-50 transition-colors">
                {onImageSelect && (
                  <TableCell>
                    <Checkbox
                      checked={isSelected(point)}
                      onCheckedChange={() => onImageSelect(point)}
                      disabled={!isSelected(point) && selectedImages.length >= 2}
                    />
                  </TableCell>
                )}
                <TableCell className="font-medium text-gray-800">{formatTimestamp(point.timestamp)}</TableCell>
                <TableCell className="text-gray-700">{point.center_lat.toFixed(2)}</TableCell>
                <TableCell className="text-gray-700">{point.center_lon.toFixed(2)}</TableCell>
                <TableCell className="text-gray-700">{point.pixel_count.toLocaleString()}</TableCell>
                <TableCell className="text-gray-700">{point.mean_tb_k.toFixed(1)}</TableCell>
                <TableCell className="text-gray-700">{point.min_tb_k.toFixed(1)}</TableCell>
                <TableCell className="text-gray-700">{point.mean_radius_km.toFixed(1)}</TableCell>
                <TableCell className="text-gray-700">{point.max_cth_km.toFixed(1)}</TableCell>
                <TableCell className="text-gray-700">
                  {onImageClick ? (
                    <Button
                      onClick={() => handleImageClick(point)}
                      className="bg-blue-500 hover:bg-blue-600 text-white border-0"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  ) : (
                    <span className="text-sm font-mono">{point.image_filename}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-2"
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                  className="w-8 h-8"
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
            className="px-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2"
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackPointsTable;
