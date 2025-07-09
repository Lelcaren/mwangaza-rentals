
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, DollarSign, Calendar, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Reports = () => {
  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const monthlyData = [
    { month: "Jan", income: 4200000, expenses: 800000 },
    { month: "Feb", income: 4350000, expenses: 750000 },
    { month: "Mar", income: 4500000, expenses: 900000 },
    { month: "Apr", income: 4650000, expenses: 820000 },
    { month: "May", income: 4800000, expenses: 780000 },
    { month: "Jun", income: 4750000, expenses: 850000 },
    { month: "Jul", income: 4900000, expenses: 800000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Financial reports and property performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue (YTD)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatKES(32150000)}</div>
            <p className="text-xs text-green-600 mt-1">+15.2% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Monthly Income
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatKES(4900000)}</div>
            <p className="text-xs text-green-600 mt-1">+3.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Collection Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <p className="text-xs text-green-600 mt-1">Above target (90%)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Occupancy Rate
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <p className="text-xs text-green-600 mt-1">147 of 156 units</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses (2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 text-sm text-gray-600">{data.month}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Income</span>
                      <span className="font-medium">{formatKES(data.income)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expenses</span>
                      <span className="font-medium">{formatKES(data.expenses)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(data.expenses / data.income) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Property Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Commercial Plaza", revenue: 1250000, occupancy: 87, trend: "up" },
                { name: "Tech Hub", revenue: 900000, occupancy: 90, trend: "up" },
                { name: "Riverside Apartments", revenue: 840000, occupancy: 92, trend: "stable" },
                { name: "Garden Courts", revenue: 720000, occupancy: 89, trend: "up" },
                { name: "Office Complex", revenue: 560000, occupancy: 88, trend: "down" },
                { name: "Sunset Villas", revenue: 480000, occupancy: 83, trend: "down" }
              ].map((property, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{property.name}</p>
                    <p className="text-sm text-gray-600">{property.occupancy}% occupied</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatKES(property.revenue)}</p>
                    <div className={`text-xs ${
                      property.trend === 'up' ? 'text-green-600' : 
                      property.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {property.trend === 'up' ? '↗ Trending up' : 
                       property.trend === 'down' ? '↘ Trending down' : '→ Stable'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax & Compliance Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>VAT Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">VAT Collected:</span>
                <span className="font-semibold">{formatKES(784000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT Paid:</span>
                <span className="font-semibold">{formatKES(128000)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Net VAT Due:</span>
                <span className="text-green-600">{formatKES(656000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withholding Tax</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Commercial Rent:</span>
                <span className="font-semibold">{formatKES(2795000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WHT @ 10%:</span>
                <span className="font-semibold">{formatKES(279500)}</span>
              </div>
              <div className="text-xs text-gray-500">
                Based on commercial properties only
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outstanding Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">0-30 days:</span>
                <span className="font-semibold">{formatKES(85000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">31-60 days:</span>
                <span className="font-semibold text-yellow-600">{formatKES(45000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">60+ days:</span>
                <span className="font-semibold text-red-600">{formatKES(73000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
