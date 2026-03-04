import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FlowSlides — Créateur de carrousels IA pour LinkedIn et Instagram";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo + nom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
            }}
          >
            ✦
          </div>
          <span
            style={{
              fontSize: "38px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            FlowSlides
          </span>
        </div>

        {/* Titre principal */}
        <div
          style={{
            fontSize: "62px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          Créez des carrousels{" "}
          <span style={{ color: "#818cf8" }}>inoubliables</span>
        </div>

        {/* Sous-titre */}
        <div
          style={{
            fontSize: "26px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "680px",
            lineHeight: 1.4,
          }}
        >
          LinkedIn & Instagram — Généré par l&apos;IA en moins de 2 minutes
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "52px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "36px",
          }}
        >
          {[
            { value: "10k+", label: "Carrousels créés" },
            { value: "2 min", label: "Temps moyen" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "32px", fontWeight: 700, color: "#818cf8" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: "16px", color: "#64748b" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
