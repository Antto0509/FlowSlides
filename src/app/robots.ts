import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    if (process.env.VERCEL_ENV !== "production") return { rules: [{ userAgent:"*", disallow:"/" }] }
    
    const base =
        process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
        "http://localhost:3000";

    return {
        rules: [
        {
            userAgent: "*",
            allow: ["/", "/pricing", "/examples", "/legal", "/privacy", "/terms"],
            disallow: ["/api/", "/_next/", "/create-carousel", "/login", "/account"],
        },
        ],
        sitemap: `${base}/sitemap.xml`,
    };
}