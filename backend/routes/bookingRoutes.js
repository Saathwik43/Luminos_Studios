const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');

// Helper 1: Send notification to Admin only when a booking is first created
const sendAdminInquiryNotification = async (booking, servicesList) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'saathwikmailapalli@gmail.com';
  
  const servicesText = servicesList.map(s => `- ${s.name} (₹${s.price})`).join('\n');
  const servicesHtml = servicesList.map(s => `<li><strong>${s.name}</strong> - ₹${s.price}</li>`).join('');
  
  const mailText = `New Booking Inquiry Received!\n\n` +
                   `Customer Name: ${booking.customerName}\n` +
                   `Customer Email: ${booking.customerEmail}\n` +
                   `Event Date: ${new Date(booking.eventDate).toLocaleDateString()}\n` +
                   `Selected Services:\n${servicesText}\n\n` +
                   `Total Amount: ₹${booking.totalAmount}\n` +
                   `Notes: ${booking.notes || 'None'}\n`;
                   
  const mailHtml = `
    <h2>New Booking Inquiry Received!</h2>
    <p><strong>Customer Name:</strong> ${booking.customerName}</p>
    <p><strong>Customer Email:</strong> ${booking.customerEmail}</p>
    <p><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</p>
    <h3>Selected Services:</h3>
    <ul>${servicesHtml}</ul>
    <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
    <p><strong>Notes:</strong> ${booking.notes || 'None'}</p>
  `;

  // Fallback to console log if SMTP is not configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_gmail_app_password') {
    console.log('--- ADMIN EMAIL NOTIFICATION LOG (MOCK) ---');
    console.log(`Sender: ${adminEmail}`);
    console.log(`Recipient (Admin): ${adminEmail}`);
    console.log(`Subject: New Booking Inquiry - ${booking.customerName}`);
    console.log(mailText);
    console.log('-------------------------------------------');
    return { mock: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: `Luminos Studio <${adminEmail}>`,
      to: adminEmail,
      subject: `New Booking Inquiry - ${booking.customerName}`,
      text: mailText,
      html: mailHtml
    });

    console.log(`Inquiry email notification successfully sent to Admin.`);
  } catch (error) {
    console.error('Failed to send Admin email notification:', error);
  }
};

// Helper 2: Send status update notification to Customer (Confirmed or Cancelled)
const sendCustomerStatusNotification = async (booking, servicesList, status) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'saathwikmailapalli@gmail.com';
  
  let subject = '';
  let mailText = '';
  let mailHtml = '';
  
  const servicesText = servicesList.map(s => `- ${s.name} (₹${s.price})`).join('\n');
  const servicesHtml = servicesList.map(s => `<li><strong>${s.name}</strong> - ₹${s.price}</li>`).join('');

  if (status === 'Confirmed') {
    subject = `Booking Inquiry Confirmed - Luminos Studio`;
    mailText = `Hi ${booking.customerName},\n\n` +
               `Great news! We are happy to inform you that your booking inquiry for ${new Date(booking.eventDate).toLocaleDateString()} has been officially APPROVED & CONFIRMED by Luminos Studio.\n\n` +
               `Selected Services:\n${servicesText}\n\n` +
               `Total Amount: ₹${booking.totalAmount}\n\n` +
               `We will contact you shortly to review final details, locations, and schedules.\n\n` +
               `Best regards,\nLuminos Studio`;
               
    mailHtml = `
      <h2>Booking Inquiry Confirmed!</h2>
      <p>Hi <strong>${booking.customerName}</strong>,</p>
      <p>Great news! We are happy to inform you that your booking inquiry for <strong>${new Date(booking.eventDate).toLocaleDateString()}</strong> has been officially <strong>APPROVED & CONFIRMED</strong> by Luminos Studio.</p>
      <h3>Selected Services:</h3>
      <ul>${servicesHtml}</ul>
      <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
      <p>We will contact you shortly to review final details, locations, and schedules.</p>
      <br/>
      <p>Best regards,<br/><strong>Luminos Studio</strong></p>
    `;
  } else if (status === 'Cancelled') {
    subject = `Booking Inquiry Cancelled - Luminos Studio`;
    mailText = `Hi ${booking.customerName},\n\n` +
               `We regret to inform you that your booking inquiry for ${new Date(booking.eventDate).toLocaleDateString()} has been CANCELLED.\n\n` +
               `Total Amount: ₹${booking.totalAmount}\n\n` +
               `If you have any questions or would like to schedule for another date, please feel free to reach out to us at ${adminEmail}.\n\n` +
               `Best regards,\nLuminos Studio`;
               
    mailHtml = `
      <h2>Booking Inquiry Cancelled</h2>
      <p>Hi <strong>${booking.customerName}</strong>,</p>
      <p>We regret to inform you that your booking inquiry for <strong>${new Date(booking.eventDate).toLocaleDateString()}</strong> has been <strong>CANCELLED</strong>.</p>
      <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
      <p>If you have any questions or would like to schedule for another date, please feel free to reach out to us at <a href="mailto:${adminEmail}">${adminEmail}</a>.</p>
      <br/>
      <p>Best regards,<br/><strong>Luminos Studio</strong></p>
    `;
  } else {
    return;
  }

  // Fallback to console log if SMTP is not configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_PASS === 'your_gmail_app_password') {
    console.log('--- CUSTOMER STATUS EMAIL LOG (MOCK) ---');
    console.log(`Sender: ${adminEmail}`);
    console.log(`Recipient (Customer): ${booking.customerEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(mailText);
    console.log('----------------------------------------');
    return { mock: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: `Luminos Studio <${adminEmail}>`,
      to: booking.customerEmail,
      subject: subject,
      text: mailText,
      html: mailHtml
    });

    console.log(`Status update email successfully sent to Customer (${booking.customerEmail}) [${status}].`);
  } catch (error) {
    console.error('Failed to send Customer status email:', error);
  }
};

// @route   POST /api/bookings
// @desc    Create a new booking inquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, eventDate, notes, serviceIds, totalAmount } = req.body;

    if (!customerName || !customerEmail || !eventDate || !serviceIds || serviceIds.length === 0 || totalAmount === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const booking = await Booking.create({
      customerName,
      customerEmail,
      eventDate,
      notes: notes || '',
      services: serviceIds,
      totalAmount
    });

    // Fetch services to compile the email notification
    const servicesList = await Service.find({ _id: { $in: serviceIds } });

    // Send email notification to Admin only in background
    sendAdminInquiryNotification(booking, servicesList);

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/bookings
// @desc    Get all booking inquiries
// @access  Private (Admin)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('services')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status and send confirmation/cancellation email
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status is required' });

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const oldStatus = booking.status;
    booking.status = status;
    const updatedBooking = await booking.save();

    // Send email to customer ONLY when status is changed to Confirmed or Cancelled
    if (oldStatus !== status && (status === 'Confirmed' || status === 'Cancelled')) {
      const servicesList = await Service.find({ _id: { $in: booking.services } });
      sendCustomerStatusNotification(updatedBooking, servicesList, status);
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
