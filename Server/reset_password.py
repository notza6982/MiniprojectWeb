import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def email(receiver,uid):
    sender_email = "glassesshop.miniprojectweb@gmail.com"
    password = 'glassesshopP@ssw0rd'
    receiver_email = receiver
    message = MIMEMultipart("alternative")
    message["Subject"] = "ตั้งค่ารหัสผ่านใหม่"
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    html = """\
    <html>
    <body>
        เราได้รับคำขอเปลี่ยนรหัสผ่านของคุณแล้ว<br>
        <a href="http://localhost:3000/GlassesShop/changepass?uid="""+str(uid)+""" ">เปลี่ยนรหัสผ่าน</a> 
        </p>
    </body>
    </html>
    """

    # Turn these into plain/html MIMEText objects
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )