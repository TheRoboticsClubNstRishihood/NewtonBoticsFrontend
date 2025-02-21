"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  AlertCircle,
  XCircle,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import clubData from "../AllDatas/data.json";

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Get inventory data from JSON
  const inventoryData = clubData.labDetails.inventory;

  // Filter inventory items based on search and category
  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "All" || item.category === filterCategory)
  );

  // Get unique categories for the filter dropdown
  const categories = [
    "All",
    ...new Set(inventoryData.map((item) => item.category)),
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">
          Robotics Lab Inventory
        </h1>
        <p className="text-lg text-white/80">
          Explore all the tools, components, and equipment available in our lab.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80" />
          </div>

          {/* Category Filter */}
          <div className="relative w-full md:w-1/3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80" />
          </div>
        </div>
      </motion.div>

      {/* Inventory Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {filteredInventory.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-red-500/50 transition-all relative"
            whileHover={{ scale: 1.05 }}
          >
            {/* Low Stock or Out of Stock Indicator */}
            {item.quantity <= 0 ? (
              <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full flex items-center text-sm">
                <XCircle className="w-4 h-4 mr-2" />
                Out of Stock
              </div>
            ) : item.quantity <= 5 ? (
              <div className="absolute top-4 right-4 bg-yellow-500/90 text-white px-3 py-1 rounded-full flex items-center text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                Low Stock
              </div>
            ) : (
              <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Available
              </div>
            )}

            {/* Item Image */}
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Item Details */}
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              {item.name}
            </h3>
            <p className="text-white/80 mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-500">{item.category}</span>
              <span className="text-sm text-white/80">
                Quantity: {item.quantity}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InventoryPage;
