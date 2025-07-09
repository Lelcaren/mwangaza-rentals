
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, MessageSquare, Mail, Send, Plus, Clock, Check } from "lucide-react";

const Notifications = () => {
  const [message, setMessage] = useState("");
  const [selectedTenants, setSelectedTenants] = useState<string[]>([]);

  const notifications = [
    {
      id: 1,
      type: "sms",
      recipient: "Alice Wanjiku (+254712345678)",
      message: "Rent for July 2024 is due on 5th July. Amount: KES 44,000. Pay via M-Pesa to PayBill 123456.",
      status: "sent",
      timestamp: "2024-07-03 10:30",
      property: "Riverside Apartments - A1"
    },
    {
      id: 2,
      type: "email",
      recipient: "john.kimani@email.com",
      message: "Monthly invoice for Commercial Plaza - Shop 12",
      status: "delivered",
      timestamp: "2024-07-02 14:15",
      property: "Commercial Plaza - Shop 12"
    },
    {
      id: 3,
      type: "sms",
      recipient: "Mary Atieno (+254734567890)",
      message: "REMINDER: Your rent payment is overdue. Please pay KES 35,200 immediately to avoid penalties.",
      status: "pending",
      timestamp: "2024-07-08 09:00",
      property: "Garden Courts - B3"
    },
    {
      id: 4,
      type: "whatsapp",
      recipient: "Peter Mwangi (+254745678901)",
      message: "Lease renewal notice for Office Complex - Floor 2. Please contact us to discuss terms.",
      status: "read",
      timestamp: "2024-07-07 16:45",
      property: "Office Complex - Floor 2"
    }
  ];

  const templates = [
    {
      id: 1,
      name: "Rent Due Reminder",
      type: "sms",
      content: "Hujambo {tenant_name}, Rent yako ya {month} ni KES {amount}. Lipa kwa M-Pesa PayBill 123456 kabla ya {due_date}. Asante."
    },
    {
      id: 2,
      name: "Payment Overdue",
      type: "sms",
      content: "URGENT: {tenant_name}, your rent payment of KES {amount} is {days_overdue} days overdue. Please pay immediately to avoid late fees."
    },
    {
      id: 3,
      name: "Payment Confirmation",
      type: "sms",
      content: "Thank you {tenant_name}! We have received your payment of KES {amount} for {property}. Receipt: {receipt_number}"
    },
    {
      id: 4,
      name: "Lease Renewal Notice",
      type: "email",
      content: "Dear {tenant_name}, Your lease for {property} expires on {lease_end}. Please contact us to discuss renewal terms."
    },
    {
      id: 5,
      name: "Maintenance Notice",
      type: "both",
      content: "Notice: Scheduled maintenance at {property} on {date} from {time}. Please ensure access to your unit."
    }
  ];

  const tenants = [
    "Alice Wanjiku", "John Kimani", "Mary Atieno", "Peter Mwangi", "Grace Njeri", "David Ochieng"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications & Communication</h2>
          <p className="text-gray-600">Send SMS, WhatsApp, and email notifications to tenants</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Notice
        </Button>
      </div>

      <Tabs defaultValue="send" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send Messages</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Message Composer */}
            <Card>
              <CardHeader>
                <CardTitle>Compose Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message Type</label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      SMS
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-green-50 text-green-700 border-green-200">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Recipients</label>
                  <div className="max-h-32 overflow-y-auto border rounded-lg p-2 space-y-1">
                    {tenants.map((tenant) => (
                      <label key={tenant} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTenants([...selectedTenants, tenant]);
                            } else {
                              setSelectedTenants(selectedTenants.filter(t => t !== tenant));
                            }
                          }}
                        />
                        <span>{tenant}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{selectedTenants.length} tenant(s) selected</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject (Email only)</label>
                  <Input placeholder="Enter email subject..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea
                    placeholder="Type your message here... Use {tenant_name}, {amount}, {property} for personalization"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-gray-500">{message.length} characters</p>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Rent Reminders (Overdue)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Monthly Bills (All Tenants)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Maintenance Notice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Lease Renewal Notices
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Payment Confirmations
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{template.content}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{notification.recipient}</p>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{notification.property}</p>
                      <p className="text-sm text-gray-700">{notification.message}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
