import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { navigate, Link } from "@/router";
import { GUIDES } from "@/data/neighborhoods";

type Neighborhood = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  vibe: string;
  best_for: string[];
  know_before: string[];
  cover: string;
  seo_intro: string;
  created_at: string;
};

export function AdminNeighborhoodsPage() {
  const [neighborhoods, setNeighborhoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    tagline: "",
    vibe: "",
    best_for: [] as string[],
    know_before: [] as string[],
    cover: "",
    seo_intro: "",
  });

  useEffect(() => {
    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }
    checkAuth();
    fetchNeighborhoods();
  }, []);

  const checkAuth = async () => {
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin-login");
      return;
    }
    setUserEmail(user?.email || null);
    
    const { data: adminData } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", user.email)
      .single();
    
    setIsAdmin(!!adminData);
  };

  const fetchNeighborhoods = async () => {
    // Start with mock data
    let allNeighborhoods = [...GUIDES];

    // Add Supabase data if available
    if (supabase) {
      const { data, error } = await supabase
        .from("neighborhoods")
        .select("*")
        .order("name", { ascending: true });

      if (!error && data && data.length > 0) {
        // Merge by slug to avoid duplicates, preferring Supabase data
        const supabaseMap = new Map(data.map((n) => [n.slug, n]));
        const mockMap = new Map(GUIDES.map((n) => [n.slug, n]));
        
        // Combine, with Supabase data taking precedence
        const combined = new Map([...mockMap, ...supabaseMap]);
        allNeighborhoods = Array.from(combined.values());
      }
    }

    setNeighborhoods(allNeighborhoods);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this neighborhood?")) return;
    if (!supabase) return;

    const { error } = await supabase.from("neighborhoods").delete().eq("id", id);
    if (!error) {
      setNeighborhoods(neighborhoods.filter((n) => n.id !== id));
    }
  };

  const handleEdit = (neighborhood: Neighborhood) => {
    setEditingId(neighborhood.id);
    setFormData({
      slug: neighborhood.slug,
      name: neighborhood.name,
      tagline: neighborhood.tagline,
      vibe: neighborhood.vibe,
      best_for: neighborhood.best_for,
      know_before: neighborhood.know_before,
      cover: neighborhood.cover,
      seo_intro: neighborhood.seo_intro,
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({
      slug: "",
      name: "",
      tagline: "",
      vibe: "",
      best_for: [],
      know_before: [],
      cover: "",
      seo_intro: "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (!supabase) {
      alert("Supabase is not configured");
      setSaving(false);
      return;
    }

    let error;
    if (editingId) {
      const result = await supabase
        .from("neighborhoods")
        .update(formData)
        .eq("id", editingId);
      error = result.error;
    } else {
      const result = await supabase.from("neighborhoods").insert([formData]);
      error = result.error;
    }

    setSaving(false);

    if (error) {
      alert(`Error saving neighborhood: ${error.message}`);
      return;
    }

    setShowForm(false);
    fetchNeighborhoods();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center">
        <div className="max-w-md text-center">
          <p className="text-red-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center">
        <div className="text-[var(--color-ink-2)]">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center">
        <div className="max-w-md text-center p-8">
          <h1 className="font-serif text-3xl text-[var(--color-ink)] mb-4">Access Denied</h1>
          <p className="text-[var(--color-ink-2)] mb-6">You don't have admin privileges.</p>
          <button
            onClick={() => navigate("/admin-login")}
            className="px-6 py-2 rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-gold)] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin"
                className="text-[var(--color-ink-2)] hover:text-[var(--color-gold)] transition-colors"
              >
                ← Dashboard
              </Link>
              <h1 className="font-serif text-2xl text-[var(--color-ink)]">Neighborhoods</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--color-ink-2)]">{userEmail}</span>
              <button
                onClick={() => navigate("/admin-login")}
                className="text-sm text-[var(--color-ink-2)] hover:text-[var(--color-gold)] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleNew}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] font-medium hover:bg-[var(--color-gold-dark)] transition-colors"
          >
            <span className="text-xl">+</span> New Neighborhood
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-[var(--color-line)] flex items-center justify-between">
                <h2 className="font-serif text-xl text-[var(--color-ink)]">
                  {editingId ? "Edit Neighborhood" : "New Neighborhood"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[var(--color-line)] focus:border-[var(--color-gold)] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                    className="w-full px-4 py-2 rounded-xl border border-[var(--color-line)] focus:border-[var(--color-gold)] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[var(--color-line)] focus:border-[var(--color-gold)] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Vibe</label>
                  <textarea
                    value={formData.vibe}
                    onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[var(--color-line)] focus:border-[var(--color-gold)] outline-none"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">Cover Image URL</label>
                  <input
                    type="url"
                    value={formData.cover}
                    onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[var(--color-line)] focus:border-[var(--color-gold)] outline-none"
                    required
                  />
                  {formData.cover && (
                    <img src={formData.cover} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-xl" />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-2">SEO Intro</label>
                  <textarea
                    value={formData.seo_intro}
                    onChange={(e) => setFormData({ ...formData, seo_intro: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-[var(--color-line)] focus:border-[var(--color-gold)] outline-none"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-gold)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-6 py-3 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] font-medium hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Neighborhoods Table */}
        <div className="bg-white rounded-3xl border border-[var(--color-line)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--color-line)]">
            <h2 className="font-serif text-xl text-[var(--color-ink)]">All Neighborhoods</h2>
          </div>
          
          {neighborhoods.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🏘️</div>
              <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">No neighborhoods yet</h3>
              <p className="text-[var(--color-ink-2)] mb-6">Create your first neighborhood guide</p>
              <button
                onClick={handleNew}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] font-medium"
              >
                Create Neighborhood →
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-cream-2)]">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Neighborhood
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Tagline
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Best For
                    </th>
                    <th className="text-right px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)]">
                  {neighborhoods.map((neighborhood) => (
                    <tr key={neighborhood.id} className="hover:bg-[var(--color-cream-2)] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--color-cream-2)]">
                            <img src={neighborhood.cover} alt={neighborhood.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium text-[var(--color-ink)]">{neighborhood.name}</div>
                            <div className="text-xs text-[var(--color-mute)]">/{neighborhood.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-ink-2)] max-w-xs truncate">{neighborhood.tagline}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {(neighborhood.best_for || []).slice(0, 2).map((item: string, i: number) => (
                            <span key={i} className="px-2 py-1 rounded-full text-xs bg-[var(--color-cream-2)] text-[var(--color-ink-2)]">
                              {item}
                            </span>
                          ))}
                          {(neighborhood.best_for || []).length > 2 && (
                            <span className="text-xs text-[var(--color-mute)]">+{(neighborhood.best_for || []).length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`#/neighborhoods/${neighborhood.slug}`}
                            className="p-2 rounded-lg hover:bg-[var(--color-cream-2)] text-[var(--color-ink-2)] hover:text-[var(--color-gold)] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View"
                          >
                            👁
                          </a>
                          <button
                            onClick={() => handleEdit(neighborhood)}
                            className="p-2 rounded-lg hover:bg-[var(--color-cream-2)] text-[var(--color-ink-2)] hover:text-[var(--color-gold)] transition-colors"
                            title="Edit"
                          >
                            ✏
                          </button>
                          <button
                            onClick={() => handleDelete(neighborhood.id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-[var(--color-ink-2)] hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
