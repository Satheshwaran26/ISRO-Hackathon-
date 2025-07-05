
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, Thermometer, ExternalLink } from 'lucide-react';
import { trackData } from '../data/trackData';

interface Track {
  tcc_track_id: string;
  basin: string;
  start_time: string;
  end_time: string;
  total_duration_hours: number;
  max_cth_km: number;
  min_bt_k: number;
  mean_bt_k: number;
  min_lat: number;
  max_lat: number;
  min_lon: number;
  max_lon: number;
  track_points: any[];
}

const TrackDataTable: React.FC = () => {
  const navigate = useNavigate();

  const handleViewMore = (trackId: string) => {
    navigate(`/track/${trackId}`);
  };

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

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-r from-slate-50 to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Tropical Cyclone Tracking Data
          </CardTitle>
          <p className="text-blue-100 mt-2">
            Comprehensive tracking data for tropical cyclone systems with detailed meteorological observations
          </p>
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
                  <TableHead className="text-gray-900 font-bold">Max CTH (km)</TableHead>
                  <TableHead className="text-gray-900 font-bold">Min BT (K)</TableHead>
                  <TableHead className="text-gray-900 font-bold">Coordinates</TableHead>
                  <TableHead className="text-gray-900 font-bold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trackData.tracks.map((track: Track) => (
                  <TableRow key={track.tcc_track_id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-200">
                    <TableCell className="font-mono text-sm font-semibold text-gray-900">
                      {track.tcc_track_id}
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
                      {track.total_duration_hours.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-gray-700 font-semibold">
                      {track.max_cth_km.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{track.min_bt_k.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 text-sm">
                      <div className="space-y-1">
                        <div>Lat: {track.min_lat.toFixed(2)} to {track.max_lat.toFixed(2)}</div>
                        <div>Lon: {track.min_lon.toFixed(2)} to {track.max_lon.toFixed(2)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        onClick={() => handleViewMore(track.tcc_track_id)}
                        className="bg-gov-saffron hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackDataTable;
