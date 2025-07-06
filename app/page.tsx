'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, Copy, ExternalLink, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FilterValue {
  startTime: string;
  endTime: string;
  dates: string[];
  facilityTypeIds: string;
  boroughIds: string;
}

interface SearchParams {
  filter: {
    isCollapsed: boolean;
    value: FilterValue;
  };
  search: string;
  sortable: {
    isOrderAsc: boolean;
    column: string;
  };
}

const facilityTypes = [
  { id: '175', name: 'Tennis Courts', icon: '🎾' },
  { id: '114', name: 'Swimming Pools', icon: '🏊' },
  { id: '120', name: 'Basketball Courts', icon: '🏀' },
  { id: '130', name: 'Soccer Fields', icon: '⚽' },
  { id: '140', name: 'Hockey Rinks', icon: '🏒' },
  { id: '150', name: 'Baseball Fields', icon: '⚾' },
  { id: '160', name: 'Volleyball Courts', icon: '🏐' },
  { id: '170', name: 'Gymnasiums', icon: '🤸' },
  { id: '180', name: 'Type de plateau', icon: '🏟️' },
  { id: '181', name: 'Aire act libre', icon: '🏃' },
  { id: '182', name: 'Aire de patinage', icon: '⛸️' },
  { id: '183', name: 'Gymnase', icon: '🏋️' },
  { id: '184', name: 'Installation', icon: '🏗️' },
  { id: '185', name: 'Palestre de gym', icon: '🤸‍♀️' },
  { id: '186', name: 'Piste et pelouse', icon: '🏃‍♂️' },
  { id: '187', name: 'Salle d\'étude', icon: '📚' },
  { id: '188', name: 'Salle poly/act', icon: '🎭' },
  { id: '189', name: 'Soccer à 11 int', icon: '⚽' },
  { id: '190', name: 'Soccer à 7 extérieur', icon: '🌿' },
  { id: '191', name: 'Soccer à 7 intérieur', icon: '🏠' },
  { id: '192', name: 'Tennis de table', icon: '🏓' },
  { id: '193', name: 'Terrain de badminton', icon: '🏸' },
  { id: '194', name: 'Terrain tennis ext', icon: '🎾' },
  { id: '195', name: 'Terrain tennis int', icon: '🎾' },
  { id: '196', name: 'Volley-ball plage', icon: '🏖️' },
];

const boroughs = [
  { id: '1', name: 'Ville-Marie', color: 'bg-blue-100' },
  { id: '2', name: 'Plateau-Mont-Royal', color: 'bg-green-100' },
  { id: '3', name: 'Rosemont-La Petite-Patrie', color: 'bg-purple-100' },
  { id: '4', name: 'Outremont', color: 'bg-orange-100' },
  { id: '5', name: 'Côte-des-Neiges-Notre-Dame-de-Grâce', color: 'bg-pink-100' },
  { id: '6', name: 'Verdun', color: 'bg-yellow-100' },
  { id: '7', name: 'Sud-Ouest', color: 'bg-red-100' },
  { id: '8', name: 'LaSalle', color: 'bg-indigo-100' },
  { id: '9', name: 'Lachine', color: 'bg-teal-100' },
  { id: '11', name: 'Ahuntsic-Cartierville', color: 'bg-cyan-100' },
  { id: '14', name: 'Mercier-Hochelaga-Maisonneuve', color: 'bg-lime-100' },
  { id: '15', name: 'Villeray-Saint-Michel-Parc-Extension', color: 'bg-amber-100' },
  { id: '16', name: 'Anjou', color: 'bg-emerald-100' },
  { id: '17', name: 'Montréal-Nord', color: 'bg-violet-100' },
  { id: '19', name: 'Pierrefonds-Roxboro', color: 'bg-rose-100' },
];

