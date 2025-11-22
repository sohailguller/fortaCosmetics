import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        // Handle CORS preflight automatically by returning success if method is OPTIONS
        if (req.method === 'OPTIONS') {
            return new Response(null, { status: 204 });
        }

        let body;
        try {
            body = await req.json();
        } catch (e) {
            return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { email } = body;
        if (!email) {
            return Response.json({ error: 'Email is required' }, { status: 400 });
        }

        const base44 = createClientFromRequest(req);

        // 1. Check for duplicates
        try {
            const existing = await base44.asServiceRole.entities.Waitlist.filter({ email });
            if (existing.length > 0) {
                return Response.json({ status: 'already_registered' });
            }
        } catch (err) {
            console.error("Check duplicate error:", err);
            return Response.json({ error: `Database error check: ${err.message}` }, { status: 500 });
        }

        // 2. Create entry
        try {
            await base44.asServiceRole.entities.Waitlist.create({ email });
        } catch (err) {
            console.error("Create error:", err);
            return Response.json({ error: `Database error create: ${err.message}` }, { status: 500 });
        }

        // 3. Send email (fire and forget/log on error, don't fail the request)
        try {
            await base44.asServiceRole.integrations.Core.SendEmail({
                to: "support@fortacosmetics.com",
                subject: "New Waitlist Signup",
                body: `New waitlist signup: ${email}`
            });
        } catch (err) {
            console.error("Email error:", err);
            // We don't return error here, as the signup was successful
        }

        return Response.json({ status: 'success' });

    } catch (error) {
        console.error("Global error:", error);
        return Response.json({ error: `Server error: ${error.message}` }, { status: 500 });
    }
});