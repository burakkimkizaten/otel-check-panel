"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Status = "idle" | "checking" | "safe" | "blocked" | "error";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("checking");

    try {
      const { data, error } = await supabase
        .from("blacklist")
        .select("id")
        .eq("first_name", firstName.trim())
        .eq("last_name", lastName.trim())
        .limit(1);

      if (error) {
        console.error(error);
        setStatus("error");
        setError("Sunucuya bağlanırken bir hata oluştu.");
        return;
      }

      const matchFound = !!data && data.length > 0;
      setStatus(matchFound ? "blocked" : "safe");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Beklenmeyen bir hata oluştu.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          padding: "32px 24px",
          borderRadius: 16,
          backgroundColor: "#020617",
          border: "1px solid #1f2937",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
          🕵️‍♂️ Blacklist Check Ekranı
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "#9ca3af",
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          Resepsiyon burada isim &amp; soyisim ile hızlı kara liste kontrolü yapar.
          Bu ekran Supabase’teki <code>blacklist</code> tablosuna bağlıdır.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 14, marginBottom: 16 }}
        >
          <div>
            <label style={{ fontSize: 11, marginBottom: 4, display: "block" }}>
              İsim
            </label>
            <input
              type="text"
              placeholder="Örn: Ali"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #374151",
                backgroundColor: "#020617",
                color: "#e5e7eb",
                padding: "8px 10px",
                fontSize: 13,
                outline: "none",
              }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: 11, marginBottom: 4, display: "block" }}>
              Soyisim
            </label>
            <input
              type="text"
              placeholder="Örn: Yılmaz"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #374151",
                backgroundColor: "#020617",
                color: "#e5e7eb",
                padding: "8px 10px",
                fontSize: 13,
                outline: "none",
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: 4,
              width: "100%",
              borderRadius: 8,
              border: "none",
              backgroundColor: "#22c55e",
              color: "#020617",
              fontWeight: 600,
              fontSize: 13,
              padding: "9px 0",
              cursor: "pointer",
            }}
            disabled={status === "checking"}
          >
            {status === "checking"
              ? "Kontrol ediliyor..."
              : "Kara listeyi kontrol et"}
          </button>
        </form>

        {status === "safe" && (
          <div
            style={{
              fontSize: 13,
              padding: "8px 10px",
              borderRadius: 8,
              backgroundColor: "#022c22",
              border: "1px solid #22c55e",
              color: "#bbf7d0",
            }}
          >
            ✅ Bu misafir veritabanında kara listede görünmüyor.
          </div>
        )}

        {status === "blocked" && (
          <div
            style={{
              fontSize: 13,
              padding: "8px 10px",
              borderRadius: 8,
              backgroundColor: "#450a0a",
              border: "1px solid #ef4444",
              color: "#fee2e2",
            }}
          >
            🚫 DİKKAT: Bu isim &amp; soyisim{" "}
            <strong>blacklist</strong> tablosunda kayıtlı.
          </div>
        )}

        {status === "error" && (
          <div
            style={{
              fontSize: 13,
              padding: "8px 10px",
              borderRadius: 8,
              backgroundColor: "#450a0a",
              border: "1px solid #ef4444",
              color: "#fee2e2",
              marginTop: 4,
            }}
          >
            ❗ Hata: {error}
          </div>
        )}
      </div>
    </main>
  );
}
