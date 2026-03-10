"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  User,
  Code2,
  Tag,
  ShieldCheck,
  BookOpen,
  Layers,
} from "lucide-react";

const HTML_TAGS = [
  { tag: "div", desc: "Contenedor de bloque genérico" },
  { tag: "span", desc: "Contenedor en línea genérico" },
  { tag: "p", desc: "Párrafo de texto" },
  { tag: "a", desc: "Enlace/ancla" },
  { tag: "img", desc: "Imagen" },
  { tag: "ul / ol", desc: "Lista desordenada / ordenada" },
  { tag: "li", desc: "Elemento de lista" },
  { tag: "h1–h6", desc: "Encabezados de nivel 1 a 6" },
  { tag: "form", desc: "Formulario" },
  { tag: "input", desc: "Campo de entrada" },
  { tag: "button", desc: "Botón interactivo" },
  { tag: "nav", desc: "Bloque de navegación" },
  { tag: "header", desc: "Cabecera semántica" },
  { tag: "footer", desc: "Pie de página semántico" },
  { tag: "section", desc: "Sección de contenido" },
];

const COURSE_FUNCTIONS = [
  { name: "useState()", desc: "Gestión de estado local en componentes React" },
  { name: "useEffect()", desc: "Efectos secundarios y ciclo de vida" },
  { name: "useRouter()", desc: "Navegación programática en Next.js" },
  { name: "fetch()", desc: "Peticiones HTTP a la API" },
  { name: "localStorage", desc: "Persistencia de datos en el navegador" },
  { name: "JWT (signToken)", desc: "Firma y generación de tokens seguros" },
  { name: "JWT (verifyToken)", desc: "Validación y decodificación de tokens" },
  { name: "NextResponse.json()", desc: "Respuestas JSON desde API Routes" },
  { name: "middleware()", desc: "Protección de rutas en el servidor" },
  { name: "forwardRef()", desc: "Referencia a elementos del DOM" },
  { name: "cva()", desc: "Variantes de componentes con shadcn/ui" },
  { name: "cn()", desc: "Utilidad para combinar clases Tailwind" },
];