const sortColumns = [
  { value: 'facility.name', label: 'Facility Name' },
  { value: 'facility.address', label: 'Address' },
  { value: 'facility.borough', label: 'Borough' },
  { value: 'activity.startTime', label: 'Start Time' },
  { value: 'activity.endTime', label: 'End Time' },
];

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    filter: {
      isCollapsed: false,
      value: {
        startTime: '2025-07-05T18:00:00.000-04:00',
        endTime: '2025-07-05T22:45:00.000-04:00',
        dates: ['2025-07-06T00:00:00.000-04:00'],
        facilityTypeIds: '175,114',
        boroughIds: '3,9,2,19,7,16,6,15,11,5,17,14,1,8,4',
      },
    },
    search: 'tennis',
    sortable: {
      isOrderAsc: true,
      column: 'facility.name',
    },
  });

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(['175', '114']);
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>(['3', '9', '2', '19', '7', '16', '6', '15', '11', '5', '17', '14', '1', '8', '4']);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const updateSearchParams = (updates: Partial<SearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...updates,
      filter: {
        ...prev.filter,
        ...updates.filter,
      },
    }));
  };

  const handleFacilityToggle = (facilityId: string) => {
    const newSelected = selectedFacilities.includes(facilityId)
      ? selectedFacilities.filter(id => id !== facilityId)
      : [...selectedFacilities, facilityId];
    
    setSelectedFacilities(newSelected);
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          facilityTypeIds: newSelected.join(','),
        },
      },
    });
  };

  const handleBoroughToggle = (boroughId: string) => {
    const newSelected = selectedBoroughs.includes(boroughId)
      ? selectedBoroughs.filter(id => id !== boroughId)
      : [...selectedBoroughs, boroughId];
    
    setSelectedBoroughs(newSelected);
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          boroughIds: newSelected.join(','),
        },
      },
    });
  };

  const generateUrl = () => {
    const baseUrl = 'https://loisirs.montreal.ca/IC3/#/U6510/search/';
    const encodedParams = encodeURIComponent(JSON.stringify(searchParams));
    return `${baseUrl}?searchParam=${encodedParams}&hasBoroughFilter=true`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const openInNewTab = () => {
    window.open(generatedUrl, '_blank');
  };

  useEffect(() => {
    setGeneratedUrl(generateUrl());
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Montreal Leisure Activities
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Visual URL Builder for Activity Search
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Build custom search URLs for Montreal's leisure facilities</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Filters */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Term */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Query
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Enter keywords to search for activities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Input
                  type="text"
                  placeholder="e.g., tennis, swimming, basketball..."
                  value={searchParams.search}
                  onChange={(e) => updateSearchParams({ search: e.target.value })}
                  className="text-lg"
                />
              </CardContent>
            </Card>

            {/* Time Range */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Time Range
                </CardTitle>
                <CardDescription className="text-green-100">
                  Set the time window for activities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">
                      Start Time
                    </Label>
                    <Input
                      id="startTime"
                      type="datetime-local"
                      value={searchParams.filter.value.startTime.slice(0, 16)}
                      onChange={(e) => updateSearchParams({
                        filter: {
                          ...searchParams.filter,
                          value: {
                            ...searchParams.filter.value,
                            startTime: e.target.value + ':00.000-04:00',
                          },
                        },
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime" className="text-sm font-medium text-gray-700">
                      End Time
                    </Label>
                    <Input
                      id="endTime"
                      type="datetime-local"
                      value={searchParams.filter.value.endTime.slice(0, 16)}
                      onChange={(e) => updateSearchParams({
                        filter: {
                          ...searchParams.filter,
                          value: {
                            ...searchParams.filter.value,
                            endTime: e.target.value + ':00.000-04:00',
                          },
                        },
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Activity Date
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Choose the date for activities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Input
                  type="date"
                  value={searchParams.filter.value.dates[0]?.slice(0, 10) || ''}
                  onChange={(e) => updateSearchParams({
                    filter: {
                      ...searchParams.filter,
                      value: {
                        ...searchParams.filter.value,
                        dates: [e.target.value + 'T00:00:00.000-04:00'],
                      },
                    },
                  })}
                  className="text-lg"
                />
              </CardContent>
            </Card>

            {/* Facility Types */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Facility Types
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Select the types of facilities you're interested in
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {facilityTypes.map((facility) => (
                    <div key={facility.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id={facility.id}
                        checked={selectedFacilities.includes(facility.id)}
                        onCheckedChange={() => handleFacilityToggle(facility.id)}
                      />
                      <Label
                        htmlFor={facility.id}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <span className="text-lg">{facility.icon}</span>
                        <span className="text-sm font-medium">{facility.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedFacilities.map((id) => {
                    const facility = facilityTypes.find(f => f.id === id);
                    return facility ? (
                      <Badge key={id} variant="secondary" className="bg-orange-100 text-orange-800">
                        {facility.icon} {facility.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Boroughs */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Montreal Boroughs
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Choose which boroughs to include in your search
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {boroughs.map((borough) => (
                    <div key={borough.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <Checkbox
                        id={borough.id}
                        checked={selectedBoroughs.includes(borough.id)}
                        onCheckedChange={() => handleBoroughToggle(borough.id)}
                      />
                      <Label
                        htmlFor={borough.id}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <div className={`w-3 h-3 rounded-full ${borough.color}`} />
                        <span className="text-sm font-medium">{borough.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Selected: {selectedBoroughs.length} of {boroughs.length} boroughs
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedBoroughs.slice(0, 8).map((id) => {
                      const borough = boroughs.find(b => b.id === id);
                      return borough ? (
                        <Badge key={id} variant="outline" className="text-xs">
                          {borough.name}
                        </Badge>
                      ) : null;
                    })}
                    {selectedBoroughs.length > 8 && (
                      <Badge variant="outline" className="text-xs">
                        +{selectedBoroughs.length - 8} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sorting */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  {searchParams.sortable.isOrderAsc ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                  Sort Options
                </CardTitle>
                <CardDescription className="text-teal-100">
                  Configure how results should be sorted
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sortColumn" className="text-sm font-medium text-gray-700">
                      Sort by
                    </Label>
                    <Select
                      value={searchParams.sortable.column}
                      onValueChange={(value) => updateSearchParams({
                        sortable: {
                          ...searchParams.sortable,
                          column: value,
                        },
                      })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortColumns.map((col) => (
                          <SelectItem key={col.value} value={col.value}>
                            {col.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
                      Order
                    </Label>
                    <Select
                      value={searchParams.sortable.isOrderAsc ? 'asc' : 'desc'}
                      onValueChange={(value) => updateSearchParams({
                        sortable: {
                          ...searchParams.sortable,
                          isOrderAsc: value === 'asc',
                        },
                      })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - URL Output */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-4">
              <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Generated URL
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your custom search URL is ready
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="generatedUrl" className="text-sm font-medium text-gray-700">
                      URL
                    </Label>
                    <Textarea
                      id="generatedUrl"
                      value={generatedUrl}
                      readOnly
                      className="mt-1 text-xs font-mono resize-none"
                      rows={8}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={copyToClipboard}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      disabled={!generatedUrl}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy URL'}
                    </Button>

                    <Button
                      onClick={openInNewTab}
                      variant="outline"
                      className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300"
                      disabled={!generatedUrl}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </div>

                  {copied && (
                    <Alert className="border-green-200 bg-green-50">
                      <AlertDescription className="text-green-800">
                        URL copied to clipboard successfully!
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Current Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Search:</span>
                      <span className="font-medium">{searchParams.search || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Facilities:</span>
                      <span className="font-medium">{selectedFacilities.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Boroughs:</span>
                      <span className="font-medium">{selectedBoroughs.length} selected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sort:</span>
                      <span className="font-medium">
                        {sortColumns.find(c => c.value === searchParams.sortable.column)?.label} 
                        {searchParams.sortable.isOrderAsc ? ' ↑' : ' ↓'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}