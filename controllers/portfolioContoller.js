const axios = require("axios");
const FormData = require("form-data");

const sendEmailController = async (req, res) => {
  const { name, email, msg } = req.body;

  if (!name || !email || !msg) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }

  const form = new FormData();
  form.append("from", `Contact Form <postmaster@sandboxe3220e167a084d07b42ec8d23f5ef706.mailgun.org>`);
  form.append("to", "amber.786.369@gmail.com"); 
  form.append("subject", "New Contact Message from Portfolio");
  form.append("html", `
    <h5>Details</h5>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Message: ${msg}</li>
    </ul>
  `);

  try {
    await axios.post(
      "https://api.mailgun.net/v3/sandboxe3220e167a084d07b42ec8d23f5ef706.mailgun.org/messages", 
      form,
      {
        auth: {
          username: "api",
          password: process.env.API_MAILGUN,
        },
        headers: form.getHeaders(),
      }
    );

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (err) {
    console.error("Mailgun error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Error sending email. Try again later.",
    });
  }
};

module.exports = { sendEmailController };
