import { SlideContent, CarouselTheme, SlideFormat } from "@/types/carousel";

const SLIDE_WIDTH = 1080;

/**
 * Calcule la hauteur d'une slide en fonction de son format.
 * @param slideFormat Le format de la slide ("4:5" ou "1:1")
 * @returns La hauteur en pixels de la slide
 */
function getSlideHeight(slideFormat: SlideFormat): number {
  return slideFormat === "4:5" ? 1350 : 1080;
}

/**
 * Crée un canvas représentant le badge de numéro de slide, avec le numéro centré et stylisé selon le thème.
 * @param number Le numéro à afficher dans le badge
 * @param theme Le thème du carousel, avec les couleurs déjà résolues en rgb()
 * @returns Un élément HTMLCanvasElement contenant le badge stylisé
 */
function createBadgeCanvas(number: number, theme: CarouselTheme): HTMLCanvasElement {
  const size = 86;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;

  // Cercle
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = theme.accentColor;
  ctx.fill();

  // Texte
  ctx.fillStyle = theme.bgColor;
  ctx.font = `700 32px ${theme.fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(number), size / 2, size / 2);

  return c;
}

/**
 * Crée un canvas représentant le bouton "Swipe →", avec le texte centré et stylisé selon le thème.
 * @param theme Le thème du carousel, avec les couleurs déjà résolues en rgb()
 * @returns Un élément HTMLCanvasElement contenant le bouton stylisé
 */
function createSwipeCanvas(theme: CarouselTheme): HTMLCanvasElement {
  const height = 72;
  const fontSize = 32;
  const paddingX = 36;
  const radius = height / 2;
  const label = "Swipe →";

  // Canvas temporaire pour mesurer le texte
  const tmp = document.createElement("canvas");
  const tmpCtx = tmp.getContext("2d")!;
  tmpCtx.font = `700 ${fontSize}px ${theme.fontFamily}`;
  const textWidth = tmpCtx.measureText(label).width;

  const width = textWidth + paddingX * 2;

  const c = document.createElement("canvas");
  c.width = Math.ceil(width);
  c.height = height;
  const ctx = c.getContext("2d")!;

  // Pilule arrondie
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.arcTo(width, 0, width, height, radius);
  ctx.lineTo(width, height - radius);
  ctx.arcTo(width, height, width - radius, height, radius);
  ctx.lineTo(radius, height);
  ctx.arcTo(0, height, 0, height - radius, radius);
  ctx.lineTo(0, radius);
  ctx.arcTo(0, 0, radius, 0, radius);
  ctx.closePath();
  ctx.fillStyle = theme.accentColor;
  ctx.fill();

  // Texte
  ctx.fillStyle = theme.bgColor;
  ctx.font = `700 ${fontSize}px ${theme.fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, width / 2, height / 2);

  return c;
}

/**
 * Construit un élément DOM représentant la slide, stylisé selon le thème et le format spécifiés.
 * @param slide Le contenu de la slide à rendre
 * @param index L'index de la slide (pour l'affichage du numéro)
 * @param theme Le thème du carousel, avec les couleurs déjà résolues en rgb()
 * @param slideFormat Le format de la slide ("4:5" ou "1:1")
 * @param authorName Le nom de l'auteur à afficher sur les slides de type "hook" ou "cta"
 * @param totalSlides Le nombre total de slides dans le carousel
 * @param doc Le document dans lequel créer les éléments (par défaut, le document principal, mais peut être un document d'iframe pour éviter les conflits de styles)
 * @returns Un élément HTMLDivElement contenant la slide prête à être rendue en canvas
 */
