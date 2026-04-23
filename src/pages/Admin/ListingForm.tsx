import { useEffect, useState } from "react";
import { supabase, DatabaseListing } from "@/lib/supabase";
import { navigate, useHashRoute, parseRoute } from "@/router";
import { NEIGHBORHOODS, PERFECT_FOR_TAGS, ALL_AMENITIES } from "@/data/listings";

export function AdminListingFormPage() {
  const route = useHashRoute();
  const r = parseRoute(route);
  const isEdit = r.name === "admin-edit";
  const listingId = isEdit ? r.param : null;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState<Partial<DatabaseListing>>({
    slug: "",
    title: "",
    neighborhood: "Westlands",
    price_per_night: 0,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    max_guests: 2,
    perfect_for: [],
    amenities: [],
    cover: "",
    gallery: [],
    short_pitch: "",
    description: "",
    area_notes: "",
    rules: [],
    check_in: "",
    rating: 5.0,
    reviews: 0,
    verified: false,
  });

  useEffect(() => {
    checkAuth();
    if (isEdit && listingId) {
      fetchListing(listingId);
    }
  }, [isEdit, listingId]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin-login");
      return;
    }
    setUser(user);
  };

  const fetchListing = async (id: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setFormData(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (!supabase) {
      alert("Supabase is not configured");
      setSaving(false);
      return;
    }

    // Convert field names to match database schema
    const dbData = {
      ...formData,
      perfect_for: formData.perfect_for,
      price_per_night: formData.price_per_night,
      max_guests: formData.max_guests,
      check_in: formData.check_in,
      video_poster: formData.video_poster,
      short_pitch: formData.short_pitch,
      area_notes: formData.area_notes,
    };

    let error;
    if (isEdit && listingId) {
      const result = await supabase
        .from("listings")
        .update(dbData)
        .eq("id", listingId);
      error = result.error;
    } else {
      const result = await supabase.from("listings").insert([dbData]);
      error = result.error;
    }

    setSaving(false);

    if (error) {
      alert(`Error saving listing: ${error.message}`);
      return;
    }

    navigate("/admin");
  };

  const handleArrayToggle = (
    field: "perfect_for" | "amenities",
    value: string
  ) => {
    setFormData((prev) => {
      const current = prev[field] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleGalleryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gallery: value.split("\n").filter((url) => url.trim()),
    }));
  };

  const handleRulesChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      rules: value.split("\n").filter((rule) => rule.trim()),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center">
        <div className="text-[var(--color-ink-2)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-line)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin")}
                className="text-[var(--color-ink-2)] hover:text-[var(--color-gold)] transition-colors"
              >
                ← Back
              </button>
              <h1 className="font-serif text-2xl text-[var(--color-ink)]">
                {isEdit ? "Edit Listing" : "New Listing"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <section className="bg-white rounded-3xl border border-[var(--color-line)] p-6 sm:p-8">
            <h2 className="font-serif text-xl text-[var(--color-ink)] mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                  placeholder="Luxury apartment in Westlands"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                  placeholder="westlands-luxury-apartment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Neighborhood *
                </label>
                <select
                  required
                  value={formData.neighborhood}
                  onChange={(e) =>
                    setFormData({ ...formData, neighborhood: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors bg-white"
                >
                  {NEIGHBORHOODS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Price per Night (KES) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price_per_night}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price_per_night: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                  placeholder="15000"
                />
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="bg-white rounded-3xl border border-[var(--color-line)] p-6 sm:p-8">
            <h2 className="font-serif text-xl text-[var(--color-ink)] mb-6">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bedrooms: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Beds
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.beds}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      beds: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Baths
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.baths}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      baths: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Max Guests
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.max_guests}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      max_guests: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="bg-white rounded-3xl border border-[var(--color-line)] p-6 sm:p-8">
            <h2 className="font-serif text-xl text-[var(--color-ink)] mb-6">
              Description
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Short Pitch
                </label>
                <input
                  type="text"
                  value={formData.short_pitch}
                  onChange={(e) =>
                    setFormData({ ...formData, short_pitch: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                  placeholder="A stunning apartment with city views"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Full Description
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors resize-none"
                  placeholder="Describe the property in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Area Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.area_notes}
                  onChange={(e) =>
                    setFormData({ ...formData, area_notes: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors resize-none"
                  placeholder="Information about the neighborhood..."
                />
              </div>
            </div>
          </section>

          {/* Tags & Amenities */}
          <section className="bg-white rounded-3xl border border-[var(--color-line)] p-6 sm:p-8">
            <h2 className="font-serif text-xl text-[var(--color-ink)] mb-6">
              Tags & Amenities
            </h2>

            <div className="mb-8">
              <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-3">
                Perfect For
              </label>
              <div className="flex flex-wrap gap-2">
                {PERFECT_FOR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleArrayToggle("perfect_for", tag)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.perfect_for?.includes(tag)
                        ? "bg-[var(--color-gold)] text-[var(--color-ink)] font-medium"
                        : "bg-[var(--color-cream-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-cream-2)]/80"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-3">
                Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_AMENITIES.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleArrayToggle("amenities", amenity)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.amenities?.includes(amenity)
                        ? "bg-[var(--color-emerald)] text-white font-medium"
                        : "bg-[var(--color-cream-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-cream-2)]/80"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="bg-white rounded-3xl border border-[var(--color-line)] p-6 sm:p-8">
            <h2 className="font-serif text-xl text-[var(--color-ink)] mb-6">Images</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.cover}
                  onChange={(e) =>
                    setFormData({ ...formData, cover: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                  placeholder="https://images.unsplash.com/photo-..."
                />
                {formData.cover && (
                  <div className="mt-3 w-full h-48 rounded-2xl overflow-hidden bg-[var(--color-cream-2)]">
                    <img src={formData.cover} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Gallery URLs (one per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.gallery?.join("\n")}
                  onChange={(e) => handleGalleryChange(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors resize-none"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>
            </div>
          </section>

          {/* Other Details */}
          <section className="bg-white rounded-3xl border border-[var(--color-line)] p-6 sm:p-8">
            <h2 className="font-serif text-xl text-[var(--color-ink)] mb-6">
              Additional Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Check-in Info
                </label>
                <input
                  type="text"
                  value={formData.check_in}
                  onChange={(e) =>
                    setFormData({ ...formData, check_in: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                  placeholder="Self-check-in with smart lock"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                  Rules (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.rules?.join("\n")}
                  onChange={(e) => handleRulesChange(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors resize-none"
                  placeholder="No smoking&#10;No pets&#10;Quiet hours after 10pm"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink-2)] mb-2">
                    Reviews Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reviews: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border border-[var(--color-line)] rounded-2xl focus:ring-2 focus:ring-[var(--color-gold)]/20 focus:border-[var(--color-gold)] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--color-cream-2)] rounded-2xl">
                <input
                  type="checkbox"
                  id="verified"
                  checked={formData.verified}
                  onChange={(e) =>
                    setFormData({ ...formData, verified: e.target.checked })
                  }
                  className="w-5 h-5 text-[var(--color-gold)] border-[var(--color-line)] rounded focus:ring-[var(--color-gold)]/20"
                />
                <label htmlFor="verified" className="text-sm text-[var(--color-ink-2)]">
                  Mark as verified listing
                </label>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-4 sticky bottom-0 bg-[var(--color-cream)] py-6 border-t border-[var(--color-line)]">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] font-medium hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Update Listing" : "Create Listing"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="px-6 py-3 rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-gold)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
