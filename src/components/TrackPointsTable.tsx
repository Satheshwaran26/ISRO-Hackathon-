
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Eye } from 'lucide-react';

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

interface TrackPointsTableProps {
  trackPoints: TrackPoint[];
  onImageClick?: (trackPoint: TrackPoint) => void;
  selectedImages?: TrackPoint[];
  onImageSelect?: (trackPoint: TrackPoint) => void;
}

const TrackPointsTable: React.FC<TrackPointsTableProps> = ({ 
  trackPoints, 
  onImageClick, 
  selectedImages = [],
  onImageSelect 
}) => {
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

  // Show only first 2 track points
  const displayedTrackPoints = trackPoints.slice(0, 2);

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <h4 className="text-lg font-semibold text-blue-900 mb-3">Track Points Details (First 2 Points)</h4>
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
              <TableRow key={index} className="hover:bg-blue-50 transition-colors">
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
                <TableCell className="text-gray-700">{point.centroid_lat.toFixed(2)}</TableCell>
                <TableCell className="text-gray-700">{point.centroid_lon.toFixed(2)}</TableCell>
                <TableCell className="text-gray-700">{point.pixel_count.toLocaleString()}</TableCell>
                <TableCell className="text-gray-700">{point.mean_bt_k.toFixed(1)}</TableCell>
                <TableCell className="text-gray-700">{point.min_bt_k.toFixed(1)}</TableCell>
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
    </div>
  );
};

export default TrackPointsTable;
