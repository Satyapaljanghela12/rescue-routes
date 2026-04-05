import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, alertDetails, volunteerDetails, type, campaignTitle, volunteerName, applicantName, status, membershipData } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email configuration missing!");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    console.log("Attempting to send email to:", to);

    // Membership confirmation email template
    if (type === "membership-confirmation") {
      console.log("Sending membership confirmation email to:", to);
      console.log("Membership data:", membershipData);
      
      const membershipConfirmationHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .membership-box {
                background: white;
                padding: 25px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #F97316;
                text-align: center;
              }
              .detail-row {
                padding: 12px 0;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
              }
              .detail-label {
                font-weight: bold;
                color: #6b7280;
              }
              .detail-value {
                color: #1f2937;
              }
              .info-box {
                background: #FEF3C7;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div style="font-size: 64px; margin-bottom: 10px;">🎉</div>
              <h1 style="margin: 0; font-size: 32px;">Welcome to Rescue Routes!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.95;">Your membership is now active</p>
            </div>
            
            <div class="content">
              <h2>Hello ${membershipData?.name}! 👋</h2>
              
              <div class="membership-box">
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <h3 style="color: #F97316; margin: 10px 0;">Payment Successful!</h3>
                <p style="margin: 10px 0; color: #6b7280;">
                  Thank you for becoming a member of Rescue Routes. Your support helps us rescue, rehabilitate, and rehome animals in need.
                </p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Membership Details</h3>
                
                <div class="detail-row">
                  <span class="detail-label">Membership Type:</span>
                  <span class="detail-value" style="color: #F97316; font-weight: bold;">${membershipData?.membershipType}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Amount Paid:</span>
                  <span class="detail-value" style="color: #10B981; font-weight: bold;">₹${membershipData?.amount?.toLocaleString()}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Payment ID:</span>
                  <span class="detail-value" style="font-family: monospace; font-size: 12px;">${membershipData?.paymentId}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Order ID:</span>
                  <span class="detail-value" style="font-family: monospace; font-size: 12px;">${membershipData?.orderId}</span>
                </div>
                
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
              
              <div class="info-box">
                <p style="margin: 0; color: #92400E;">
                  <strong>📦 What's Next:</strong><br/><br/>
                  • Your membership card and kit will reach you in 20-25 days<br/>
                  • You'll receive updates about rescue activities<br/>
                  • You can participate in all our campaigns and events<br/>
                  • Check your email for future communications
                </p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Your Details</h3>
                <p style="margin: 5px 0; color: #6b7280;"><strong>Email:</strong> ${membershipData?.email}</p>
                <p style="margin: 5px 0; color: #6b7280;"><strong>Phone:</strong> ${membershipData?.phone}</p>
                <p style="margin: 5px 0; color: #6b7280;"><strong>Address:</strong> ${membershipData?.address}, ${membershipData?.city}, ${membershipData?.state}, ${membershipData?.country} - ${membershipData?.pincode}</p>
              </div>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong>Rescue Routes Team</strong><br/>
                🐾
              </p>
            </div>
            
            <div class="footer">
              <p>This is an automated confirmation email from Rescue Routes.</p>
              <p>© ${new Date().getFullYear()} Rescue Routes. All rights reserved.</p>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Rescue Routes" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: membershipConfirmationHtml,
      });

      console.log("Membership confirmation email sent successfully to:", to);
      return NextResponse.json({ success: true, message: "Email sent successfully" });
    }

    // Volunteer approval email template
    if (type === "volunteer-approval") {
      const volunteerApprovalHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .success-box {
                background: white;
                padding: 25px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #10B981;
                text-align: center;
              }
              .cta-button {
                display: inline-block;
                background: #F97316;
                color: white;
                padding: 14px 32px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: bold;
                margin: 20px 0;
              }
              .info-box {
                background: #DBEAFE;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div style="font-size: 64px; margin-bottom: 10px;">🎉</div>
              <h1 style="margin: 0; font-size: 32px;">Welcome to Rescue Routes!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.95;">Your volunteer account has been approved</p>
            </div>
            
            <div class="content">
              <h2>Hello ${volunteerName}! 👋</h2>
              
              <div class="success-box">
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <h3 style="color: #10B981; margin: 10px 0;">Account Approved!</h3>
                <p style="margin: 10px 0; color: #6b7280;">
                  Congratulations! Your volunteer account has been approved by our admin team.
                  You can now log in and start making a difference in the lives of animals.
                </p>
              </div>
              
              <div class="info-box">
                <p style="margin: 0; color: #1E40AF;">
                  <strong>🚀 What You Can Do Now:</strong><br/><br/>
                  • Log in to your volunteer dashboard<br/>
                  • View and accept rescue alerts<br/>
                  • Join active campaigns<br/>
                  • Track your rescue activities<br/>
                  • Update rescue case statuses<br/>
                  • Connect with other volunteers
                </p>
              </div>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/login" class="cta-button">
                  Login to Dashboard
                </a>
              </div>
              
              <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400E;">
                  <strong>💡 Getting Started:</strong><br/>
                  Check your volunteer dashboard for active rescue alerts and campaigns. 
                  Every action you take helps save lives!
                </p>
              </div>
              
              <p>Thank you for joining our mission to rescue, rehabilitate, and rehome animals in need. 
              Together, we can make a real difference!</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong>Rescue Routes Team</strong><br/>
                🐾
              </p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from Rescue Routes.</p>
              <p>© ${new Date().getFullYear()} Rescue Routes. All rights reserved.</p>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Rescue Routes" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: volunteerApprovalHtml,
      });

      return NextResponse.json({ success: true, message: "Email sent successfully" });
    }

    // Adoption status email template
    if (type === "adoption-status") {
      const isApproved = status === "Approved";
      const adoptionStatusHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, ${isApproved ? '#10B981 0%, #34D399 100%' : '#EF4444 0%, #F87171 100%'});
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .status-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid ${isApproved ? '#10B981' : '#EF4444'};
                text-align: center;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${isApproved ? '🎉 Congratulations!' : '📋 Application Update'}</h1>
              <p>Adoption Application ${status}</p>
            </div>
            
            <div class="content">
              <h2>Hello ${applicantName}! 👋</h2>
              
              <div class="status-box">
                <div style="font-size: 48px; margin-bottom: 10px;">${isApproved ? '✅' : '❌'}</div>
                <h3 style="color: ${isApproved ? '#10B981' : '#EF4444'}; margin: 10px 0;">
                  Application ${status}
                </h3>
                <p style="margin: 10px 0; color: #6b7280;">
                  ${isApproved 
                    ? 'Your adoption application has been approved!' 
                    : 'Thank you for your interest in adopting. Unfortunately, we cannot proceed with your application at this time.'}
                </p>
              </div>
              
              ${isApproved ? `
              <div style="background: #DBEAFE; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #1E40AF;">
                  <strong>📅 Next Steps:</strong><br/>
                  • Our team will contact you within 24-48 hours<br/>
                  • We'll schedule a home visit<br/>
                  • Prepare your home for your new furry friend<br/>
                  • Complete the adoption paperwork
                </p>
              </div>
              ` : `
              <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400E;">
                  <strong>💡 What's Next:</strong><br/>
                  We encourage you to apply again in the future. In the meantime, you can support our mission by volunteering or making a donation.
                </p>
              </div>
              `}
              
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong>Rescue Routes Team</strong><br/>
                🐾
              </p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from Rescue Routes.</p>
              <p>© ${new Date().getFullYear()} Rescue Routes. All rights reserved.</p>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Rescue Routes" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: adoptionStatusHtml,
      });

      return NextResponse.json({ success: true, message: "Email sent successfully" });
    }

    // Campaign approval email template
    if (type === "campaign-approval") {
      const campaignApprovalHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .success-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #10B981;
                text-align: center;
              }
              .campaign-title {
                font-size: 24px;
                color: #F97316;
                font-weight: bold;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎉 Congratulations!</h1>
              <p>Your Campaign Participation Request Has Been Approved</p>
            </div>
            
            <div class="content">
              <h2>Hello ${volunteerName}! 👋</h2>
              
              <div class="success-box">
                <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                <h3 style="color: #10B981; margin: 10px 0;">Request Approved!</h3>
                <p style="margin: 10px 0;">You have been approved to participate in:</p>
                <div class="campaign-title">${campaignTitle}</div>
              </div>
              
              <p>We're excited to have you join this campaign! Your dedication to helping animals makes a real difference.</p>
              
              <div style="background: #DBEAFE; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #1E40AF;">
                  <strong>📅 Next Steps:</strong><br/>
                  • Check your volunteer dashboard for campaign details<br/>
                  • Coordinate with other volunteers<br/>
                  • Stay updated on campaign progress
                </p>
              </div>
              
              <p>Thank you for being part of our mission to rescue and care for animals in need.</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong>Rescue Routes Team</strong><br/>
                🐾
              </p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from Rescue Routes.</p>
              <p>© ${new Date().getFullYear()} Rescue Routes. All rights reserved.</p>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Rescue Routes" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: campaignApprovalHtml,
      });

      return NextResponse.json({ success: true, message: "Email sent successfully" });
    }

    // Rescue alert email template (default)
    const emailHtml = html || `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .alert-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #F97316;
            }
            .detail-row {
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail-label {
              font-weight: bold;
              color: #F97316;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #6b7280;
              font-size: 14px;
            }
            .paw-print {
              font-size: 24px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🐾 Rescue Routes</h1>
            <p>Task Assignment Confirmation</p>
          </div>
          
          <div class="content">
            <h2>Hello ${volunteerDetails?.name || "Volunteer"}! 👋</h2>
            <p>Thank you for accepting this rescue task. Here are the details:</p>
            
            <div class="alert-box">
              <h3 style="color: #F97316; margin-top: 0;">📋 Rescue Alert Details</h3>
              
              <div class="detail-row">
                <span class="detail-label">Title:</span><br/>
                ${alertDetails?.title || "N/A"}
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Animal Type:</span><br/>
                ${alertDetails?.animalType || "N/A"}
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Location:</span><br/>
                📍 ${alertDetails?.location || "N/A"}
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Description:</span><br/>
                ${alertDetails?.description || "N/A"}
              </div>
              
              ${alertDetails?.contactPerson ? `
              <div class="detail-row">
                <span class="detail-label">Contact Person:</span><br/>
                ${alertDetails.contactPerson}
                ${alertDetails.contactPhone ? ` - ${alertDetails.contactPhone}` : ""}
              </div>
              ` : ""}
              
              <div class="detail-row" style="border-bottom: none;">
                <span class="detail-label">Urgency:</span><br/>
                <span style="background: ${alertDetails?.urgency === "High" ? "#FEE2E2" : "#E0E7FF"}; 
                             color: ${alertDetails?.urgency === "High" ? "#DC2626" : "#3B82F6"}; 
                             padding: 4px 12px; 
                             border-radius: 12px; 
                             font-size: 12px; 
                             font-weight: bold;">
                  ${alertDetails?.urgency || "Medium"} Priority
                </span>
              </div>
            </div>
            
            <div style="background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400E;">
                <strong>⚠️ Important:</strong> Please reach out to the location as soon as possible. 
                The animal needs your help!
              </p>
            </div>
            
            <p>If you have any questions or need support, please contact the admin team.</p>
            
            <p style="margin-top: 30px;">
              Best regards,<br/>
              <strong>Rescue Routes Team</strong><br/>
              <span class="paw-print">🐾</span>
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated message from Rescue Routes.</p>
            <p>© ${new Date().getFullYear()} Rescue Routes. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Rescue Routes" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { success: false, error: "Failed to send email", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
