'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, FileText, MessageSquare, Sparkles, Settings } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { generateAdminInsights, GenerateAdminInsightsOutput } from '@/ai/flows/generate-admin-insights-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data
const mockDashboardData = {
    totalProducts: 5,
    newRfqs: [
        'Request for 10 Smart Building Systems for a new office complex in Riyadh.',
        'Inquiry about solar panel installation for a 50kW system at a factory.',
        'Need a complete security overhaul with 32 cameras and biometric access for a bank HQ.',
    ],
    newContacts: 2,
    productActivity: [
        { name: 'Advanced Security Suite', views: 150 },
        { name: 'Smart Building System', views: 120 },
        { name: 'Commercial Solar Power System', views: 95 },
    ]
};

const mockSalesData = [
    { month: 'Jan', sales: 120000 },
    { month: 'Feb', sales: 180000 },
    { month: 'Mar', sales: 150000 },
    { month: 'Apr', sales: 210000 },
    { month: 'May', sales: 250000 },
    { month: 'Jun', sales: 230000 },
];

const priorityVariantMap: {[key: string]: "default" | "secondary" | "destructive" } = {
    High: 'destructive',
    Medium: 'default',
    Low: 'secondary'
};

const SalesChart = () => (
    <Card>
        <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Sales performance over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `SAR ${Number(value)/1000}k`} />
                    <Tooltip 
                        cursor={{fill: 'hsl(var(--secondary))'}}
                        contentStyle={{
                            background: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                        }}
                    />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)

export default function DashboardPage() {
  const [insights, setInsights] = useState<GenerateAdminInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
      const fetchInsights = async () => {
          try {
              const result = await generateAdminInsights({
                  newRfqs: mockDashboardData.newRfqs,
                  newContacts: mockDashboardData.newContacts,
                  popularProducts: mockDashboardData.productActivity,
              });
              setInsights(result);
          } catch (error) {
              console.error("Failed to fetch admin insights:", error);
              toast({
                variant: "destructive",
                title: "Error",
                description: "Could not load AI insights.",
              })
          } finally {
              setIsLoading(false);
          }
      };

      fetchInsights();
  }, [toast]);

  return (
    <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockDashboardData.totalProducts}</div>
                    <p className="text-xs text-muted-foreground">Currently listed products</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New RFQs</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockDashboardData.newRfqs.length}</div>
                    <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{mockDashboardData.newContacts}</div>
                    <p className="text-xs text-muted-foreground">Unread messages</p>
                </CardContent>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SalesChart />
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                  <Settings className="h-6 w-6 text-primary" />
                  <CardTitle>Streamline Your Workflow</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <p className="text-muted-foreground flex-1">
                      Connect your favorite apps like Google Workspace and Slack to automate tasks and receive real-time notifications.
                  </p>
                  <Button asChild>
                    <Link href="/admin/settings">Manage Integrations</Link>
                  </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="lg:col-span-1">
              <CardHeader className="flex flex-row items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-xl">AI Strategic Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  {isLoading && (
                      <>
                          <InsightSkeleton />
                          <InsightSkeleton />
                      </>
                  )}
                  {insights?.insights.map((insight, index) => (
                      <div key={index} className="p-3 rounded-md bg-secondary/50 border border-secondary">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-primary">{insight.title}</h3>
                            <Badge variant={priorityVariantMap[insight.priority]}>{insight.priority}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                          {insight.productFocus && (
                              <p className="text-xs text-muted-foreground mt-2">
                                  <strong>Product:</strong> {insight.productFocus}
                              </p>
                          )}
                      </div>
                  ))}
                  {!isLoading && !insights?.insights.length && (
                      <p className="text-sm text-muted-foreground">No insights to display right now.</p>
                  )}
              </CardContent>
          </Card>
        </div>
    </div>
  );
}

const InsightSkeleton = () => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
    </div>
);
