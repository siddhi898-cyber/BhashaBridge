import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const audioCache = new Map<string, Buffer>();

function odiaToDevanagari(text: string): string {
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 0x0b01 && code <= 0x0b71) {
        return String.fromCharCode(code - 0x0200);
      }
      return c;
    })
    .join("");
}

function cleanSpeechText(text: string): string {
  return text
    .replace(/[*_#`~[\]()]/g, " ")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function ttsProxyPlugin() {
  return {
    name: "tts-proxy",
    configureServer(server: any) {
      server.middlewares.use("/api/tts", async (req: any, res: any) => {
        try {
          const url = new URL(req.url, "http://localhost");
          const rawTl = (url.searchParams.get("tl") || "en").toLowerCase();
          const rawQ = url.searchParams.get("q") || "";
          if (!rawQ) {
            res.statusCode = 400;
            res.end("Missing text");
            return;
          }

          let cleanQ = cleanSpeechText(rawQ).slice(0, 250);
          let targetTl = rawTl;

          if (rawTl === "or") {
            targetTl = "hi";
            cleanQ = odiaToDevanagari(cleanQ);
          } else if (rawTl === "as") {
            targetTl = "bn";
          } else if (rawTl === "kok") {
            targetTl = "mr";
          } else if (
            ["bho", "mwr", "chd", "mag", "mai", "mwn", "bgc"].includes(rawTl)
          ) {
            targetTl = "hi";
          } else if (rawTl === "ks") {
            const hasArabic = /[\u0600-\u06FF]/.test(cleanQ);
            targetTl = hasArabic ? "ur" : "hi";
          } else if (rawTl === "sat") {
            targetTl = "hi";
          }

          const cacheKey = `${targetTl}:::${cleanQ}`;
          if (audioCache.has(cacheKey)) {
            const cachedBuf = audioCache.get(cacheKey)!;
            res.writeHead(200, {
              "Content-Type": "audio/mpeg",
              "Content-Length": cachedBuf.length,
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "public, max-age=86400",
            });
            res.end(cachedBuf);
            return;
          }

          const https = await import("node:https");
          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(targetTl)}&q=${encodeURIComponent(cleanQ)}`;
          const gReq = https.get(
            googleUrl,
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              },
            },
            (gRes) => {
              if (gRes.statusCode !== 200) {
                res.statusCode = gRes.statusCode || 500;
                gRes.pipe(res);
                return;
              }
              const chunks: Buffer[] = [];
              gRes.on("data", (chunk: Buffer) => chunks.push(chunk));
              gRes.on("end", () => {
                const completeBuf = Buffer.concat(chunks);
                audioCache.set(cacheKey, completeBuf);
                res.writeHead(200, {
                  "Content-Type": "audio/mpeg",
                  "Content-Length": completeBuf.length,
                  "Access-Control-Allow-Origin": "*",
                  "Cache-Control": "public, max-age=86400",
                });
                res.end(completeBuf);
              });
            }
          );
          gReq.on("error", (err) => {
            res.statusCode = 502;
            res.end(err.message);
          });
        } catch (e) {
          res.statusCode = 500;
          res.end(String(e));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), ttsProxyPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,
    fs: {
      strict: false,
    },
  },
});
