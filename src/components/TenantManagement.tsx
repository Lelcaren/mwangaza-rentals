
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, MapPin, Plus, Search, Edit, Eye, MessageSquare } from "lucide-react";

const TenantManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const tenants = [
    {
      id: 1,
      name: "Alice Wanjiku",
      phone: "+254 712 345 678",
      email: "alice.wanjiku@email.com",
      property: "Riverside Apartments",
      unit: "A1",
      rent: 35000,
      deposit: 70000,
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31",
      paymentStatus: "current",
      lastPayment: "2024-07-01"
    },
    {
      id: 2,
      name: "John Kimani",
      phone: "+254 723 456 789",
      email: "john.kimani@email.com",
      property: "Commercial Plaza",
      unit: "Shop 12",
      rent: 85000,
      deposit: 170000,
      leaseStart: "2023-06-01",
      leaseEnd: "2025-05-31",
      paymentStatus: "current",
      lastPayment: "2024-07-01"
    },
    {
      id: 3,
      name: "Mary Atieno",
      phone: "+254 734 567 890",
      email: "mary.atieno@email.com",
      property: "Garden Courts",
      unit: "B3",
      rent: 28000,
      deposit: 56000,
      leaseStart: "2024-03-01",
      leaseEnd: "2025-02-28",
      paymentStatus: "overdue",
      lastPayment: "2024-05-15"
    },
    {
      id: 4,
      name: "Peter Mwangi",
      phone: "+254 745 678 901",
      email: "peter.mwangi@email.com",
      property: "Office Complex",
      unit: "Floor 2",
      rent: 120000,
      deposit: 240000,
      leaseStart: "2023-09-01",
      leaseEnd: "2025-08-31",
      paymentStatus: "current",
      lastPayment: "2024-07-01"
    },
    {
      id: 5,
      name: "Grace Njeri",
      phone: "+254 756 789 012",
      email: "grace.njeri@email.com",
      property: "Sunset Villas",
      unit: "Villa 5",
      rent: 45000,
      deposit: 90000,
      leaseStart: "2024-02-01",
      leaseEnd: "2025-01-31",
      paymentStatus: "pending",
      lastPayment: "2024-06-01"
    },
    {
      id: 6,
      name: "David Ochieng",
      phone: "+254 767 890 123",
      email: "david.ochieng@email.com",
      property: "Tech Hub",
      unit: "Office 8",
      rent: 55000,
      deposit: 110000,
      leaseStart: "2023-11-01",
      leaseEnd: "2025-10-31",
      paymentStatus: "current",
      lastPayment: "2024-07-01"
    }
  ];

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'current':
        return 'Umefuata Tarehe'; // Up to date in Swahili
      case 'overdue':
        return 'Umechelewa';     // Overdue in Swahili
      case 'pending':
        return 'Inasubiri';      // Pending in Swahili
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tenant Management</h2>
          <p className="text-gray-600">Manage tenant information and payment history</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tenants by name, property, or unit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tenant Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tenant.name}</CardTitle>
                    <p className="text-sm text-gray-600">{tenant.property} - {tenant.unit}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(tenant.paymentStatus)}>
                  {getStatusText(tenant.paymentStatus)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{tenant.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 truncate">{tenant.email}</span>
                </div>
              </div>

              {/* Financial Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-sm text-blue-700">Monthly Rent</div>
                  <div className="text-lg font-bold text-blue-800">
                    {formatKES(tenant.rent)}
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="text-sm text-green-700">Deposit</div>
                  <div className="text-lg font-bold text-green-800">
                    {formatKES(tenant.deposit)}
                  </div>
                </div>
              </div>

              {/* Lease Information */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Lease Start:</span>
                    <div className="font-medium">{new Date(tenant.leaseStart).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Lease End:</span>
                    <div className="font-medium">{new Date(tenant.leaseEnd).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600 text-sm">Last Payment:</span>
                  <div className="font-medium text-sm">{new Date(tenant.lastPayment).toLocaleDateString()}</div>
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
                <Button variant="outline" size="sm" className="flex-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  SMS
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Tenant Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{tenants.length}</div>
              <div className="text-sm text-gray-600">Total Tenants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {tenants.filter(t => t.paymentStatus === 'current').length}
              </div>
              <div className="text-sm text-gray-600">Current Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {tenants.filter(t => t.paymentStatus === 'overdue').length}
              </div>
              <div className="text-sm text-gray-600">Overdue Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatKES(tenants.reduce((sum, tenant) => sum + tenant.rent, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Monthly Rent</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantManagement;
