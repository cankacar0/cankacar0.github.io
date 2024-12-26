function sendMail() {
    let params = {
        name: document.getElementById("fullname").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        message: document.getElementById("message").value.trim(),
    };

    const messageDiv = document.getElementById("messageDiv");
    const sendButton = document.getElementById("sendButton");

    // Form doğrulama
    if (!params.name || !params.email || !params.subject || !params.message) {
        showMessage(messageDiv, "Please fill in all fields.", "error");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(params.email)) {
        showMessage(messageDiv, "Please enter a valid email address.", "error");
        return false;
    }

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";

    emailjs
        .send("service_dpx26ws", "template_6ti7y7m", params)
        .then((res) => {
            if (res.status === 200) {
                document.getElementById("fullname").value = "";
                document.getElementById("email").value = "";
                document.getElementById("subject").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("message").value = "";
                showMessage(messageDiv, "Your message has been sent successfully!", "success");
            } else {
                showMessage(messageDiv, "Failed to send the message. Please try again.", "error");
            }
        })
        .catch(() => {
            showMessage(messageDiv, "An error occurred. Please try again.", "error");
        })
        .finally(() => {
            sendButton.disabled = false;
            sendButton.textContent = "Submit";
        });

    return false;
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = type === "success" ? "alert-message success" : "alert-message error";
    element.style.display = "block";
    setTimeout(() => {
        element.style.display = "none";
    }, 5000);
}
