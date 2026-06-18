// controllers/formController.js - Form Submission Controller (Task 1/2)
const Contact = require('../models/Contact');
const Application = require('../models/Application');

// POST /api/contact - Submit contact form
exports.submitContact = async (req, res) => {
    const { name, email, message } = req.body;

    // Server-side validation (Task 2)
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields (name, email, message) are required.' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    try {
        const contact = await Contact.create({ name, email, message });

        // Store in temporary array (Task 2)
        global.temporarySubmissions.push({
            type: 'Contact',
            data: { name, email, message },
            timestamp: Date.now()
        });

        res.status(201).json({ message: 'Contact form submitted successfully!', data: contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/apply - Submit internship application
exports.submitApplication = async (req, res) => {
    const { name, email, phone, position, resumeLink } = req.body;

    // Server-side validation (Task 2)
    if (!name || !email || !phone || !position) {
        return res.status(400).json({ message: 'Name, email, phone, and position are required.' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    try {
        const application = await Application.create({
            userId: req.user ? req.user._id : null,
            name, email, phone, position, resumeLink: resumeLink || ''
        });

        // Store in temporary array (Task 2)
        global.temporarySubmissions.push({
            type: 'Application',
            data: { name, email, position },
            timestamp: Date.now()
        });

        res.status(201).json({ message: 'Application submitted successfully!', data: application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
