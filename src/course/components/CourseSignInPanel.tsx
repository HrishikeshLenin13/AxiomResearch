import { FormEvent, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCourse } from "../context/CourseProvider";

type CourseSignInPanelProps = {
  onSuccess?: () => void;
};

export function CourseSignInPanel({ onSuccess }: CourseSignInPanelProps) {
  const navigate = useNavigate();
  const { configured, signInWithGoogle, signInWithEmail, signUpWithEmail } = useCourse();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function goDashboard() {
    onSuccess?.();
    await navigate({ to: "/learn/dashboard" });
  }

  async function handleGoogle() {
    setError("");
    setSubmitting(true);
    try {
      if (!configured) {
        setError("Firebase is not configured. Add all VITE_FIREBASE_* variables in Vercel, then redeploy (env vars only apply after a new build).");
        return;
      }
      await signInWithGoogle();
      await goDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (!configured) {
        setError("Firebase is not configured. Add all VITE_FIREBASE_* variables in Vercel, then redeploy (env vars only apply after a new build).");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (mode === "signin") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      await goDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="course-card p-6 md:p-8 mt-8 max-w-xl">
      <p className="course-kicker">Sign in to start</p>
      <h2 className="text-xl font-semibold mt-1">Create an account or log in</h2>
      <p className="text-sm text-[var(--course-ink-soft)] mt-2">
        Use Google or your email. We track your progress and study time by account.
      </p>

      <button
        type="button"
        disabled={submitting}
        onClick={() => void handleGoogle()}
        className="course-btn-google w-full mt-5 disabled:opacity-60"
      >
        <GoogleMark />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-[var(--course-line)]" />
        <span className="text-xs text-[var(--course-ink-soft)] uppercase tracking-wider">or email</span>
        <div className="h-px flex-1 bg-[var(--course-line)]" />
      </div>

      <form onSubmit={(event) => void handleEmailSubmit(event)} className="space-y-3">
        <div>
          <label className="text-sm font-medium" htmlFor="course-auth-email">
            Email
          </label>
          <input
            id="course-auth-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--course-line)] bg-white px-4 py-3 text-sm"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="course-auth-password">
            Password
          </label>
          <input
            id="course-auth-password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--course-line)] bg-white px-4 py-3 text-sm"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
          />
        </div>

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="course-btn-primary w-full !py-3 disabled:opacity-60"
        >
          {submitting ? "Please wait..." : mode === "signin" ? "Sign in with email" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode((current) => (current === "signin" ? "signup" : "signin"))}
        className="mt-4 w-full text-sm text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]"
      >
        {mode === "signin" ? "Need an account? Sign up with email" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.203 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 29.082 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 29.082 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}
