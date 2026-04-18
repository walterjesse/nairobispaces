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

    if (isEdit && listingId) {
      await supabase
        .from("listings")
        .update(formData)
        .eq("id", listingId);
    } else {
      await supabase.from("listings").insert([formData]);
    }

    setSaving(false);
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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-stone-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin")}
          className="text-stone-500 hover:text-stone-700"
        >
          ← Back
        </button>
        <h1 className="font-serif text-2xl font-semibold text-stone-900">
          {isEdit ? "Edit Listing" : "New Listing"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <h2 className="font-semibold text-lg text-stone-900 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">
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
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="e.g., westlands-loft"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Neighborhood *
              </label>
              <select
                required
                value={formData.neighborhood}
                onChange={(e) =>
                  setFormData({ ...formData, neighborhood: e.target.value })
                }
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
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
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <h2 className="font-semibold text-lg text-stone-900 mb-4">Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
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
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
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
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
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
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
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
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <h2 className="font-semibold text-lg text-stone-900 mb-4">
            Description
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Short Pitch
              </label>
              <input
                type="text"
                value={formData.short_pitch}
                onChange={(e) =>
                  setFormData({ ...formData, short_pitch: e.target.value })
                }
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="One-line summary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Full Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Area Notes
              </label>
              <textarea
                rows={3}
                value={formData.area_notes}
                onChange={(e) =>
                  setFormData({ ...formData, area_notes: e.target.value })
                }
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Tags & Amenities */}
        <section className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <h2 className="font-semibold text-lg text-stone-900 mb-4">
            Tags & Amenities
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Perfect For
            </label>
            <div className="flex flex-wrap gap-2">
              {PERFECT_FOR_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleArrayToggle("perfect_for", tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.perfect_for?.includes(tag)
                      ? "bg-emerald-700 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_AMENITIES.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => handleArrayToggle("amenities", amenity)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.amenities?.includes(amenity)
                      ? "bg-emerald-700 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <h2 className="font-semibold text-lg text-stone-900 mb-4">Images</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.cover}
                onChange={(e) =>
                  setFormData({ ...formData, cover: e.target.value })
                }
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Gallery URLs (one per line)
              </label>
              <textarea
                rows={4}
                value={formData.gallery?.join("\n")}
                onChange={(e) => handleGalleryChange(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
        </section>

        {/* Other Details */}
        <section className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <h2 className="font-semibold text-lg text-stone-900 mb-4">
            Other Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Check-in Info
              </label>
              <input
                type="text"
                value={formData.check_in}
                onChange={(e) =>
                  setFormData({ ...formData, check_in: e.target.value })
                }
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Rules (one per line)
              </label>
              <textarea
                rows={3}
                value={formData.rules?.join("\n")}
                onChange={(e) => handleRulesChange(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Rating
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.01"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rating: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
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
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) =>
                  setFormData({ ...formData, verified: e.target.checked })
                }
                className="w-4 h-4 text-emerald-700 border-stone-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="verified" className="text-sm text-stone-700">
                Verified listing
              </label>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-700 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors font-medium disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update Listing" : "Create Listing"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="border border-stone-300 text-stone-700 px-6 py-2.5 rounded-lg hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
