"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FITTING_STORAGE_KEY,
  parseFittingProfile,
  type FittingProfile,
} from "@/lib/fitting";

export function useFittingProfile() {
  const [profile, setProfile] = useState<FittingProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(FITTING_STORAGE_KEY);
      setProfile(stored ? parseFittingProfile(JSON.parse(stored)) : null);
    } catch {
      setProfile(null);
    }
    setReady(true);
  }, []);

  const save = useCallback((next: FittingProfile) => {
    window.localStorage.setItem(FITTING_STORAGE_KEY, JSON.stringify(next));
    setProfile(next);
  }, []);

  const clear = useCallback(() => {
    window.localStorage.removeItem(FITTING_STORAGE_KEY);
    setProfile(null);
  }, []);

  return { profile, ready, save, clear };
}
