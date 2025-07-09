
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Building2, Plus, Search, Send, FileText, Calculator } from "lucide-react";

const BillingSystem = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const bills = [
    {
      id: 1,
      tenant: "Alice Wanjiku",
      property: "Riverside Apartments - A1",
      month: "July 2024",
      rent: 35000,
      service: 3500,
      water: 1200,
      electricity: 2800,
      garbage: 500,
      security: 1000,
      total: 44000,
      status: "paid",
      dueDate: "2024-07-05",
      paidDate: "2024-07-01"
    },
    {
      id: 2,
      tenant: "John Kimani",
      property: "Commercial Plaza - Shop 12",
      month: "July 2024",
      rent: 85000,
      service: 8500,
      water: 2500,
      electricity: 15000,
      garbage: 1000,
      security: 2000,
      total: 114000,
      vat: 16320, // 16% VAT on commercial
      grandTotal: 130320,
      status: "paid",
      dueDate: "2024-07-05",
      paidDate: "2024-07-02"
    },
    {
      id: 3,
      tenant: "Mary Atieno",
      property: "Garden Courts - B3",
      month: "July 2024",
      rent: 28000,
      service: 2800,
      water: 900,
      electricity: 2200,
      garbage: 500,
      security: 800,
      total: 35200,
      status: "overdue",
      dueDate: "2024-07-05",
      overdueDays: 4
    },
    {
      id: 4,
      tenant: "Peter Mwangi",
      property: "Office Complex - Floor 2",
      month: "July 2024",
      rent: 120000,
      service: 12000,
      water: 3000,
      electricity: 25000,
      garbage: 1500,
      security: 3000,
      total: 164500,
      vat: 23520,
      grandTotal: 188020,
      status: "pending",
      dueDate: "2024-07-05"
    }
  ];

  const mpesaPayments = [
    {
      id: 1,
      tenant: "Alice Wanjiku",
      amount: 44000,
      phone: "+254712345678",
      status: "completed",
      timestamp: "2024-07-01 14:30",
      transactionId: "QHX8YZ9P2M"
    },
    {
      id: 2,
      tenant: "David Ochieng",
      amount: 55000,
      phone: "+254767890123",
      status: "completed",
      timestamp: "2024-07-01 16:45",
      transactionId: "RT3K8L1N5Q"
    },
    {
      id: 3,
      tenant: "Grace Njeri",
      amount: 45000,
      phone: "+254756789012",
      status: "pending",
      timestamp: "2024-07-02 09:15",
      transactionId: "WM7P4X2Y8K"
    }
  ];

  const filteredBills = bills.filter(bill =>
    bill.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Billing System</h2>
          <p className="text-gray-600">Manage bills, payments, and M-Pesa transactions</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Calculator className="h-4 w-4 mr-2" />
            Generate Bills
          </Button>
          <Button variant="outline">
            <Send className="h-4 w-4 mr-2" />
            Send Reminders
          </Button>
        </div>
      </div>

      <Tabs defaultValue="bills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bills">Bills & Invoices</TabsTrigger>
          <TabsTrigger value="mpesa">M-Pesa Payments</TabsTrigger>
          <TabsTrigger value="reports">Payment Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bills by tenant or property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Bills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBills.map((bill) => (
              <Card key={bill.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{bill.tenant}</CardTitle>
                      <p className="text-sm text-gray-600">{bill.property}</p>
                      <p className="text-sm text-gray-500">{bill.month}</p>
                    </div>
                    <Badge className={getStatusColor(bill.status)}>
                      {bill.status === 'overdue' && bill.overdueDays ? 
                        `Overdue ${bill.overdueDays} days` : 
                        bill.status
                      }
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bill Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rent:</span>
                      <span className="font-medium">{formatKES(bill.rent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Charge:</span>
                      <span className="font-medium">{formatKES(bill.service)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Water:</span>
                      <span className="font-medium">{formatKES(bill.water)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Electricity:</span>
                      <span className="font-medium">{formatKES(bill.electricity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Garbage:</span>
                      <span className="font-medium">{formatKES(bill.garbage)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security:</span>
                      <span className="font-medium">{formatKES(bill.security)}</span>
                    </div>
                    {bill.vat && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT (16%):</span>
                        <span className="font-medium">{formatKES(bill.vat)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        {formatKES(bill.grandTotal || bill.total)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">{new Date(bill.dueDate).toLocaleDateString()}</span>
                    </div>
                    {bill.paidDate && (
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-600">Paid Date:</span>
                        <span className="font-medium text-green-600">{new Date(bill.paidDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                    {bill.status !== 'paid' && (
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Smartphone className="h-4 w-4 mr-1" />
                        M-Pesa
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mpesa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-green-600" />
                <span>M-Pesa Transactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mpesaPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{payment.tenant}</p>
                      <p className="text-sm text-gray-600">{payment.phone}</p>
                      <p className="text-xs text-gray-500">ID: {payment.transactionId}</p>
                    </div>
                    <div className="text-center mr-4">
                      <p className="font-semibold text-gray-900">{formatKES(payment.amount)}</p>
                      <p className="text-xs text-gray-500">{payment.timestamp}</p>
                    </div>
                    <Badge className={getPaymentStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* M-Pesa Integration Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Send M-Pesa Payment Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Tenant Phone Number" />
                <Input placeholder="Amount (KES)" />
              </div>
              <Input placeholder="Bill Reference/Description" />
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Smartphone className="h-4 w-4 mr-2" />
                Send M-Pesa Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Billed:</span>
                    <span className="font-semibold">{formatKES(477540)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Collected:</span>
                    <span className="font-semibold text-green-600">{formatKES(274320)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Outstanding:</span>
                    <span className="font-semibold text-red-600">{formatKES(203220)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">M-Pesa:</span>
                    <span className="font-semibold">{formatKES(144000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Transfer:</span>
                    <span className="font-semibold">{formatKES(130320)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cash:</span>
                    <span className="font-semibold">{formatKES(0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">57%</div>
                  <div className="text-gray-600">This Month</div>
                  <div className="mt-2 text-sm text-gray-500">
                    2 of 4 bills paid
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingSystem;
