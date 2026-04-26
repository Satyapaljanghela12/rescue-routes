"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, X } from "lucide-react";

type NotificationType = "donation" | "rescue" | "adoption";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  location?: string;
  amount?: string;
  name?: string;
  timestamp: Date;
}

export default function RealtimeNotifications() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    // Check for new notifications every 10 seconds
    const interval = setInterval(async () => {
      try {
        // Fetch recent donations
        const donationsRes = await fetch('/api/donations');
        const donationsData = await donationsRes.json();
        
        if (donationsData.success && donationsData.donations.length > 0) {
          const recentDonations = donationsData.donations
            .filter((d: any) => new Date(d.createdAt) > lastChecked)
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          if (recentDonations.length > 0) {
            const donation = recentDonations[0];
            const newNotification: Notification = {
              id: donation._id,
              type: "donation",
              message: "donated",
              amount: `₹${donation.amount}`,
              name: donation.name || "Anonymous",
              timestamp: new Date(donation.createdAt),
            };
            
            setCurrentNotification(newNotification);
            setLastChecked(new Date());
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
              setCurrentNotification(null);
            }, 5000);
            return;
          }
        }

        // Fetch recent rescue cases
        const rescueRes = await fetch('/api/rescue-cases');
        const rescueData = await rescueRes.json();
        
        if (rescueData.success && rescueData.cases.length > 0) {
          const recentRescues = rescueData.cases
            .filter((r: any) => new Date(r.createdAt) > lastChecked && r.status === 'Resolved')
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          if (recentRescues.length > 0) {
            const rescue = recentRescues[0];
            const newNotification: Notification = {
              id: rescue._id,
              type: "rescue",
              message: "rescued",
              location: rescue.location || "Unknown location",
              name: rescue.animalType || "Animal",
              timestamp: new Date(rescue.createdAt),
            };
            
            setCurrentNotification(newNotification);
            setLastChecked(new Date());
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
              setCurrentNotification(null);
            }, 5000);
            return;
          }
        }

        // Fetch recent adoptions
        const adoptionsRes = await fetch('/api/adoptions');
        const adoptionsData = await adoptionsRes.json();
        
        if (adoptionsData.success && adoptionsData.adoptions.length > 0) {
          const recentAdoptions = adoptionsData.adoptions
            .filter((a: any) => new Date(a.updatedAt) > lastChecked && a.status === 'Adopted')
            .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          
          if (recentAdoptions.length > 0) {
            const adoption = recentAdoptions[0];
            const newNotification: Notification = {
              id: adoption._id,
              type: "adoption",
              message: "adopted",
              name: adoption.animalName || "Pet",
              location: "Bhopal, MP",
              timestamp: new Date(adoption.updatedAt),
            };
            
            setCurrentNotification(newNotification);
            setLastChecked(new Date());
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
              setCurrentNotification(null);
            }, 5000);
          }
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [lastChecked]);

  const handleClose = () => {
    setCurrentNotification(null);
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "donation":
        return <Heart className="w-5 h-5 text-primary" fill="currentColor" />;
      case "rescue":
      case "adoption":
        return <MapPin className="w-5 h-5 text-primary" />;
      default:
        return <Heart className="w-5 h-5 text-primary" />;
    }
  };

  const getNotificationText = (notif: Notification) => {
    switch (notif.type) {
      case "donation":
        return (
          <>
            <span className="font-bold text-primary">{notif.name}</span> donated{" "}
            <span className="font-bold text-primary">{notif.amount}</span>
          </>
        );
      case "rescue":
        return (
          <>
            <span className="font-bold text-primary">{notif.name}</span> rescued at{" "}
            <span className="font-bold text-primary">{notif.location}</span>
          </>
        );
      case "adoption":
        return (
          <>
            <span className="font-bold text-primary">{notif.name}</span> was adopted in{" "}
            <span className="font-bold text-primary">{notif.location}</span>
          </>
        );
      default:
        return notif.message;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="pointer-events-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary/20 p-4 pr-12 max-w-sm relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close notification"
              >
                <X size={16} />
              </button>

              {/* Content */}
              <div className="relative z-10 flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  {getIcon(currentNotification.type)}
                </div>

                {/* Text */}
                <div className="flex-1 pt-1">
                  <p className="font-poppins text-sm text-gray-700 leading-relaxed">
                    {getNotificationText(currentNotification)}
                  </p>
                  <p className="font-poppins text-xs text-gray-400 mt-1">
                    Just now
                  </p>
                </div>
              </div>

              {/* Animated progress bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-1 bg-primary"
              />

              {/* Decorative paw print */}
              <div className="absolute bottom-2 right-2 opacity-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                  <circle cx="12" cy="16" r="3" />
                  <circle cx="8" cy="12" r="2" />
                  <circle cx="16" cy="12" r="2" />
                  <circle cx="10" cy="8" r="1.5" />
                  <circle cx="14" cy="8" r="1.5" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
