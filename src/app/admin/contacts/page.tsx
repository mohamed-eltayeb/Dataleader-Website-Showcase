import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockContacts = [
    { id: 1, name: 'Abdullah Khalid', email: 'a.khalid@example.com', subject: 'Inquiry about Smart Building Systems', date: '2024-07-28', status: 'Unread' },
    { id: 2, name: 'Sara Ahmed', email: 's.ahmed@example.com', subject: 'Follow-up on Quote #12345', date: '2024-07-28', status: 'Read' },
    { id: 3, name: 'John Doe', email: 'j.doe@example.com', subject: 'Partnership Opportunity', date: '2024-07-27', status: 'Unread' },
];

export default function ContactsPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Form Submissions</CardTitle>
            <p className="text-muted-foreground">Manage messages from your website contact form.</p>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>From</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockContacts.map((contact) => (
                        <TableRow key={contact.id} className={contact.status === 'Unread' ? 'bg-secondary/50' : ''}>
                            <TableCell>
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-sm text-muted-foreground">{contact.email}</div>
                            </TableCell>
                            <TableCell>{contact.subject}</TableCell>
                            <TableCell>
                                <Badge variant={contact.status === 'Unread' ? 'default' : 'secondary'}>{contact.status}</Badge>
                            </TableCell>
                             <TableCell>{contact.date}</TableCell>
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
                                        <DropdownMenuItem>View Message</DropdownMenuItem>
                                        <DropdownMenuItem>Mark as Read</DropdownMenuItem>
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
