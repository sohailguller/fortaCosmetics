import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

export default Deno.serve(async (req) => {
    try {
        // Parse body safely
        let body;
        try {
            body = await req.json();
        } catch {
            return Response.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const { email } = body;

        if (!email) {
            return Response.json({ error: 'Email is required' }, { status: 400 });
        }

        const base44 = createClientFromRequest(req);

        // Check for duplicates using service role
        const existing = await base44.asServiceRole.entities.Waitlist.filter({ email });
        if (existing.length > 0) {
            return Response.json({ status: 'already_registered' });
        }

        // Use service role for BOTH operations to ensure they work for unauthenticated users
        await Promise.all([
            base44.asServiceRole.entities.Waitlist.create({ email }),
            base44.asServiceRole.integrations.Core.SendEmail({
                to: "support@fortacosmetics.com",
                subject: "New Waitlist Signup",
                body: `New waitlist signup: ${email}`
            })
        ]);

        return Response.json({ status: 'success' });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});