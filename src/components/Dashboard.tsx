
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, CreditCard, TrendingUp, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";

const Dashboard = () => {
  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: "Total Properties",
      value: "12",
      icon: Building,
      change: "+2 this month",
      changeType: "positive",
      trend: 16.7
    },
    {
      title: "Active Tenants",
      value: "147",
      icon: Users,
      change: "94% occupancy",
      changeType: "positive",
      trend: 5.2
    },
    {
      title: "Monthly Revenue",
      value: formatKES(2450000),
      icon: CreditCard,
      change: "+12% from last month",
      changeType: "positive",
      trend: 12.0
    },
    {
      title: "Outstanding Balance",
      value: formatKES(180000),
      icon: AlertTriangle,
      change: "15 overdue payments",
      changeType: "negative",
      trend: -8.1
    }
  ];

  const recentPayments = [
    { tenant: "Alice Wanjiku", property: "Riverside Apartments - A1", amount: 35000, method: "M-Pesa", status: "completed", time: "2 hours ago" },
    { tenant: "John Kimani", property: "Commercial Plaza - Shop 12", amount: 85000, method: "Bank Transfer", status: "completed", time: "5 hours ago" },
    { tenant: "Mary Atieno", property: "Garden Courts - B3", amount: 28000, method: "M-Pesa", status: "pending", time: "1 day ago" },
    { tenant: "Peter Mwangi", property: "Office Complex - Floor 2", amount: 120000, method: "Bank Transfer", status: "completed", time: "2 days ago" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.title}
              </CardTitle>
              <div className="relative">
                <stat.icon className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors" />
                <div className="absolute -inset-2 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-medium flex items-center gap-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Enhanced Recent Payments */}
        <Card className="xl:col-span-2 border-0 shadow-lg bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <span>Recent Payments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((payment, index) => (
                <div key={index} className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-all duration-300 hover:shadow-md border border-border/30">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-foreground truncate pr-2">{payment.tenant}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{payment.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-1">{payment.property}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-md bg-secondary/80 text-secondary-foreground">
                        {payment.method}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-bold text-lg text-foreground">{formatKES(payment.amount)}</p>
                    <div className="flex items-center justify-end space-x-1 mt-1">
                      {payment.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className={`text-xs font-medium capitalize ${
                        payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-4 px-4 rounded-xl hover:from-primary/90 hover:to-primary transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <span>Send M-Pesa Reminder</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button className="w-full border-2 border-primary/20 text-primary py-4 px-4 rounded-xl hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 font-semibold transform hover:-translate-y-0.5">
              Generate Bills
            </button>
            <button className="w-full border-2 border-border text-foreground py-4 px-4 rounded-xl hover:bg-muted/50 hover:border-border/60 transition-all duration-300 font-semibold transform hover:-translate-y-0.5">
              View Reports
            </button>
            <button className="w-full border-2 border-border text-foreground py-4 px-4 rounded-xl hover:bg-muted/50 hover:border-border/60 transition-all duration-300 font-semibold transform hover:-translate-y-0.5">
              Send Notices
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Property Overview */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/90">
        <CardHeader>
          <CardTitle className="text-xl">Property Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="group text-center p-6 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl border border-green-200/50 dark:border-green-800/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative mb-4">
                <Building className="h-10 w-10 text-green-600 mx-auto" />
                <div className="absolute -inset-3 rounded-full bg-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-1">8</p>
              <p className="text-sm font-medium text-green-700 dark:text-green-400">Residential Properties</p>
            </div>
            <div className="group text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative mb-4">
                <Building className="h-10 w-10 text-blue-600 mx-auto" />
                <div className="absolute -inset-3 rounded-full bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-1">4</p>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Commercial Properties</p>
            </div>
            <div className="group text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-2xl border border-purple-200/50 dark:border-purple-800/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative mb-4">
                <Users className="h-10 w-10 text-purple-600 mx-auto" />
                <div className="absolute -inset-3 rounded-full bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-1">156</p>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-400">Total Units</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
