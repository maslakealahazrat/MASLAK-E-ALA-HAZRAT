"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Item = {
  id: string;
  title: string;
  slug: string;
  content_type: string;
  status: string;
  body: string | null;
  summary: string | null;
  language: string | null;
  author: string | null;
  source_name: string | null;
  source_reference: string | null;
  keywords: string[] | null;
};

const empty = {
  title: "",
  slug: "",
  content_type: "article",
  status: "draft",
  summary: "",
  body: "",
  language: "ur",
  author: "",
  source_name: "",
  source_reference: "",
  keywords: "",
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState("Loading...");
  const [busy, setBusy] = useState(false);

  const isAdmin = user?.app_metadata?.role === "admin";

  useEffect(() => {
    if (!supabase) {
      setMessage(
        "Supabase configuration missing. Check your deployment environment variables."
      );
      return;
    }

    supabase.auth.getUser().then(({ data, error }) => {
      setUser(data.user);
      setMessage(
        error
          ? error.message
          : data.user
            ? "Signed in."
            : "Please sign in."
      );
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadItems() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("content_items")
      .select(
        "id,title,slug,content_type,status,body,summary,language,author,source_name,source_reference,keywords"
      )
      .order("updated_at", { ascending: false })
      .limit(100);

    if (error) {
      setMessage(error.message);
    } else {
      setItems((data ?? []) as Item[]);
    }
  }

  useEffect(() => {
    if (isAdmin) void loadItems();
  }, [isAdmin]);

  async function signIn(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;

    setBusy(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setBusy(false);
    setMessage(
      error?.message ?? "Signed in. Checking admin access..."
    );
  }

  async function save(e: FormEvent) {
    e.preventDefault();

    if (!supabase || !isAdmin) return;

    setBusy(true);

    const payload = {
      ...form,
      keywords: form.keywords
        .split(",")
        .map((word) => word.trim())
        .filter(Boolean),
      updated_by: user?.id,
      ...(form.status === "published"
        ? { published_at: new Date().toISOString() }
        : {}),
    };

    const result = editing
      ? await supabase
          .from("content_items")
          .update(payload)
          .eq("id", editing)
      : await supabase.from("content_items").insert({
          ...payload,
          created_by: user?.id,
        });

    setBusy(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage("Content saved successfully.");
    setForm(empty);
    setEditing(null);
    await loadItems();
  }

  function edit(item: Item) {
    setEditing(item.id);

    setForm({
      title: item.title,
      slug: item.slug,
      content_type: item.content_type,
      status: item.status,
      summary: item.summary ?? "",
      body: item.body ?? "",
      language: item.language ?? "ur",
      author: item.author ?? "",
      source_name: item.source_name ?? "",
      source_reference: item.source_reference ?? "",
      keywords: (item.keywords ?? []).join(", "),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id: string) {
    if (!supabase || !isAdmin) return;

    if (!window.confirm("Delete this content permanently?")) return;

    const { error } = await supabase
      .from("content_items")
      .delete()
      .eq("id", id);

    setMessage(error?.message ?? "Content deleted.");

    if (!error) await loadItems();
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setItems([]);
    setMessage("Signed out.");
  }

  return (
    <main className="adminWrap">
      <header className="adminHead">
        <div>
          <p className="adminEyebrow">MASLAK-E-ALA-HAZRAT</p>
          <h1>Content Admin</h1>
          <p>Mobile-friendly content management</p>
        </div>

        {user && (
          <button
            className="adminBtn secondary"
            onClick={signOut}
          >
            Sign out
          </button>
        )}
      </header>

      <p className="adminMessage" role="status">
        {message}
      </p>

      {!user ? (
        <form
          className="adminCard adminLogin"
          onSubmit={signIn}
        >
          <h2>Admin sign in</h2>

          <label>
            Email
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            className="adminBtn"
            disabled={busy || !supabase}
          >
            {busy ? "Please wait..." : "Sign in"}
          </button>
        </form>
      ) : !isAdmin ? (
        <section className="adminCard">
          <h2>Admin access required</h2>
          <p>
            Your account is signed in, but it does not have the
            required secure admin role. The project owner must
            assign the role through a trusted server-side process.
            Never put a Supabase service-role key in website code.
          </p>
        </section>
      ) : (
        <>
          <form
            className="adminCard adminForm"
            onSubmit={save}
          >
            <h2>
              {editing ? "Edit content" : "Add content"}
            </h2>

            <label>
              Title
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </label>

            <label>
              URL slug
              <input
                required
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                placeholder="my-article-slug"
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: e.target.value })
                }
              />
            </label>

            <div className="adminGrid">
              <label>
                Content type
                <select
                  value={form.content_type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      content_type: e.target.value,
                    })
                  }
                >
                  {[
                    "book",
                    "book_chapter",
                    "hadith",
                    "fatwa",
                    "lesson",
                    "naat",
                    "manqabat",
                    "article",
                    "biography",
                    "other",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>

            <label>
              Summary
              <textarea
                rows={2}
                value={form.summary}
                onChange={(e) =>
                  setForm({ ...form, summary: e.target.value })
                }
              />
            </label>

            <label>
              Full content
              <textarea
                rows={8}
                required
                value={form.body}
                onChange={(e) =>
                  setForm({ ...form, body: e.target.value })
                }
              />
            </label>

            <div className="adminGrid">
              <label>
                Language
                <input
                  value={form.language}
                  onChange={(e) =>
                    setForm({ ...form, language: e.target.value })
                  }
                />
              </label>

              <label>
                Author
                <input
                  value={form.author}
                  onChange={(e) =>
                    setForm({ ...form, author: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="adminGrid">
              <label>
                Source name
                <input
                  value={form.source_name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      source_name: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Source reference
                <input
                  value={form.source_reference}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      source_reference: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <label>
              Keywords (comma separated)
              <input
                value={form.keywords}
                onChange={(e) =>
                  setForm({ ...form, keywords: e.target.value })
                }
              />
            </label>

            <div className="adminActions">
              <button className="adminBtn" disabled={busy}>
                {busy
                  ? "Saving..."
                  : editing
                    ? "Update content"
                    : "Save content"}
              </button>

              {editing && (
                <button
                  type="button"
                  className="adminBtn secondary"
                  onClick={() => {
                    setEditing(null);
                    setForm(empty);
                  }}
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>

          <section className="adminCard">
            <div className="adminListHead">
              <h2>Saved content</h2>
              <button
                className="adminBtn secondary"
                onClick={() => void loadItems()}
              >
                Refresh
              </button>
            </div>

            {items.length === 0 ? (
              <p>No content found yet.</p>
            ) : (
              <div className="adminItems">
                {items.map((item) => (
                  <article className="adminItem" key={item.id}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>
                        /{item.slug} · {item.content_type} ·{" "}
                        <span className={`status-${item.status}`}>
                          {item.status}
                        </span>
                      </p>
                    </div>

                    <div className="adminActions">
                      <button
                        className="adminBtn secondary"
                        onClick={() => edit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="adminBtn danger"
                        onClick={() => void remove(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
      }
