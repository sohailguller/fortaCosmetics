import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

export default Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { email } = await req.json();

        if (!email) {
            return Response.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check for duplicates using service role (bypass permissions)
        const existing = await base44.asServiceRole.entities.Waitlist.filter({ email });
        if (existing.length > 0) {
            return Response.json({ status: 'already_registered' });
        }

        // Create entry and send email
        await Promise.all([
            base44.asServiceRole.entities.Waitlist.create({ email }),
            base44.integrations.Core.SendEmail({
                to: "support@fortacosmetics.com",
                subject: "New Waitlist Signup",
                body: `New waitlist signup: ${email}`
            })
        ]);

        return Response.json({ status: 'success' });

    } catch (error) {
        console.error('Waitlist error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});