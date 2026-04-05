"use client";

import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { Download, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCampaign, setFilterCampaign] = useState("All Campaigns");

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, searchTerm, filterCampaign]);

  const fetchDonations = async () => {
    try {
      const response = await fetch("/api/donations");
      const data = await response.json();
      if (data.success) {
        setDonations(data.donations);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const filterDonations = () => {
    let filtered = donations;

    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCampaign !== "All Campaigns") {
      filtered = filtered.filter(d => d.campaign === filterCampaign);
    }

    setFilteredDonations(filtered);
  };

  const exportToPDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf");
      await import("jspdf-autotable");
      
      const doc = new jsPDF() as any;
      
      // Title
      doc.setFontSize(18);
      doc.text("Rescue Routes - Donation Report", 14, 20);
      
      // Date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 14, 28);
      
      // Total
      const total = filteredDonations.reduce((sum, d) => sum + d.amount, 0);
      doc.setFontSize(12);
      doc.text(`Total Donations: ₹${total.toLocaleString()}`, 14, 36);
      
      // Table
      doc.autoTable({
        startY: 42,
        head: [['Donor Name', 'Email', 'Campaign', 'Amount (₹)', 'Status', 'Date']],
        body: filteredDonations.map((d: any) => [
          d.donorName,
          d.email,
          d.campaign,
          d.amount.toLocaleString(),
          d.paymentStatus,
          new Date(d.date).toLocaleDateString('en-IN')
        ]),
        theme: 'grid',
        headStyles: { fillColor: [249, 115, 22] },
      });
      
      doc.save(`donations-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF");
    }
  };

  const uniqueCampaigns = Array.from(new Set(donations.map(d => d.campaign)));
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="pt-24 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-800 mb-2">
                Donation Management
              </h1>
              <p className="font-poppins text-gray-600">
                Track and manage all donations
              </p>
            </div>
            <button 
              onClick={exportToPDF}
              className="bg-primary hover:bg-orange-600 text-white font-poppins font-semibold px-6 py-3 rounded-lg transition-all shadow-md flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search donors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins text-sm"
              />
            </div>
            <select 
              value={filterCampaign}
              onChange={(e) => setFilterCampaign(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins text-sm"
            >
              <option>All Campaigns</option>
              {uniqueCampaigns.map(campaign => (
                <option key={campaign}>{campaign}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Donor Name</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Campaign</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left font-poppins text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-poppins text-sm text-gray-800">{donation.donorName}</td>
                    <td className="px-6 py-4 font-poppins text-sm text-gray-600">{donation.email}</td>
                    <td className="px-6 py-4 font-poppins text-sm text-gray-600">{donation.campaign}</td>
                    <td className="px-6 py-4 font-poppins text-sm font-semibold text-gray-800">₹{donation.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                        donation.paymentStatus === "Completed" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {donation.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-poppins text-sm text-gray-600">
                      {new Date(donation.date).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
