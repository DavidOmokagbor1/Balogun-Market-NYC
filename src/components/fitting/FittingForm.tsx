"use client";

import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { FITTING_US_SIZES, type FittingProfile } from "@/lib/fitting";
import { useFittingProfile } from "./useFittingProfile";

const FIELD: CSSProperties = {
  width: "100%",
  minHeight: 48,
  padding: "0 0.9rem",
  border: "1px solid rgba(245,241,232,0.14)",
  borderRadius: 0,
  background: "#111111",
  color: "#F5F1E8",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.72rem",
  outline: "none",
};

const LABEL: CSSProperties = {
  display: "block",
  marginBottom: "0.55rem",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.5rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(245,241,232,0.45)",
};

function emptyDraft(): FittingProfile {
  return { bust: undefined, waist: undefined, hip: undefined, height: undefined, usualUsSize: "" };
}

export function FittingForm() {
  const { profile, ready, save, clear } = useFittingProfile();
  const [draft, setDraft] = useState<FittingProfile>(emptyDraft());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (ready) setDraft(profile ?? emptyDraft());
  }, [profile, ready]);

  function setNumber(key: keyof FittingProfile, raw: string) {
    const value = raw.trim() === "" ? undefined : Number(raw);
    setDraft((current) => ({
      ...current,
      [key]: Number.isFinite(value) ? value : undefined,
    }));
    setSaved(false);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    save({
      bust: draft.bust,
      waist: draft.waist,
      hip: draft.hip,
      height: draft.height,
      usualUsSize: draft.usualUsSize || undefined,
    });
    setSaved(true);
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: "2.75rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1rem",
        }}
        className="asa-fitting-grid"
      >
        <Field label="Bust (in)">
          <input
            type="number"
            min={20}
            max={60}
            step={0.5}
            inputMode="decimal"
            value={draft.bust ?? ""}
            onChange={(event) => setNumber("bust", event.target.value)}
            style={FIELD}
          />
        </Field>
        <Field label="Waist (in)">
          <input
            type="number"
            min={18}
            max={55}
            step={0.5}
            inputMode="decimal"
            value={draft.waist ?? ""}
            onChange={(event) => setNumber("waist", event.target.value)}
            style={FIELD}
          />
        </Field>
        <Field label="Hip (in)">
          <input
            type="number"
            min={24}
            max={65}
            step={0.5}
            inputMode="decimal"
            value={draft.hip ?? ""}
            onChange={(event) => setNumber("hip", event.target.value)}
            style={FIELD}
          />
        </Field>
        <Field label="Height (in)">
          <input
            type="number"
            min={50}
            max={80}
            step={0.5}
            inputMode="decimal"
            value={draft.height ?? ""}
            onChange={(event) => setNumber("height", event.target.value)}
            style={FIELD}
          />
        </Field>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="usual-size" style={LABEL}>
          Usual US size
        </label>
        <select
          id="usual-size"
          value={draft.usualUsSize ?? ""}
          onChange={(event) => {
            setDraft((current) => ({ ...current, usualUsSize: event.target.value }));
            setSaved(false);
          }}
          style={FIELD}
        >
          <option value="">Select</option>
          {FITTING_US_SIZES.map((size) => (
            <option key={size} value={size}>
              US {size}
            </option>
          ))}
        </select>
      </div>

      <p
        style={{
          margin: "1.25rem 0 0",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.68rem",
          lineHeight: 1.7,
          color: "rgba(245,241,232,0.35)",
        }}
      >
        Bust, waist, and hip give the truest suggestion. Usual size is enough to
        start. Kept on this device — not sent to an account.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          marginTop: "1.75rem",
        }}
      >
        <button
          type="submit"
          className="btn-gold"
          style={{
            padding: "0.85rem 1.75rem",
            background: "#C9A86A",
            color: "#0A0A0A",
            border: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Save measurements
        </button>
        {profile && (
          <button
            type="button"
            onClick={() => {
              clear();
              setDraft(emptyDraft());
              setSaved(false);
            }}
            style={{
              padding: "0.85rem 0",
              background: "none",
              border: "none",
              color: "rgba(245,241,232,0.45)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Clear
          </button>
        )}
        {saved && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C9A86A",
            }}
          >
            Saved
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label style={LABEL}>{label}</label>
      {children}
    </div>
  );
}
