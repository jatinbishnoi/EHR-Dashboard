"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { 
  mockInsuranceData, 
  mockPaymentHistory, 
  mockBillingCodes, 
  mockReportData 
} from '../mock/billingData';

export default function BillingPage() {
  const [searchCode, setSearchCode] = useState('');
  const [selectedReport, setSelectedReport] = useState('revenue');

  const filteredCodes = mockBillingCodes.filter(code => 
    code.code.toLowerCase().includes(searchCode.toLowerCase()) ||
    code.description.toLowerCase().includes(searchCode.toLowerCase())
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Billing & Administrative</h1>

      <Tabs defaultValue="insurance" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="insurance">Insurance Eligibility</TabsTrigger>
          <TabsTrigger value="payments">Payments & Balances</TabsTrigger>
          <TabsTrigger value="codes">Billing Codes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="insurance">
          <Card>
            <CardHeader className="text-xl font-semibold">
              Insurance Eligibility Check
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInsuranceData.map((insurance) => (
                  <div key={insurance.patientId} className="border p-4 rounded-lg">
                    <h3 className="font-semibold">Patient ID: {insurance.patientId}</h3>
                    <p>Provider: {insurance.insuranceProvider}</p>
                    <p>Status: <span className={`capitalize ${
                      insurance.status === 'active' ? 'text-green-600' : 
                      insurance.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>{insurance.status}</span></p>
                    <div className="mt-2">
                      <p>Copay: ${insurance.coverageDetails.copay}</p>
                      <p>Deductible: ${insurance.coverageDetails.deductible}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader className="text-xl font-semibold">
              Patient Payments & Balances
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPaymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="py-2">{payment.date}</td>
                      <td className="py-2">${payment.amount.toFixed(2)}</td>
                      <td className="py-2 capitalize">{payment.type}</td>
                      <td className="py-2 capitalize">{payment.status}</td>
                      <td className="py-2">{payment.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="codes">
          <Card>
            <CardHeader className="text-xl font-semibold">
              Billing Codes & Fee Schedules
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Search codes or descriptions..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="mb-4"
              />
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2">Code</th>
                      <th className="pb-2">Description</th>
                      <th className="pb-2">Fee</th>
                      <th className="pb-2">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCodes.map((code) => (
                      <tr key={code.code} className="border-b">
                        <td className="py-2 font-medium">{code.code}</td>
                        <td className="py-2">{code.description}</td>
                        <td className="py-2">${code.fee.toFixed(2)}</td>
                        <td className="py-2">{code.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader className="text-xl font-semibold">
              Reports & Analytics
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockReportData.revenue.labels.map((month, index) => ({
                      month,
                      revenue: mockReportData.revenue.data[index]
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Payment Types Chart */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Payment Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockReportData.paymentTypes.labels.map((label, index) => ({
                          name: label,
                          value: mockReportData.paymentTypes.data[index]
                        }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {mockReportData.paymentTypes.labels.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Claims Summary */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Claims Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Claims</p>
                      <p className="text-2xl font-bold">{mockReportData.claimStatus.totalClaims}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Approval Rate</p>
                      <p className="text-2xl font-bold">{mockReportData.claimStatus.approvalRate}</p>
                    </div>
                  </div>
                </div>

                {/* Top Procedures */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Top Procedures</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2">Code</th>
                        <th className="pb-2">Count</th>
                        <th className="pb-2">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockReportData.topProcedures.map((proc) => (
                        <tr key={proc.code} className="border-b">
                          <td className="py-2">{proc.code}</td>
                          <td className="py-2">{proc.count}</td>
                          <td className="py-2">${proc.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}