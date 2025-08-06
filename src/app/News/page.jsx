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
import clubData from "../AllDatas/data.json";

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState(clubData.news?.latest || []);

  // Filter news based on category and search query
  useEffect(() => {
    let filtered = clubData.news?.latest || [];
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredNews(filtered);
  }, [selectedCategory, searchQuery]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {clubData.news?.categories?.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                {category}
              </motion.button>
            ))}
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
            <div className="text-2xl font-bold text-red-400">{clubData.news?.latest?.length || 0}</div>
            <div className="text-sm text-white/60">Total Articles</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">
              {clubData.news?.latest?.filter(news => news.featured).length || 0}
            </div>
            <div className="text-sm text-white/60">Featured</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">
              {new Set(clubData.news?.latest?.map(news => news.category)).size || 0}
            </div>
            <div className="text-sm text-white/60">Categories</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">
              {clubData.news?.latest?.filter(news => 
                new Date(news.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ).length || 0}
            </div>
            <div className="text-sm text-white/60">This Month</div>
          </div>
        </div>
      </motion.div>

      {/* Featured News Section */}
      {filteredNews.filter(news => news.featured).length > 0 && (
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
            {filteredNews.filter(news => news.featured).slice(0, 2).map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-red-500/10 group hover:bg-white/10 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)} text-white`}>
                      {news.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-lg">
                      {news.readTime}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(news.date)}</span>
                    <span>•</span>
                    <User className="w-4 h-4" />
                    <span>{news.author}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-white/80 mb-4 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 rounded-lg font-semibold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center gap-2 group"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
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
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-red-500/10 group hover:bg-white/10 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)} text-white`}>
                      {news.category}
                    </span>
                  </div>
                  {news.featured && (
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
                    <span>{formatDate(news.date)}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{news.readTime}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {news.title}
                  </h4>
                  <p className="text-white/80 text-sm mb-3 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {news.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {news.author}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
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
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-white/60 backdrop-blur-lg"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default NewsPage; 