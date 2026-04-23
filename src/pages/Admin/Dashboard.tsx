import { useEffect, useState } from "react";
import { supabase, DatabaseListing } from "@/lib/supabase";
import { navigate, Link } from "@/router";
import { LISTINGS } from "@/data/listings";

export function AdminDashboardPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setError("Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.");
      setLoading(false);
      return;
    }
    checkAuth();
    fetchListings();
  }, []);

  const checkAuth = async () => {
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin-login");
      return;
    }
    setUserEmail(user?.email || null);
    
    // Check if user is admin
    const { data: adminData } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", user.email)
      .single();
    
    setIsAdmin(!!adminData);
  };

  const fetchListings = async () => {
    // Start with mock data
    let allListings = [...LISTINGS];

    // Add Supabase data if available
    if (supabase) {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        // Merge by slug to avoid duplicates, preferring Supabase data
        const supabaseMap = new Map(data.map((l) => [l.slug, l]));
        const mockMap = new Map(LISTINGS.map((l) => [l.slug, l]));
        
        // Combine, with Supabase data taking precedence
        const combined = new Map([...mockMap, ...supabaseMap]);
        allListings = Array.from(combined.values());
      }
    }

    setListings(allListings);
    setLoading(false);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    // If it's a Supabase listing (has id), delete from database
    if (id && supabase) {
      const { error } = await supabase.from("listings").delete().eq("id", id);
      if (error) {
        alert("Error deleting from database: " + error.message);
        return;
      }
    }
    
    // Remove from local state
    setListings(listings.filter((l) => l.id !== id));
  };

  const handleToggleVerify = async (id: string, currentStatus: boolean) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("listings")
      .update({ verified: !currentStatus })
      .eq("id", id);
    
    if (!error) {
      setListings(listings.map(l => 
        l.id === id ? { ...l, verified: !currentStatus } : l
      ));
    }
  };

  // Calculate statistics
  const stats = {
    totalListings: listings.length,
    verifiedListings: listings.filter(l => l.verified).length,
    pendingListings: listings.filter(l => !l.verified).length,
    avgPrice: listings.length > 0 
      ? Math.round(listings.reduce((sum, l) => sum + (l.price_per_night || l.pricePerNight || 0), 0) / listings.length)
      : 0,
    totalReviews: listings.reduce((sum, l) => sum + (l.reviews || 0), 0),
    avgRating: listings.length > 0
      ? (listings.reduce((sum, l) => sum + (l.rating || 0), 0) / listings.length).toFixed(1)
      : "0.0",
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center">
        <div className="max-w-md text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-[var(--color-ink-2)] text-sm">Add Supabase credentials to your .env file to use the admin panel.</p>
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
          <p className="text-[var(--color-ink-2)] mb-6">You don't have admin privileges. Contact the site administrator.</p>
          <button
            onClick={handleLogout}
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
            <div>
              <h1 className="font-serif text-2xl text-[var(--color-ink)]">Nairobi Spaces</h1>
              <p className="text-sm text-[var(--color-ink-2)]">Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--color-ink-2)]">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-[var(--color-ink-2)] hover:text-[var(--color-gold)] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-[var(--color-line)]">
            <div className="text-xs uppercase tracking-widest text-[var(--color-mute)] mb-2">Total Listings</div>
            <div className="font-serif text-3xl text-[var(--color-ink)]">{stats.totalListings}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[var(--color-line)]">
            <div className="text-xs uppercase tracking-widest text-[var(--color-mute)] mb-2">Verified</div>
            <div className="font-serif text-3xl text-[var(--color-emerald)]">{stats.verifiedListings}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[var(--color-line)]">
            <div className="text-xs uppercase tracking-widest text-[var(--color-mute)] mb-2">Avg Price</div>
            <div className="font-serif text-3xl text-[var(--color-ink)]">KES {stats.avgPrice.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[var(--color-line)]">
            <div className="text-xs uppercase tracking-widest text-[var(--color-mute)] mb-2">Avg Rating</div>
            <div className="font-serif text-3xl text-[var(--color-gold)]">{stats.avgRating}★</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Link
            to="/admin/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] font-medium hover:bg-[var(--color-gold-dark)] transition-colors"
          >
            <span className="text-xl">+</span> New Listing
          </Link>
          <Link
            to="/admin-neighborhoods"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-gold)] transition-colors"
          >
            🏘️ Manage Neighborhoods
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-gold)] transition-colors"
          >
            View Site →
          </a>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-3xl border border-[var(--color-line)] overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-[var(--color-line)]">
            <h2 className="font-serif text-xl text-[var(--color-ink)]">All Listings</h2>
          </div>
          
          {listings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="font-serif text-xl text-[var(--color-ink)] mb-2">No listings yet</h3>
              <p className="text-[var(--color-ink-2)] mb-6">Create your first listing to get started</p>
              <Link
                to="/admin/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-gold)] text-[var(--color-ink)] font-medium"
              >
                Create Listing →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-cream-2)]">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Property
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Neighborhood
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Price
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Rating
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-xs uppercase tracking-widest text-[var(--color-ink-2)] font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)]">
                  {listings.map((listing) => (
                    <tr key={listing.id || listing.slug} className="hover:bg-[var(--color-cream-2)] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--color-cream-2)]">
                            <img src={listing.cover} alt={listing.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-medium text-[var(--color-ink)]">{listing.title}</div>
                            <div className="text-xs text-[var(--color-mute)]">/{listing.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-ink-2)]">{listing.neighborhood}</td>
                      <td className="px-6 py-4 text-[var(--color-ink)] font-medium">
                        KES {(listing.price_per_night || listing.pricePerNight || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-[var(--color-gold)]">★</span>
                          <span className="text-[var(--color-ink-2)]">{listing.rating}</span>
                          <span className="text-[var(--color-mute)] text-xs">({listing.reviews})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleVerify(listing.id, listing.verified)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            listing.verified
                              ? "bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] border border-[var(--color-emerald)]/30"
                              : "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30"
                          }`}
                        >
                          {listing.verified ? "✓ Verified" : "Pending"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`#/stays/${listing.slug}`}
                            className="p-2 rounded-lg hover:bg-[var(--color-cream-2)] text-[var(--color-ink-2)] hover:text-[var(--color-gold)] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View"
                          >
                            👁
                          </a>
                          <button
                            onClick={() => navigate(`/admin/edit/${listing.id}`)}
                            className="p-2 rounded-lg hover:bg-[var(--color-cream-2)] text-[var(--color-ink-2)] hover:text-[var(--color-gold)] transition-colors"
                            title="Edit"
                          >
                            ✏
                          </button>
                          <button
                            onClick={() => handleDelete(listing.id)}
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
