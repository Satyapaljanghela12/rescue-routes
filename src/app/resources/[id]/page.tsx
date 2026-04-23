"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

const articlesContent: Record<string, { title: string; category: string; content: JSX.Element }> = {
  "emergency-response": {
    title: "Found an Injured Dog in Bhopal? Here Is What You Should Do Immediately",
    category: "Emergency Response Guide",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Finding an injured dog on the streets of Bhopal is a distressing experience, but your quick actions in those first few minutes can be the difference between life and death. If you have stumbled upon a dog in distress, please follow this guide to ensure both your safety and the animal's.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">1. Stay Calm and Assess the Situation</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Always approach slowly. An injured animal is likely in shock, pain, or extreme fear and may act defensively. Keep your distance, speak in a soft, low voice, and assess if the dog is conscious, bleeding, or struggling to breathe. Crucially, prioritize your own safety; do not attempt to handle a dog that is showing signs of aggression.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">2. Secure the Surroundings</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          If the dog is in the middle of a busy Bhopal road, try to divert traffic or ask bystanders to help create a buffer zone. Place a towel or a blanket over the dog if it is calm; this can help keep them warm and reduce their visual stimulation, which often lowers their stress levels. However, if they are reluctant towards it, please don't use force.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">3. Call for Professional Rescue</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Do not attempt to perform medical aid or move the dog yourself, as you might worsen internal injuries. Contact Rescue Routes immediately, if local help is unreachable (Bhopal Municipal Corporation's Nagar Nigham.) As a dedicated animal welfare organization in Bhopal, we are equipped to handle trauma cases, transport injured animals safely, and provide the necessary medical care.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">4. Provide Essential Details</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          When you call us at <a href="tel:+919630057355" className="text-primary font-bold hover:underline">+91 9630057355</a>, please provide a clear location, a landmark, a picture of the injured animal and if possible, share a live location via WhatsApp. Stay on-site if you can safely do so until our team arrives as it's super helpful that way for us because sometimes there are chances that the injured animal can flee from the reported location. Your presence helps us locate the animal faster in crowded areas.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Remember</p>
          <p className="text-gray-700">
            Every minute counts. By calling for professional help, you are giving that animal the best possible chance at a second life!
          </p>
        </div>
      </>
    ),
  },
  "summer-safety": {
    title: "3 Simple Ways You Can Help Bhopal's Stray Dogs Survive the Summer",
    category: "Community Awareness & Heat Safety",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Bhopal's summer temperatures can be brutal for our community dogs. As an NGO, Rescue Routes sees the direct impact of dehydration and heatstroke on strays every single day. While we work tirelessly on rescues, you hold the power to prevent these emergencies right from your neighbourhood.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">1. Create "Hydration Stations"</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The simplest way to save a life is to ensure access to clean water. Place a wide, heavy-bottomed container—a clay bowl is best as it stays cool—outside your home, shop, or office. Please make it a part of your daily routine to refill this water at least twice a day. A small bowl of water can keep an entire pack of dogs hydrated through the hottest hours.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">2. Recognize the Signs of Heatstroke</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Knowledge saves lives. If you see a dog that is excessively panting, drooling thick saliva, looking lethargic, or having trouble standing, they may be suffering from heatstroke. Immediately move them to a shaded area and splash room-temperature water on their paws. Do not pour ice-cold water on them, as this can cause shock. Reach out to Rescue Routes for immediate guidance.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">3. Support Your Local Community Feeders</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The feeders in your area are the unsung heroes of Bhopal. They know every dog on the street and are the first to notice if something is wrong. Even if you cannot feed the dogs yourself, supporting these individuals with dry dog food, old bedsheets for shade, or just helping them monitor health trends helps the entire community remain stable and healthy.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">4. Be Kinder Towards Their Sitting Arrangements</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Sometimes, dogs dug up holes in your kyari (small garden area in front of your house) or below trees to sit in, please be kind towards them; if you can't do anything for them, just let them sit there and have their spot, don't remove them from that location, as it is their only comfort spot in the scorching hot weather. If you can put a wet bori (jute bag) at that spot it'll be even more comfortable for them to relax in and save themselves from the heat.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Remember</p>
          <p className="text-gray-700">
            Small, consistent acts of kindness build a safer, more compassionate city for everyone.
          </p>
        </div>
      </>
    ),
  },
  "adoption-guide": {
    title: "Why Adopting an Indie Dog in Bhopal is the Best Decision You'll Ever Make",
    category: "The Case for Adoption",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Thinking of bringing a pet into your life? Many people look toward expensive, imported breeds, but at Rescue Routes, we want to share why the local "Indie" breed is the perfect companion for a Bhopal household.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">1. Perfectly Adapted to Our Climate = Less Maintenance Cost</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Indian Pariah dogs, or "Indies," have been part of our landscape for centuries. They are naturally resilient and perfectly suited to Bhopal's weather, whether it's the scorching summer or the heavy monsoon or cold winters. They require less specialized grooming and are generally more robust and healthier than many imported breeds.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">2. Intelligence and Unmatched Loyalty</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Indie dogs are remarkably intelligent, alert, and intuitive. When you adopt a dog that has been rescued from the streets, you often find they form an incredibly deep, grateful bond with their new family. They seem to understand that they have been given a second chance at life, making them the most loyal companions you could ever hope for. They not only protect you and your family but they do that at the cost of their own lives if need be!
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">3. You Save More Than One Life</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          When you adopt from Rescue Routes, you aren't just giving a home to one dog. You are clearing a space in our facility, which allows us to rescue another stray who is currently suffering on the streets. Adoption is a beautiful cycle of kindness.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Ready to Find Your Best Friend?</p>
          <p className="text-gray-700 mb-4">
            Visit our adoption page to see the wonderful, healthy, and vaccinated dogs and more animals currently waiting for their forever homes.
          </p>
          <a href="/campaigns" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition">
            View Animals for Adoption
          </a>
        </div>
      </>
    ),
  },
  "volunteering": {
    title: "Become a Hero for Animals: How to Volunteer with Rescue Routes in Bhopal",
    category: "The Power of Volunteering",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Have you ever looked at a stray animal and wished you could do more? At Rescue Routes, we believe that animal welfare isn't just the job of a few; it is a collective responsibility of every citizen in Bhopal. We are always looking for passionate volunteers to join our growing movement.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">What Does It Mean to Volunteer With Us?</h2>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Fostering</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          This is one of our most critical needs. If you have a spare corner in your home, you can foster a recovering puppy or an injured dog until they are strong enough for adoption. It is a temporary commitment that saves a life.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Logistical Support</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          We often need help transporting animals to and from veterinary clinics. If you have a vehicle and a few hours to spare, you can become a crucial link in our rescue chain.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Awareness & Outreach</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Help us educate the community! From social media content creation to organizing local awareness drives in schools and colleges, your skills can help change public perception of stray dogs.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Ready to Make a Difference?</p>
          <p className="text-gray-700 mb-4">
            You don't need specialized medical training to be a hero. You just need a willing heart and some time. Contact us on WhatsApp at +91 9630057355 to get started.
          </p>
          <a href="/volunteers" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition">
            Join Our Team
          </a>
        </div>
      </>
    ),
  },
  "our-mission": {
    title: "About Rescue Routes: Our Commitment to Animal Protection in Bhopal",
    category: "Our Mission",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Rescue Routes was founded on a simple, uncompromising vision: to ensure that no animal in Bhopal has to suffer in silence. We are a Bhopal-based NGO dedicated to the protection, rescue, and comprehensive medical rehabilitation of stray animals.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Our Core Focus Areas</h2>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Emergency Medical Rescue</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          We operate a responsive rescue system for animals in distress, whether due to road accidents, severe illness, or cruelty. Our goal is to provide immediate, high-quality veterinary care.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Vaccination and Sterilization</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          We believe in proactive animal welfare. By conducting regular vaccination drives, we protect both the dogs and the community from diseases, promoting a harmonious coexistence.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Community Advocacy</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          We work hard to bridge the gap between humans and street animals. Through education and outreach, we aim to transform Bhopal into a city where stray dogs are treated with respect, kindness, and empathy.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Support Our Mission</p>
          <p className="text-gray-700 mb-4">
            We operate entirely through the generosity of our donors and the hard work of our volunteers. If you believe in a kinder, more inclusive city for all living beings, please support our mission.
          </p>
          <div className="flex gap-4">
            <a href="/donate" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition">
              Donate Now
            </a>
            <a href="https://www.instagram.com/rescueroutes" target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition">
              Follow on Instagram
            </a>
          </div>
        </div>
      </>
    ),
  },
  "sterilization": {
    title: "Why Sterilization is the Kindest Choice for Bhopal's Street Dogs & Cats",
    category: "The Importance of Sterilization",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Many people ask why animal welfare organizations like Rescue Routes prioritize sterilization (often called ABC - Animal Birth Control). The answer is simple: it is the most effective and humane way to manage the street dog and cat population.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">1. Stabilizing the Population</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          A single pair of unsterilized dogs and their offspring can, theoretically, result in hundreds of puppies over a few years. Sterilization prevents unplanned litters, ensuring that fewer puppies are born into a life of struggle on the streets of Bhopal.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">2. Better Health and Behavior</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Sterilized dogs are generally healthier. For females, it eliminates the risk of uterine infections and certain types of cancers. For males, it significantly reduces roaming behavior and aggression related to mating, making the dogs calmer and less likely to be involved in territorial fights or road accidents.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">3. Promoting Community Harmony</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          When the population is stable, community-dog relationships improve. Sterilized dogs are vaccinated against rabies during the process, making them safer for the entire neighborhood.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Support Our Sterilization Drives</p>
          <p className="text-gray-700 mb-4">
            By supporting our sterilization drives, you are helping us create a manageable, healthy dog population in Bhopal.
          </p>
          <a href="/campaigns" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition">
            View Our Campaigns
          </a>
        </div>
      </>
    ),
  },
  "puppy-care": {
    title: "Found a Litter of Puppies? What to Do (and What Not to Do)",
    category: "Handling Puppy Seasons",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Discovering a litter of abandoned puppies in your neighborhood can be overwhelming. Before you rush to bring them home, here is the professional advice from Rescue Routes on how to handle the situation correctly.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">1. Assess if They Are Truly Abandoned</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Mother dogs often leave their puppies for short periods to hunt for food. Watch from a distance for a few hours. If the mother is nearby and caring for them, leave them alone; the best place for a puppy is with its mother.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">2. When to Intervene</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          If the puppies are visibly injured, sick, or if the mother has been missing for over 24 hours, we can assume that they are in danger! Keep them warm using a cardboard box with old clothes or towels. Do not bathe them, as they can lose body heat very quickly.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">3. Contact a Specialist</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Raising puppies is a full-time job. Please contact Rescue Routes immediately. We can provide guidance on nutrition, deworming, and the necessary medical check-ups that every puppy needs to survive their first few months.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Need Help With Puppies?</p>
          <p className="text-gray-700 mb-4">
            If you have found a litter, please reach out to us at <a href="tel:+919630057355" className="text-primary font-bold hover:underline">+91 9630057355</a>. We can help coordinate their care and find them safe foster homes.
          </p>
        </div>
      </>
    ),
  },
  "coexistence": {
    title: "Living With Street Dogs: Tips for Peaceful Coexistence in Your Locality",
    category: "Coexistence Tips",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Street dogs are an inseparable part of the urban fabric in cities like Bhopal. Sometimes, misunderstandings arise between residents and community dogs. At Rescue Routes, we promote peaceful coexistence through education.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Avoid Aggressive Body Language</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          If a dog is barking, do not run or scream. Stand still, avoid direct eye contact, and move away slowly. Running triggers a dog's chase instinct.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Respect Their Territory</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Dogs are territorial. If you are entering a new area, do so calmly. If you feed the dogs in your area, they will naturally become protective of that space and the people they recognize as friends.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Report Unnatural Behavior</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          A dog that is suddenly aggressive may be in pain or suffering from illness. Rather than taking matters into your own hands, report the behavior to Rescue Routes. We can assess the animal and address the root cause of the behavior.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Creating Safe Environments</p>
          <p className="text-gray-700">
            Creating a safe environment for humans and animals is a shared responsibility. Let's work together to make Bhopal a model city for animal-human coexistence.
          </p>
        </div>
      </>
    ),
  },
  "monsoon-care": {
    title: "Monsoon Care: Protecting Bhopal's Strays During the Rainy Season",
    category: "Monsoon Precautions",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The monsoon season in Bhopal brings relief from the heat, but it also brings unique challenges for our community dogs, who often struggle to find dry, warm shelter. Here is how you can help.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Provide Dry Shelter</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          A simple tarp or a dry corner in a porch area can protect a dog from getting drenched. Constant dampness can lead to skin infections and fungal issues.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Keep an Eye on Skin Health</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Monsoon is the peak season for ticks and mange. If you notice a dog in your area losing patches of fur or scratching excessively, please contact Rescue Routes. Early treatment can prevent severe infections.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Safe Drinking Water</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          During the rains, stagnant water pools become breeding grounds for bacteria. Ensure that the water bowls you provide are cleaned daily to prevent the spread of waterborne diseases.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Your Vigilance Matters</p>
          <p className="text-gray-700 mb-4">
            Your vigilance during the rainy season helps us keep the local dog population healthy and safe. If you see a dog suffering from extreme illness, don't wait—call us today at <a href="tel:+919630057355" className="text-primary font-bold hover:underline">+91 9630057355</a>.
          </p>
        </div>
      </>
    ),
  },
  "donations": {
    title: "Where Your Money Goes: Transparency in Rescue Routes' Mission",
    category: "The Role of Donations",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Many supporters ask us how their donations are utilized. At Rescue Routes, we believe in complete transparency. Every rupee you donate goes directly into the field to save lives in Bhopal.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">How We Use Your Support</h2>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Emergency Medical Bills</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          From fracture surgeries to life-saving blood tests, your donations cover the high costs of veterinary care at partner clinics.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Medicines and Vaccinations</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          We maintain a steady supply of antibiotics, anti-rabies vaccines, and deworming medication to ensure every dog we rescue gets a clean bill of health.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Rescue Equipment</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Fuel for our rescue vehicles, rescue nets, stretchers, and trauma kits are essential for our 24/7 operations.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Feeding and Nutrition</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          For dogs recovering in our care, high-quality nutrition is essential for healing.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">Transportation</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          This might be a very overlooked side, we are still raising funds for a proper dedicated animal ambulance, however right now we use our personal transport for rescues which also causes a huge bill.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Your Support is Our Lifeline</p>
          <p className="text-gray-700 mb-4">
            We are a community-funded NGO, and we exist because people like you choose to care. Your support is the lifeline that keeps our rescue vehicle on the road.
          </p>
          <a href="/donate" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-orange-600 transition">
            Make a Contribution
          </a>
        </div>
      </>
    ),
  },
  "animal-cruelty-laws": {
    title: "What to Do If Someone is Cruel to an Animal in Bhopal?",
    category: "Laws for Animals",
    content: (
      <>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Witnessing animal cruelty can be deeply distressing. In India, we have laws to protect animals from abuse and cruelty. Here's what you need to know and how you can take action.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Understanding the Law</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The Prevention of Cruelty to Animals Act, 1960 makes it illegal to inflict unnecessary pain or suffering on any animal. This includes beating, kicking, overloading, torturing, or killing animals.
        </p>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">What Constitutes Cruelty?</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
          <li>Beating, kicking, or physically harming an animal</li>
          <li>Confining animals in small spaces without food or water</li>
          <li>Abandoning sick or injured animals</li>
          <li>Poisoning community dogs</li>
          <li>Using animals for illegal fighting</li>
          <li>Mutilating or killing animals</li>
        </ul>

        <h2 className="font-fredoka text-2xl text-primary mb-4 mt-8">Steps to Take</h2>
        
        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">1. Document the Incident</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Take photos or videos as evidence. Note the date, time, location, and details of what happened.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">2. Contact Authorities</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          File a complaint with the local police station. You can also contact the Animal Welfare Board of India or local animal welfare organizations like Rescue Routes.
        </p>

        <h3 className="font-fredoka text-xl text-gray-900 mb-3 mt-6">3. Seek Legal Help</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          If needed, consult with animal rights lawyers or organizations that can help you file an FIR (First Information Report).
        </p>

        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
          <p className="font-bold text-primary mb-2">Report Animal Cruelty</p>
          <p className="text-gray-700 mb-4">
            If you witness animal cruelty in Bhopal, contact Rescue Routes immediately at <a href="tel:+919630057355" className="text-primary font-bold hover:underline">+91 9630057355</a>. We can guide you through the legal process and help the animal in distress.
          </p>
          <p className="text-gray-700 text-sm">
            Remember: Speaking up for animals who cannot speak for themselves is not just compassionate—it's your legal right and responsibility.
          </p>
        </div>
      </>
    ),
  },
};

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const article = articlesContent[id];

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="flex-1 w-full overflow-hidden pt-20 min-h-screen">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="font-fredoka text-4xl text-gray-900 mb-4">Article Not Found</h1>
            <Link href="/resources" className="text-primary hover:underline">
              Back to Resources
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-hidden pt-20">
        
        {/* Article Content */}
        <article className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <Link
              href="/resources"
              className="inline-flex items-center text-primary hover:underline mb-8 font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-bold rounded-full">
                  {article.category}
                </span>
              </div>

              <h1 className="font-fredoka text-4xl md:text-5xl text-gray-900 mb-8 leading-tight">
                {article.title}
              </h1>

              <div className="prose prose-lg max-w-none">
                {article.content}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/resources"
                  className="inline-flex items-center text-primary hover:underline font-bold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </article>

      </main>
      <SiteFooter />
    </>
  );
}