function buildSlideDOM(
  slide: SlideContent,
  index: number,
  theme: CarouselTheme,
  slideFormat: SlideFormat,
  authorName: string,
  totalSlides: number,
  doc: Document = document
): HTMLDivElement {
  const HEIGHT = getSlideHeight(slideFormat);

  const container = doc.createElement("div");
  container.style.cssText = `
    position: relative;
    left: -9999px;
    top: 0;
    width: ${SLIDE_WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    border-radius: 0;
    background-color: ${theme.bgColor};
    color: ${theme.textColor};
    font-family: ${theme.fontFamily};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 80px;
    box-sizing: border-box;
  `;

  // — Header —
  const header = doc.createElement("div");
  header.style.cssText =
    "display:flex;justify-content:space-between;align-items:flex-start;";

  const badgeCanvas = createBadgeCanvas(index + 1, theme);
  badgeCanvas.style.cssText = "flex-shrink:0;";
  header.appendChild(badgeCanvas);

  if ((slide.type === "hook" || slide.type === "cta") && authorName) {
    const author = doc.createElement("span");
    author.style.cssText = `font-size:32px;opacity:0.6;color:${theme.textColor};`;
    author.textContent = authorName;
    header.appendChild(author);
  }
  container.appendChild(header);

  // — Content —
  const content = doc.createElement("div");

  if (slide.type === "hook" && slide.imageUrl) {
    // Hook en mode image : image plein cadre, pas de texte
    content.style.cssText =
      "flex:1;overflow:hidden;border-radius:16px;min-height:0;";
    const img = doc.createElement("img");
    img.src = slide.imageUrl;
    img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
    content.appendChild(img);
  } else {
    content.style.cssText =
      "flex:1;display:flex;flex-direction:column;justify-content:center;gap:24px;padding:48px 0;min-height:0;";

    const title = doc.createElement("h2");
    title.style.cssText = `
      font-size:${slide.type === "hook" ? "64px" : "52px"};
      font-weight:700;line-height:1.2;
      color:${theme.textColor};margin:0;
    `;
    title.textContent = slide.title;
    content.appendChild(title);

    if (slide.body) {
      const body = doc.createElement("p");
      body.style.cssText = `font-size:28px;opacity:0.8;line-height:1.6;color:${theme.textColor};margin:0;`;
      body.textContent = slide.body;
      content.appendChild(body);
    }

    // Bullets : uniquement content/CTA, respecte bulletPointsHidden
    const bullets =
      slide.type !== "hook" && !slide.bulletPointsHidden
        ? (slide.bulletPoints ?? [])
        : [];
    if (bullets.length > 0) {
      const ul = doc.createElement("ul");
      ul.style.cssText =
        "list-style:none;padding:0;margin:16px 0 0;display:flex;flex-direction:column;gap:16px;";

      bullets.forEach((point) => {
        const li = doc.createElement("li");
        li.style.cssText = "display:flex;align-items:flex-start;gap:16px;font-size:26px;";

        const dot = doc.createElement("span");
        dot.style.cssText = `
          width:12px;height:12px;border-radius:50%;
          background:${theme.accentColor};flex-shrink:0;margin-top:8px;
        `;

        const text = doc.createElement("span");
        text.style.cssText = `color:${theme.textColor};`;
        text.textContent = point;

        li.appendChild(dot);
        li.appendChild(text);
        ul.appendChild(li);
      });

      content.appendChild(ul);
    }

    // Image pour les slides content/CTA
    // h-40 preview (160px sur 400px) → 432px à 1080px (scale ×2.7)
    if (slide.imageUrl) {
      const imgContainer = doc.createElement("div");
      imgContainer.style.cssText =
        "width:100%;height:432px;flex-shrink:0;border-radius:16px;overflow:hidden;";
      const img = doc.createElement("img");
      img.src = slide.imageUrl;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
      imgContainer.appendChild(img);
      content.appendChild(imgContainer);
    }
  }

  container.appendChild(content);

  // — Footer —
  const footer = doc.createElement("div");
  footer.style.cssText = "display:flex;justify-content:space-between;align-items:flex-end;";

  // Numéro de slide
  const slideNumber = doc.createElement("div");
  slideNumber.style.cssText = `font-size:25px;opacity:0.4;font-weight:500;color:${theme.textColor};`;
  slideNumber.textContent = `${index + 1}/${totalSlides}`;
  footer.appendChild(slideNumber);

  // Bouton Swipe (sauf sur le dernier slide / CTA)
  if (slide.type !== "cta") {
    const swipeCanvas = createSwipeCanvas(theme);
    swipeCanvas.style.cssText = "flex-shrink:0;";
    footer.appendChild(swipeCanvas);
  }

  container.appendChild(footer);

  // — Accent bar en bas de la slide —
  const accentBar = doc.createElement("div");
  accentBar.style.cssText = `
    position:absolute;
    bottom:0;left:0;right:0;
    height:8px;
    background:${theme.accentColor};
  `;
  container.appendChild(accentBar);

  return container;
}

/**
 * Rend une slide en canvas en construisant d'abord un DOM temporaire stylisé selon le thème et le format, puis en utilisant html2canvas pour le rendre en image.
 * @param slide Le contenu de la slide à rendre
 * @param index L'index de la slide (pour l'affichage du numéro)
 * @param theme Le thème du carousel, avec les couleurs déjà résolues en rgb()
 * @param slideFormat Le format de la slide ("4:5" ou "1:1") 
 * @param authorName Le nom de l'auteur à afficher sur les slides de type "hook" ou "cta"
 * @param totalSlides Le nombre total de slides dans le carousel
 * @returns Un élément HTMLCanvasElement contenant le rendu de la slide, prêt à être exporté en PDF ou PNG
 */
