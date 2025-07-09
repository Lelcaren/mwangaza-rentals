
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Users, Plus, Search, Edit, Eye } from "lucide-react";

const PropertyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const properties = [
    {
      id: 1,
      name: "Riverside Apartments",
      type: "Residential",
      address: "Westlands, Nairobi",
      units: 24,
      occupied: 22,
      monthlyRevenue: 840000,
      status: "active"
    },
    {
      id: 2,
      name: "Commercial Plaza",
      type: "Commercial",
      address: "CBD, Nairobi",
      units: 15,
      occupied: 13,
      monthlyRevenue: 1250000,
      status: "active"
    },
    {
      id: 3,
      name: "Garden Courts",
      type: "Residential",
      address: "Karen, Nairobi",
      units: 18,
      occupied: 16,
      monthlyRevenue: 720000,
      status: "active"
    },
    {
      id: 4,
      name: "Office Complex",
      type: "Commercial",
      address: "Upper Hill, Nairobi",
      units: 8,
      occupied: 7,
      monthlyRevenue: 560000,
      status: "active"
    },
    {
      id: 5,
      name: "Sunset Villas",
      type: "Residential",
      address: "Kileleshwa, Nairobi",
      units: 12,
      occupied: 10,
      monthlyRevenue: 480000,
      status: "maintenance"
    },
    {
      id: 6,
      name: "Tech Hub",
      type: "Commercial",
      address: "Kilimani, Nairobi",
      units: 20,
      occupied: 18,
      monthlyRevenue: 900000,
      status: "active"
    }
  ];

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupancyRate = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Management</h2>
          <p className="text-gray-600">Manage your properties and track performance</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search properties by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">{property.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(property.status)}>
                  {property.status}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {property.address}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Property Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Type</div>
                  <div className="font-semibold text-gray-900">{property.type}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Units</div>
                  <div className="font-semibold text-gray-900">{property.units}</div>
                </div>
              </div>

              {/* Occupancy */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Occupancy</span>
                  <span className="text-sm font-semibold">
                    {property.occupied}/{property.units} ({getOccupancyRate(property.occupied, property.units)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getOccupancyRate(property.occupied, property.units)}%` }}
                  ></div>
                </div>
              </div>

              {/* Revenue */}
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-700">Monthly Revenue</div>
                <div className="text-lg font-bold text-green-800">
                  {formatKES(property.monthlyRevenue)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="h-4 w-4 mr-1" />
                  Tenants
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
              <div className="text-sm text-gray-600">Total Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {properties.reduce((sum, prop) => sum + prop.units, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Units</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  (properties.reduce((sum, prop) => sum + prop.occupied, 0) /
                    properties.reduce((sum, prop) => sum + prop.units, 0)) * 100
                )}%
              </div>
              <div className="text-sm text-gray-600">Overall Occupancy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatKES(properties.reduce((sum, prop) => sum + prop.monthlyRevenue, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyManagement;
