"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  User, 
  Clock, 
  Search, 
  Filter, 
  ArrowRight, 
  Tag,
  BookOpen,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import newsService from "../../lib/news";

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allNews, setAllNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState([]); // [{id,name}]
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Initial fetch from public API
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        setError("");
        
        // Fetch news first
        let items = [];
        try {
          const res = await newsService.listNews({ isPublished: true, limit: 50, skip: 0 });
          items = res?.items || [];
          if (isMounted) {
            setAllNews(items);
            setFilteredNews(items);
          }
        } catch (e) {
          console.error('Error loading news:', e);
          if (isMounted) {
            setError(e.message || "Failed to load news");
            // Set empty arrays to prevent further errors
            setAllNews([]);
            setFilteredNews([]);
          }
        }
        
        // Fetch categories separately; do not block the news list if this fails
        try {
          const cats = await newsService.listCategories();
          if (isMounted) {
            setCategories([{ id: "All", name: "All" }, ...cats.map((c) => ({ id: c._id || c.id, name: c.name }))]);
          }
        } catch (catError) {
          console.error('Error loading categories:', catError);
          if (isMounted) {
            // Ignore category error if news loaded; keep default "All"
            setCategories([{ id: "All", name: "All" }]);
            if (items.length > 0) {
              setError(""); // Clear error if news loaded successfully
            }
          }
        }
      } catch (e) {
        if (!isMounted) return;
        console.error('General error:', e);
        setError(e.message || "Failed to load news");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  // Filter news based on category and search query
  useEffect(() => {
    let filtered = allNews;
    
    // Filter by category id (news.categoryId)
    if (selectedCategory !== "All") {
      filtered = filtered.filter(news => (news.categoryId || news.category?._id || "") === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(news => {
        const title = (news.title || '').toLowerCase();
        const excerpt = (news.excerpt || '').toLowerCase();
        const content = (news.content || '').toLowerCase();
        const tags = (news.tags || []).map(t => String(t).toLowerCase());
        return title.includes(q) || excerpt.includes(q) || content.includes(q) || tags.some(t => t.includes(q));
      });
    }

    // Filter by featured only
    if (showFeaturedOnly) {
      filtered = filtered.filter(news => news.isFeatured);
    }
    
    setFilteredNews(filtered);
  }, [selectedCategory, searchQuery, allNews, showFeaturedOnly]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Achievement': 'bg-green-500/80',
      'Workshop': 'bg-blue-500/80',
      'Project Update': 'bg-purple-500/80',
      'Partnership': 'bg-orange-500/80',
      'Event': 'bg-pink-500/80',
      'Publication': 'bg-indigo-500/80',
      'Announcement': 'bg-red-500/80'
    };
    return colors[category] || 'bg-gray-500/80';
  };

  const getCategoryName = (news) => {
    return news.category?.name || news.categoryId || 'News';
  };

  const getImageUrl = (news) => {
    return news.featuredImageUrl || news.image || "/next.svg";
  };

  const getReadTime = (news) => {
    return news.readTime || '5 min read';
  };

  const getAuthor = (news) => {
    return news.author || 'NewtonBotics Team';
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setShowFeaturedOnly(false);
  };

  const hasActiveFilters = selectedCategory !== "All" || searchQuery || showFeaturedOnly;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-white">Loading Latest News...</h2>
        </div>
      </div>
    );
  }

  if (error && allNews.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading News</h2>
          <p className="text-white/60 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          Latest News & Updates
        </h1>
        <p className="text-lg text-white/80 max-w-3xl mx-auto">
          Stay informed about our latest achievements, events, workshops, and groundbreaking projects in robotics and technology.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-white">Filters & Search</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 pointer-events-none" />
            </div>

            {/* Featured Filter */}
            <div className="flex items-center justify-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="w-4 h-4 text-red-500 bg-white/10 border-white/20 rounded focus:ring-red-500 focus:ring-2"
                />
                <span className="text-white/80">Featured Only</span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
          
          {/* Results count */}
          <div className="mt-4 text-center text-white/60">
            Showing {filteredNews.length} of {allNews.length} articles
          </div>
        </div>
      </motion.div>

      {/* News Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{filteredNews?.length || 0}</div>
            <div className="text-sm text-white/60">Total Articles</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">
              {filteredNews?.filter(news => news.isFeatured).length || 0}
            </div>
            <div className="text-sm text-white/60">Featured</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">
              {new Set(filteredNews?.map(news => getCategoryName(news))).size || 0}
            </div>
            <div className="text-sm text-white/60">Categories</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">
              {filteredNews?.filter(news => 
                new Date(news.publishedAt || news.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ).length || 0}
            </div>
            <div className="text-sm text-white/60">This Month</div>
          </div>
        </div>
      </motion.div>

      {/* Featured News Section */}
      {filteredNews.filter(news => news.isFeatured).length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center font-display">
            <TrendingUp className="mr-3 text-red-500" /> Featured Stories
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredNews.filter(news => news.isFeatured).slice(0, 2).map((news, index) => (
              <motion.div
                key={news._id || news.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-red-500/10 group hover:bg-white/10 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getImageUrl(news)}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(getCategoryName(news))} text-white`}>
                      {getCategoryName(news)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-lg">
                      {getReadTime(news)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(news.publishedAt || news.createdAt)}</span>
                    <span>•</span>
                    <User className="w-4 h-4" />
                    <span>{getAuthor(news)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-white/80 mb-4 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(news.tags || []).slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/News/${news._id || news.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 rounded-lg font-semibold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center gap-2 group"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto text-center py-8 text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* All News Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center font-display">
          <BookOpen className="mr-3 text-red-500" /> All News
        </h2>
        
        {filteredNews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-white mb-2">No news found</h3>
            <p className="text-white/60">
              {searchQuery || selectedCategory !== "All" || showFeaturedOnly
                ? "Try adjusting your search or filter criteria."
                : "No news articles are currently available."
              }
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news, index) => (
              <motion.div
                key={news._id || news.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-red-500/10 group hover:bg-white/10 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={getImageUrl(news)}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(getCategoryName(news))} text-white`}>
                      {getCategoryName(news)}
                    </span>
                  </div>
                  {news.isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/80 text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(news.publishedAt || news.createdAt)}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{getReadTime(news)}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {news.title}
                  </h4>
                  <p className="text-white/80 text-sm mb-3 line-clamp-3">
                    {news.excerpt || ''}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {(news.tags || []).slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {getAuthor(news)}
                    </span>
                    <Link href={`/News/${news._id || news.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Newsletter Signup */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mt-16"
      >
        <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-3xl p-8 text-center backdrop-blur-xl border border-white/10 shadow-2xl shadow-red-500/20">
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
            Stay Updated
          </h3>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <NewsletterForm />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default NewsPage; 

// Newsletter form component
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await newsService.subscribeNewsletter({ email });
      setMessage(res.message || "Subscribed successfully");
      setEmail("");
    } catch (e) {
      setError(e.message || "Subscription failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4 w-full">
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-white/60 backdrop-blur-lg"
      />
      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
        disabled={isSubmitting}
        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all disabled:opacity-60"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </motion.button>
      {(message || error) && (
        <div className={`w-full text-sm ${error ? 'text-red-400' : 'text-green-400'} sm:col-span-2`}>{error || message}</div>
      )}
    </form>
  );
}