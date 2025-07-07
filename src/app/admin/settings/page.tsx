'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Mail, Slack, Briefcase } from 'lucide-react';
import { useState } from 'react';

const initialIntegrations = [
    {
        name: 'Google Workspace',
        description: 'Sync contacts and calendar events.',
        icon: Briefcase,
        connected: true,
    },
    {
        name: 'Slack',
        description: 'Get notifications for new RFQs and contacts.',
        icon: Slack,
        connected: false,
    },
    {
        name: 'Mailchimp',
        description: 'Sync contacts for email marketing campaigns.',
        icon: Mail,
        connected: false,
    }
];


export default function SettingsPage() {
    const { toast } = useToast();
    const [integrations, setIntegrations] = useState(initialIntegrations);

    const handleToggle = (name: string, checked: boolean) => {
        setIntegrations(prev => 
            prev.map(int => int.name === name ? {...int, connected: checked} : int)
        );

        toast({
            title: `${name} Integration`,
            description: `Successfully ${checked ? 'connected' : 'disconnected'} ${name}.`,
        });
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Integrations</CardTitle>
                    <CardDescription>Connect your favorite tools to streamline your workflow.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {integrations.map((integration) => {
                        const Icon = integration.icon;
                        return (
                            <Card key={integration.name} className="flex items-center justify-between p-6 bg-secondary/30">
                                <div className="flex items-center gap-4">
                                    <Icon className="w-8 h-8 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-semibold">{integration.name}</h3>
                                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Switch
                                        id={`switch-${integration.name}`}
                                        checked={integration.connected}
                                        onCheckedChange={(checked) => handleToggle(integration.name, checked)}
                                        aria-label={`Connect ${integration.name}`}
                                    />
                                     <label htmlFor={`switch-${integration.name}`} className="text-sm font-medium w-20">
                                        {integration.connected ? 'Connected' : 'Connect'}
                                    </label>
                                </div>
                            </Card>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