async function renderSlideToCanvas(
  slide: SlideContent,
  index: number,
  theme: CarouselTheme,
  slideFormat: SlideFormat,
  authorName: string,
  totalSlides: number
): Promise<HTMLCanvasElement> {
  const html2canvas = (await import("html2canvas")).default;
  const HEIGHT = getSlideHeight(slideFormat);

  // 1. Créer l'iframe
  const iframe = document.createElement("iframe");
  iframe.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: ${SLIDE_WIDTH}px;
    height: ${HEIGHT}px;
    border: none;
    visibility: hidden;
  `;
  document.body.appendChild(iframe);

  // 2. Attendre que l'iframe soit prête
  await new Promise<void>((resolve) => {
    iframe.onload = () => resolve();
    // Déclencher le load
    iframe.srcdoc = `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box;}</style></head><body></body></html>`;
  });

  const iframeDoc = iframe.contentDocument!;

  // 3. Injecter les polices et attendre leur chargement
  const fontLink = iframeDoc.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap";
  iframeDoc.head.appendChild(fontLink);

  await new Promise((resolve) => setTimeout(resolve, 800));

  // 4. Construire le DOM
  const container = buildSlideDOM(
    slide, index, theme, slideFormat, authorName, totalSlides, iframeDoc
  );

  // ✅ position:fixed dans l'iframe, pas relative
  container.style.cssText += `
    position: fixed;
    left: 0;
    top: 0;
    width: ${SLIDE_WIDTH}px;
    height: ${HEIGHT}px;
  `;

  iframeDoc.body.appendChild(container);

  // 5. Laisser le navigateur calculer les layouts
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 6. Attendre le chargement de toutes les images (base64 ou URL)
  const images = Array.from(iframeDoc.getElementsByTagName("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) resolve();
          else { img.onload = () => resolve(); img.onerror = () => resolve(); }
        })
    )
  );

  // 7. Capturer
  const canvas = await html2canvas(container, {
    width: SLIDE_WIDTH,
    height: HEIGHT,
    scale: 1,
    useCORS: true,
    allowTaint: true,
    backgroundColor: theme.bgColor,
    windowWidth: SLIDE_WIDTH,
    windowHeight: HEIGHT,
    scrollX: 0,
    scrollY: 0,
  });

  document.body.removeChild(iframe);
  return canvas;
}

/**
 * Rend toutes les slides en canvases en parallèle, en utilisant le thème et le format spécifiés.
 * @param slides Le tableau de contenu des slides à rendre
 * @param theme Le thème du carousel, avec les couleurs déjà résolues en rgb()
 * @param slideFormat Le format des slides ("4:5" ou "1:1")
 * @param authorName Le nom de l'auteur à afficher sur les slides de type "hook" ou "cta"
 * @returns Un tableau de HTMLCanvasElement, chacun représentant une slide rendue, prêt à être exporté en PDF ou PNG
 */
async function renderAllSlides(
  slides: SlideContent[],
  theme: CarouselTheme,
  slideFormat: SlideFormat,
  authorName: string
): Promise<HTMLCanvasElement[]> {
  const totalSlides = slides.length;

  return Promise.all(
    slides.map((slide, i) =>
      renderSlideToCanvas(slide, i, theme, slideFormat, authorName, totalSlides)
    )
  );
}

/**
 * Exporte les slides au format PDF en les rendant d'abord en canvases, puis en les ajoutant à un document jsPDF.
 * @param slides Le tableau de contenu des slides à exporter
 * @param theme Le thème du carousel, avec les couleurs déjà résolues en rgb()
 * @param slideFormat Le format des slides ("4:5" ou "1:1")
 * @param authorName Le nom de l'auteur à afficher sur les slides de type "hook" ou "cta"
 * @returns Une promesse qui se résout lorsque le PDF a été généré et téléchargé
 */
export async function exportAsPDF(
  slides: SlideContent[],
  theme: CarouselTheme,
  slideFormat: SlideFormat,
  authorName: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const HEIGHT = getSlideHeight(slideFormat);

  const canvases = await renderAllSlides(slides, theme, slideFormat, authorName);

  const orientation = slideFormat === "4:5" ? "portrait" : ("square" as any);
  const pdf = new jsPDF({ orientation, unit: "px", format: [SLIDE_WIDTH, HEIGHT] });

  canvases.forEach((canvas, i) => {
    if (i > 0) {
      pdf.addPage(
        [SLIDE_WIDTH, HEIGHT],
        slideFormat === "4:5" ? "portrait" : "landscape"
      );
    }
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    pdf.addImage(imgData, "JPEG", 0, 0, SLIDE_WIDTH, HEIGHT);
  });

  pdf.save("carousel-linkedin.pdf");
}

/**
 * Exporte les slides au format PNG en les rendant d'abord en canvases, puis en les compressant dans une archive ZIP téléchargeable.
 * @param slides Le tableau de contenu des slides à exporter
 * @param theme Le thème du carousel, avec les couleurs déjà résolues en rgb()
 * @param slideFormat Le format des slides ("4:5" ou "1:1")
 * @param authorName Le nom de l'auteur à afficher sur les slides de type "hook" ou "cta"
 * @returns Une promesse qui se résout lorsque le ZIP a été généré et téléchargé
 */
export async function exportAsPNG(
  slides: SlideContent[],
  theme: CarouselTheme,
  slideFormat: SlideFormat,
  authorName: string
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const canvases = await renderAllSlides(slides, theme, slideFormat, authorName);

  const zip = new JSZip();
  canvases.forEach((canvas, i) => {
    const base64 = canvas.toDataURL("image/png").split(",")[1];
    zip.file(`slide-${String(i + 1).padStart(2, "0")}.png`, base64, {
      base64: true,
    });
  });

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "carousel-instagram.zip";
  a.click();
  URL.revokeObjectURL(url);
}