interface User {
  email: string;
  name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tokenInfo, setTokenInfo] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      // Extraer info del token JWT para mostrarla (sin verificar en cliente)
      const parts = token.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const exp = new Date(payload.exp * 1000).toLocaleString("es-ES");
        setTokenInfo(`Expira: ${exp}`);
      }
    } catch {
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    router.replace("/login");
  }

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#171219" }}
      >
        <div className="flex items-center gap-3" style={{ color: "#FF5376" }}>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Verificando sesión...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #171219 0%, #225560 60%, #171219 100%)" }}
    >
      {/* Navbar */}
      <nav
        className="border-b sticky top-0 z-10 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(23,18,25,0.85)", borderColor: "rgba(34,85,96,0.6)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F0386B, #FF5376)" }}
            >
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg hidden sm:block text-white">
              Panel Privado
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <User className="w-4 h-4" />
              <span>{user.name}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-sm font-medium transition-all"
              style={{
                borderColor: "#F0386B",
                backgroundColor: "rgba(240,56,107,0.1)",
                color: "#FF5376",
              }}
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Bienvenida */}
        <Card
          className="shadow-xl border"
          style={{
            background: "linear-gradient(135deg, #F0386B 0%, #FF5376 100%)",
            borderColor: "#F0386B",
          }}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">
                  Bienvenido, {user.name}
                </CardTitle>
                <CardDescription className="text-white/70">
                  Acceso autenticado con JWT
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-2 bg-white/15 rounded-md px-3 py-1.5 text-sm text-white">
                <span className="text-white/70">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 rounded-md px-3 py-1.5 text-sm text-white">
                <span className="text-white/70">Token:</span>
                <span className="font-medium">{tokenInfo}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nota importante sobre JWT */}
        <Card
          className="shadow-md border"
          style={{
            backgroundColor: "rgba(250,243,62,0.08)",
            borderColor: "rgba(250,243,62,0.35)",
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle
              className="text-base flex items-center gap-2"
              style={{ color: "#FAF33E" }}
            >
              <ShieldCheck className="w-4 h-4" />
              Nota sobre seguridad JWT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(250,243,62,0.75)" }}>
              <strong>Importante:</strong> HTTP es un protocolo sin estado. Los JWT permiten identificar
              al usuario en peticiones posteriores mediante un token firmado en el servidor.
              Al cerrar sesión, el token se elimina del cliente, pero{" "}
              <strong>el token sigue siendo válido en el servidor hasta que expire</strong> (en este caso, 2 horas).
              Esta es la principal desventaja de los JWT frente a sesiones tradicionales, donde
              el servidor puede invalidar la sesión inmediatamente.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card: 15 etiquetas HTML más usadas */}
          <Card
            className="shadow-lg border"
            style={{ backgroundColor: "rgba(23,18,25,0.7)", borderColor: "rgba(34,85,96,0.6)" }}
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Tag className="w-5 h-5" style={{ color: "#F0386B" }} />
                15 etiquetas HTML más usadas
              </CardTitle>
              <CardDescription style={{ color: "rgba(255,255,255,0.4)" }}>
                Referencia rápida de las etiquetas fundamentales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {HTML_TAGS.map(({ tag, desc }) => (
                  <div
                    key={tag}
                    className="flex items-start gap-3 p-2 rounded-md transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(34,85,96,0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                  >
                    <Badge
                      variant="secondary"
                      className="font-mono text-xs shrink-0 mt-0.5 border"
                      style={{
                        backgroundColor: "rgba(240,56,107,0.15)",
                        color: "#FF5376",
                        borderColor: "rgba(240,56,107,0.3)",
                      }}
                    >
                      {tag}
                    </Badge>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card: Funciones principales del curso */}
          <Card
            className="shadow-lg border"
            style={{ backgroundColor: "rgba(23,18,25,0.7)", borderColor: "rgba(34,85,96,0.6)" }}
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Code2 className="w-5 h-5" style={{ color: "#FAF33E" }} />
                Funciones principales del curso
              </CardTitle>
              <CardDescription style={{ color: "rgba(255,255,255,0.4)" }}>
                Métodos y utilidades utilizados durante el curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {COURSE_FUNCTIONS.map(({ name, desc }) => (
                  <div key={name} className="flex items-start gap-3 p-2 rounded-md transition-colors">
                    <Badge
                      variant="secondary"
                      className="font-mono text-xs shrink-0 mt-0.5 border"
                      style={{
                        backgroundColor: "rgba(34,85,96,0.4)",
                        color: "#FAF33E",
                        borderColor: "rgba(34,85,96,0.7)",
                      }}
                    >
                      {name}
                    </Badge>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {desc}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Card: Tecnologías usadas */}
        <Card
          className="shadow-lg border"
          style={{ backgroundColor: "rgba(23,18,25,0.7)", borderColor: "rgba(34,85,96,0.6)" }}
        >
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <Layers className="w-5 h-5" style={{ color: "#FF5376" }} />
              Stack tecnológico
            </CardTitle>
            <CardDescription style={{ color: "rgba(255,255,255,0.4)" }}>
              Tecnologías utilizadas en esta práctica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js 16",
                "React 19",
                "TypeScript",
                "Tailwind CSS",
                "shadcn/ui",
                "jose (JWT)",
                "Vercel",
                "App Router",
                "API Routes",
              ].map((tech) => (
                <Badge
                  key={tech}
                  className="border transition-colors"
                  style={{
                    backgroundColor: "rgba(240,56,107,0.12)",
                    color: "#F0386B",
                    borderColor: "rgba(240,56,107,0.35)",
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card: Flujo JWT */}
        <Card
          className="shadow-lg border"
          style={{ backgroundColor: "rgba(23,18,25,0.7)", borderColor: "rgba(34,85,96,0.6)" }}
        >
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5" style={{ color: "#225560" }} />
              Flujo de autenticación JWT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {[
                { step: "1", text: "El usuario introduce sus credenciales en /login" },
                { step: "2", text: "Se envían al servidor via POST /api/login" },
                { step: "3", text: "El servidor valida las credenciales contra el usuario fijo" },
                { step: "4", text: "Si son correctas, se genera un JWT firmado con HS256 (2h de vida)" },
                { step: "5", text: "El token se devuelve al cliente y se guarda en localStorage" },
                { step: "6", text: "El cliente accede a /dashboard — si no hay token, redirige a /login" },
                { step: "7", text: "Al cerrar sesión, el token se elimina del localStorage" },
              ].map(({ step, text }) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(34,85,96,0.5)", color: "#FAF33E" }}
                  >
                    {step}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {text}
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </main>

      <footer
        className="border-t mt-8 py-4"
        style={{ borderColor: "rgba(34,85,96,0.4)" }}
      >
        <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Actividad JWT &mdash; DAW2 Desarrollo Web Servidor &mdash; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
