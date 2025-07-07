import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockRfqs = [
    { id: 'RFQ001', date: '2024-07-28', status: 'New', summary: 'Request for 10 Smart Building Systems for a new office complex...', matchedProducts: 1 },
    { id: 'RFQ002', date: '2024-07-27', status: 'Reviewed', summary: 'Inquiry about solar panel installation for a 50kW system.', matchedProducts: 1 },
    { id: 'RFQ003', date: '2024-07-27', status: 'New', summary: 'Need a complete security overhaul with 32 cameras and biometric access.', matchedProducts: 1 },
    { id: 'RFQ004', date: '2024-07-26', status: 'Archived', summary: 'AV setup for a single conference room.', matchedProducts: 0 },
];

export default function RfqsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">RFQ Submissions</CardTitle>
            <p className="text-muted-foreground">Review and manage incoming Requests for Quotation.</p>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Summary</TableHead>
                        <TableHead>Matches</TableHead>
                        <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockRfqs.map((rfq) => (
                        <TableRow key={rfq.id}>
                            <TableCell className="font-medium">{rfq.id}</TableCell>
                            <TableCell>{rfq.date}</TableCell>
                            <TableCell>
                                <Badge variant={rfq.status === 'New' ? 'default' : rfq.status === 'Reviewed' ? 'outline' : 'secondary'}>{rfq.status}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{rfq.summary}</TableCell>
                            <TableCell>{rfq.matchedProducts}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Mark as Reviewed</DropdownMenuItem>
                                        <DropdownMenuItem>Archive</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
