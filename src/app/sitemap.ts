import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base =
        process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
        "http://localhost:3000";

    const now = new Date();

    // Routes publiques
    const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
        { path: "/",         priority: 1.0, changeFrequency: "weekly"  },
        { path: "/pricing",  priority: 0.9, changeFrequency: "monthly" },
        { path: "/examples", priority: 0.8, changeFrequency: "weekly"  },
        { path: "/legal",    priority: 0.3, changeFrequency: "yearly"  },
        { path: "/privacy",  priority: 0.3, changeFrequency: "yearly"  },
        { path: "/terms",    priority: 0.3, changeFrequency: "yearly"  },
    ];

    return routes.map((r) => ({
        url: `${base}${r.path}`,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
    }));
}