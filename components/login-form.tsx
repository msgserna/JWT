"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, Lock, Mail, AlertCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("jwt_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #171219 0%, #225560 100%)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "linear-gradient(135deg, #F0386B, #FF5376)" }}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
          <p className="mt-2" style={{ color: "#FAF33E" }}>
            Accede a tu panel de control
          </p>
        </div>

        <Card
          className="backdrop-blur-sm shadow-2xl border"
          style={{ backgroundColor: "rgba(23,18,25,0.75)", borderColor: "#225560" }}
        >
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-xl">Iniciar sesión</CardTitle>
            <CardDescription style={{ color: "rgba(255,255,255,0.5)" }}>
              Introduce tus credenciales para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#FF5376" }}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@tomates.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 text-white placeholder:text-white/30"
                    style={{
                      backgroundColor: "rgba(34,85,96,0.3)",
                      borderColor: "#225560",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "#FF5376" }}
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 text-white placeholder:text-white/30"
                    style={{
                      backgroundColor: "rgba(34,85,96,0.3)",
                      borderColor: "#225560",
                    }}
                  />
                </div>
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 p-3 rounded-md text-sm"
                  style={{
                    backgroundColor: "rgba(240,56,107,0.15)",
                    border: "1px solid rgba(240,56,107,0.4)",
                    color: "#FF5376",
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full font-semibold h-11 transition-all duration-200 text-white border-0"
                style={{
                  background: loading
                    ? "rgba(240,56,107,0.6)"
                    : "linear-gradient(135deg, #F0386B, #FF5376)",
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Autenticando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Iniciar sesión
                  </span>
                )}
              </Button>
            </form>

            <div
              className="mt-6 p-4 rounded-md"
              style={{ backgroundColor: "rgba(34,85,96,0.25)", border: "1px solid rgba(34,85,96,0.6)" }}
            >
              <p
                className="text-xs text-center font-medium mb-2"
                style={{ color: "#FAF33E" }}
              >
                Credenciales de prueba
              </p>
              <div className="space-y-1 text-xs text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                <p>
                  <span className="text-white/80">Email:</span> admin@tomates.com
                </p>
                <p>
                  <span className="text-white/80">Contraseña:</span> 1234
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
          Actividad JWT &mdash; DAW2 Desarrollo Web Servidor
        </p>
      </div>
    </div>
  );
}
