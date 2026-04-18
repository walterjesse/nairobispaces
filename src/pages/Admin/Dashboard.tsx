import { useEffect, useState } from "react";
import { supabase, DatabaseListing } from "@/lib/supabase";
import { navigate, Link } from "@/router";

export function AdminDashboardPage() {
  const [listings, setListings] = useState<DatabaseListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchListings();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin-login");
      return;
    }
    setUserEmail(user?.email || null);
  };

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setListings(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (!error) {
      setListings(listings.filter((l) => l.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-stone-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-900">
            Admin Dashboard
          </h1>
          <p className="text-stone-600">
            Manage your listings{userEmail && ` • ${userEmail}`}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/new"
            className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors font-medium"
          >
            + New Listing
          </Link>
          <button
            onClick={handleLogout}
            className="border border-stone-300 text-stone-700 px-4 py-2 rounded-lg hover:bg-stone-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-xl">
          <p className="text-stone-600 mb-4">No listings found</p>
          <Link
            to="/admin/new"
            className="text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Create your first listing →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-stone-700">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-stone-700">
                  Neighborhood
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-stone-700">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-stone-700">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-stone-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-stone-900">
                      {listing.title}
                    </div>
                    <div className="text-sm text-stone-500">/{listing.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-stone-700">
                    {listing.neighborhood}
                  </td>
                  <td className="px-6 py-4 text-stone-700">
                    KES {listing.price_per_night.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {listing.verified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href={`#/stays/${listing.slug}`}
                        className="text-stone-500 hover:text-emerald-700 px-2 py-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                      <button
                        onClick={() => navigate(`/admin/edit/${listing.id}`)}
                        className="text-stone-500 hover:text-emerald-700 px-2 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="text-stone-500 hover:text-red-600 px-2 py-1"
                      >
                        Delete
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
  );
}
